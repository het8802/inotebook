import NoteContext from "../context/notes/NoteContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";

const NotesDisplay = () => {
  const context = useContext(NoteContext);
  let { notes, setNotes, getNotes, editNote } = context;

  const updateButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    getNotes();
  }, []);

  const updateNote = (note) => {
    updateButtonRef.current.click();
    setUpdatedNote(note);
  };

  const [updatedNote, setUpdatedNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const formChangeHandle = (event) => {
    setUpdatedNote({ ...updatedNote, [event.target.name]: event.target.value });
  };

  const updateButtonClicked = function (note) {
    closeButtonRef.current.click();
    editNote(note._id, note.title, note.description, note.tag);
  };

  return (
    <div className="container row">
      <button
        type="button"
        ref={updateButtonRef}
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                ref={closeButtonRef}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="container">
              <textarea
                value={updatedNote.title}
                name="title"
                className="form-control"
                placeholder="Title"
                rows="1"
                onChange={formChangeHandle}
              ></textarea>
              <textarea
                value={updatedNote.description}
                name="description"
                className="form-control my-3"
                placeholder="Description"
                rows="3"
                onChange={formChangeHandle}
              ></textarea>
              <textarea
                value={updatedNote.tag}
                name="tag"
                className="form-control my-3"
                placeholder="Tag(optional)"
                rows="3"
                onChange={formChangeHandle}
              ></textarea>
              <div className="modal-footer">
                <button
                disabled={!(updatedNote.title && updatedNote.description)}
                  type="button"
                  onClick={() => {
                    updateButtonClicked(updatedNote);
                  }}
                  className="btn btn-primary"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {notes &&
        notes.map((element) => {
          return (
            <NoteItem
              key={element._id}
              note={element}
              updateNote={updateNote}
            />
          );
        })}
    </div>
  );
};

export default NotesDisplay;
