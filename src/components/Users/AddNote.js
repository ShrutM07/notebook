import React, { useState } from 'react';

const AddNote = (props) => {
    const [enteredNoteTitle, setEnteredNoteTitle] = useState('');
    const [enteredDesc, setEnteredDesc] = useState('');

    const addNoteHandler = (event) => {
        event.preventDefault();
        props.onAddNote(enteredNoteTitle, enteredDesc);
        setEnteredNoteTitle('');
        setEnteredDesc('');
    };

    const tnoteChangeHandler = (event) => {
        setEnteredNoteTitle(event.target.value);
    };

    const desChangeHandler = (event) => {
        setEnteredDesc(event.target.value);
    };

    return (
        <div className="App">
        
            <form onSubmit={addNoteHandler}>
                <label htmlFor="tnote">Note Title: </label>
                <input type="text" id="tnote" value={enteredNoteTitle} onChange={tnoteChangeHandler}/>
                <br /><br />
                <label htmlFor="des"> Note Desc: </label>
                <br></br>
                <textarea rows="10" cols="20" id="des" value={enteredDesc} onChange={desChangeHandler}></textarea>
                <br />
                <button type="submit">Add to Book</button>
            </form>
        </div>
    );
};

export default AddNote;
