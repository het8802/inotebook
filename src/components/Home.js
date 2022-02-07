import React, {useContext, useEffect, useState} from 'react';
import NotesDisplay from './NotesDisplay';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    let navigate = useNavigate()

    // document.body.style.backgroundColor = 'white';
    let authToken = localStorage.getItem('authToken');

    useEffect(() => {
        if(!authToken){
        navigate('/login');
        }
    }, []);
    
    
    return (
        <>
            <div className='container'>
                <AddNote/>
                <div className='my-5'>
                    <h2>Your notes</h2>
                <NotesDisplay/>
                </div>
                
            </div>
        </>
    );

};

export default Home;
