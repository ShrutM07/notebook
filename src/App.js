import React, { useState, useEffect } from 'react';
import AddNote from './components/Users/AddNote';
import NoteList from './components/Users/NoteList';

function App() {
  const [noteList, setNoteList] = useState([]);
  const [totalNotes, setTotalNotes] = useState(0);
  const [searchedNotes, setSearchedNotes] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      setFilteredCount(searchedNotes.length);
    } else {
      setFilteredCount(noteList.length);
    }
  }, [noteList, searchedNotes, searchTerm]);

  const addNoteHandler = (nTitle, nDesc) => {
    const newNote = { title: nTitle, desc: nDesc, id: Math.random().toString() };
    setNoteList((prevNoteList) => {
      const updatedNoteList = [...prevNoteList, newNote];
      setTotalNotes(updatedNoteList.length);
      return updatedNoteList;
    });
    if (searchTerm.trim() !== '' && (newNote.title.toLowerCase().includes(searchTerm.toLowerCase()) || newNote.desc.toLowerCase().includes(searchTerm.toLowerCase()))) {
      setSearchedNotes((prevSearchedNotes) => [...prevSearchedNotes, newNote]);
    }
  };

  const deleteNoteHandler = (id) => {
    setNoteList((prevNoteList) => {
      const updatedNoteList = prevNoteList.filter(note => note.id !== id);
      setTotalNotes(updatedNoteList.length);
      setSearchedNotes(updatedNoteList.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.desc.toLowerCase().includes(searchTerm.toLowerCase())));
      return updatedNoteList;
    });
  };

  const searchNoteHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === '') {
      setSearchedNotes([]);
      return;
    }

    const filteredNotes = noteList.filter(note => {
      return note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            note.desc.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setSearchedNotes(filteredNotes);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1>NoteBook</h1>
      <label htmlFor="snote">Search Notes:</label>
      <input type="text" onChange={(e) => searchNoteHandler(e.target.value)} />
      <div>Total Notes: {totalNotes}</div>
      <div>Showing: {filteredCount}</div>
      <br />
      <br />
      <AddNote onAddNote={addNoteHandler} />
      <NoteList notes={searchTerm.trim() !== '' ? searchedNotes : noteList} onDeleteNote={deleteNoteHandler} />
    </div>
  );
}

export default App;
