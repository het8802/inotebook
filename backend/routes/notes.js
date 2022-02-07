const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");

//ROUTER 1: to create new note
router.post(
    "/addnote",
    fetchUser,
    [body("title").exists(), body("description").exists()],
    async (req, res) => {
        try {
            const errors = validationResult(req.body);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;

            const note = new Notes({ title, description, tag, user: req.userID });
            const savedNote = await note.save();
            res.send(savedNote);
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
);

//ROUTER 2: this is for viewing the notes of the user
router.get("/viewnotes", fetchUser, async (req, res) => {
    try {
        const allNotes = await Notes.find({ user: req.userID });
        res.json(allNotes);
    } catch (error) {
        return res.status(500).json({ error: "Internal error occured" });
    }
});

//ROUTER 3: this is for updating the note
router.put("/updatenote:id", fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        let note = {};

        if (title) {
            note.title = title;
        }
        if (description) {
            note.description = description;
        }
        if (tag) {
            note.tag = tag;
        }

        const storedNote = await Notes.findById(req.params.id);

        if(!storedNote){return res.status(404).json({ error: "File not found" })}
        
        if (storedNote.user != req.userID) {
            return res.status(401).json({ error: "Access denied" });
        }

        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {
            $set: note,
        });
        res.json(updatedNote);
    } catch (error) {
        return res.status(500).json({ error: "Internal error occured" });
    }
});

//ROUTER 4: this is to delete a note
router.delete("/deletenote:id", fetchUser, async (req, res) => {
    try {
        var note = await Notes.findById(req.params.id);

        if (!note){return res.status(404).json({ error: "File not found" })}

        if (note.user != req.userID) {
            return res.status(401).json({ error: "Access denied" });
        }

        const deletedNote = await Notes.findByIdAndDelete(req.params.id);
        res.json({ result: "success", deletedNote });
    } catch {
        return res.status(500).json({ error: "Internal error occured" });
    }
});

module.exports = router;
