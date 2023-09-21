import Note from './Note';
import AddNote from './AddNote';
import AnimatedFeet from "./AnimatedFeet";

const NotesList = ({ notes, handleAddNote, handleDeleteNote }) => {
    return (
        <div className='notes-list'>
            {notes.map((note) => (
                <Note
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    date={note.date}
                    handleDeleteNote={handleDeleteNote}
                />
            ))}
            <AddNote handleAddNote={handleAddNote} />
            <AnimatedFeet />
        </div>
    );
};

export default NotesList;