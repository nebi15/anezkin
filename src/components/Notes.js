import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './NotesComponents/NotesList';
import Search from './NotesComponents/Search';
import Header from './NotesComponents/Header';
import './Notes.css';


export const Notes = () => {
    const [notes, setNotes] = useState([
        {
            id: nanoid(),
            text: "This is zero note",
            date: "03/08/2023"
        },
        {
            id: nanoid(),
            text: "This is first note",
            date: "02/08/2023"
        },
        {
            id: nanoid(),
            text: "This is second note",
            date: "03/08/2023"
        },
        {
            id: nanoid(),
            text: "This is new note",
            date: "05/08/2023"
        },
    ]);

    const [searchText, setSearchText] = useState('');

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data')
        );

        if (savedNotes) {
            setNotes(savedNotes);
        }

    }, [])

    useEffect(() => {
        localStorage.setItem(
            'react-notes-app-data',
            JSON.stringify(notes)
        );
    }, [notes]);

    const addNote = (text) => {
        const date = new Date();
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString()
        }
        const newNotes = [...notes, newNote];
        setNotes(newNotes);
    };

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    }

    return (
        <div className={`${darkMode && 'dark-mode'}`}>
            <div className="container">
                <Header handleToggleDarkMode={setDarkMode} />
                <Search handleSearchNote={setSearchText} />
                <NotesList
                    notes={notes.filter((note) =>
                        note.text.toLowerCase().includes(searchText)
                    )}
                    handleAddNote={addNote}
                    handleDeleteNote={deleteNote}
                />
            </div>
        </div>
    );
};

