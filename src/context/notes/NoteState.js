import NoteContext from "./NoteContext";
import { useEffect, useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const [notes, setNotes] = useState([]);

    // console.log('auth token is initialized: ' + authToken);
    
    
    const getNotes = async () => {
        const authToken = localStorage.getItem('authToken');
        const url = `${host}/api/notes/viewnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            }
        })
        
        let json = await response.json();
        setNotes(json);
    }

    const editNote = async (id, title, description, tag) => {
        const authToken = localStorage.getItem('authToken');

        const url = `${host}/api/notes/updatenote${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, tag})
        });

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];

            if (element._id == id){
                element.title = title;
                element.description = description;
                element.tag = tag;

                setNotes(notes.map(note=>{
                    if (note._id == id){return element}
                    else{return note}
                }))
            }
            
        }
    }

    const deleteNote = async (id) => {
        const authToken = localStorage.getItem('authToken');

        const url = `${host}/api/notes/deletenote${id}`;
        const response = await fetch(url, {
            method: 'DELETE', 
            headers: {
                'auth-token': authToken
            }
        });

        let newNotes = notes.filter(item => item._id !== id);
        setNotes(newNotes);
    };

    const addNote = async (title, description, tag)=>{
        const authToken = localStorage.getItem('authToken');

        const url = `${host}/api/notes/addnote`;
        let response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({title, description, tag})
        });

        response = await response.json();
        setNotes(notes.concat(response))

    }

    return (
        <NoteContext.Provider value = {{notes, setNotes, editNote, deleteNote, addNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;