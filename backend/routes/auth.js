const express = require("express");
const User = require("../models/User.js");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require('../middleware/fetchUser')


const JWT_SECRET = "scam2022";

router.post(
    "/createUser",
    [
        body("email", "enter a valid email").isEmail(),
        body("name", "enter a valid name").isLength({ min: 3 }),
        body("password", "enter a valid password").isLength({ min: 5 }),
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                const errorId = "1"
                return res
                    .status(500)
                    .json({ error: "email already exists", errorId:1 });
            }

            let salt = await bcryptjs.genSalt(10);
            let encryptedPass = await bcryptjs.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: encryptedPass,
            });
            // res.json(user);

            const data = {
                id: user.id,
            };

            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken });
        } 
        
        catch (error) {
            return res.status(500).send("Some internal error occured");
        }
    }
);

router.post(
    "/login",
    [
        body("email", "Please enter a valid email").isEmail(),
        body("password", "Please enter a valid password").exists()
    ],

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }

            let passCompare = await bcryptjs.compare(password, user.password);

            if (passCompare) {
                let data = {
                    id: user.id,
                };
                const authToken = jwt.sign(data, JWT_SECRET);
                res.json({ authToken });
            } else {
                return res
                    .status(400)
                    .json({ error: "please enter the correct password" });
            }
        } 
        
        catch (error) {
            return res.status(500).json({ error: "Internal error occured" });
        }
    }
);

router.get('/getUser', fetchUser, async (req, res)=> {
    try {
    const userID = req.userID;
    const user = await User.findById(userID).select('-password');
    res.send(user);

} catch (error) {
        return res.status(401).json({error: "not able to fetch"})
}
})
module.exports = router;
