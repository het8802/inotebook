import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  let { addNote } = context;
  const [processingNote, setprocessingNote] = useState({
    title: "",
    description: "",
    tag: "",
  });


  const formChangeHandle = function (event) {
    setprocessingNote({...processingNote, [event.target.name]: event.target.value})
      event.preventDefault();
  };


  const addNoteClickHandle = () => {
    addNote(
        processingNote.title,
        processingNote.description,
        processingNote.tag
        );

        setprocessingNote({
            title: "",
            description: "",
            tag: "",
          })
  };

  return (
    <>
      <h2>Add a note</h2>
      <textarea
        className="form-control"
        placeholder="Title"
        name='title'
        rows="1"
        onChange={formChangeHandle}
        value={processingNote.title}
        required
      ></textarea>
      <textarea
        name='description'
        className="form-control my-3"
        placeholder="Description"
        value={processingNote.description}
        rows="3"
        onChange={formChangeHandle}
        required
      ></textarea>
      <textarea
        name='tag'
        className="form-control my-3"
        placeholder="Tag(optional)"
        value={processingNote.tag}
        onChange={formChangeHandle}
      ></textarea>
      <button
        type="submit"
        disabled={!(processingNote.title && processingNote.description)}
        className="btn btn-primary"
        onClick={addNoteClickHandle}
        rows="1"
        >
        <p style={{margin: '0px'}}>Add Note</p>
      </button>
    </>
  );
};

export default AddNote;
