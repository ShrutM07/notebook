import React from 'react';

const NoteList = (props) => {
    const handleDelete = (id) => {
        props.onDeleteNote(id);
    };

    return (
        <ul>
            {props.notes.map((note) => (
                <li key={note.id}>
                <b>{note.title}</b> <br /> {note.desc}
                <button onClick={() => handleDelete(note.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default NoteList;
