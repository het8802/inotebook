import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const {note, updateNote} = props;
    
    const context = useContext(NoteContext);
    const {notes, setNotes, deleteNote, editNote} = context;

    
  return (
    <div className="card col-md-3 mx-3 my-3">
    <div className="card-body">
      <h5 className="card-title">{note.title}</h5>
      <p className="card-text">{note.description}</p>
      <i className="far fa-trash-alt" onClick={() => deleteNote(note._id)}></i>
      <i className="far fa-edit mx-3" onClick={() => updateNote(note)}></i>

    </div>
  </div>
  );
};

export default NoteItem;
