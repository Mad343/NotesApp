import React, { useState } from "react";

const initialNotes = [
  {
    id: 118836,
    name: "Sample Note",
    content: "kbahasdkasksdkjasdkbjasdbjkadbjksadbkdaskbsdbjkbadbjkasdjkb",
  },
  {
    id: 933372,
    name: "PassWords",
    content: "1.YouAreMad \n 2.IAmMad",
  },
  {
    id: 499476,
    name: "Poem",
    content: "Random words idk how to write a poem heheheh",
  },
];

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [showAddNote, setShowAddNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  function handleShowAddNote() {
    setShowAddNote((show) => !show);
  }

  function handleNoteSelection(note) {
    setSelectedNote(note);
  }

  function handleAddNote(note) {
    setNotes((notes) => [...notes, note]);
    setShowAddNote(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Notes notes={notes} onNoteSelect={handleNoteSelection} />

        {showAddNote && <AddNote onAddNote={handleAddNote} />}

        <Button onClick={handleShowAddNote}>
          {showAddNote === true ? "Close" : "Add Note"}
        </Button>
      </div>
      {selectedNote && <ContentBox selectedNote={selectedNote} />}
    </div>
  );
}

function Notes({ notes, onNoteSelect }) {
  return (
    <ul>
      {notes.map((note) => (
        <Note note={note} onNoteSelect={onNoteSelect} />
      ))}
    </ul>
  );
}

function Note({ note, onNoteSelect }) {
  return (
    <li>
      <h3>{note.name}</h3>
      <p>{note.content}</p>
      <Button onClick={() => onNoteSelect(note)}>Select</Button>
    </li>
  );
}

function AddNote({ onAddNote }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    const id = crypto.randomUUID();
    const newTitle = {
      id,
      name,
      content: "",
    };
    onAddNote(newTitle);
    setName("");
  }
  return (
    <form className="form-add-note" onSubmit={handleSubmit}>
      <label>✏️TITLE OF NOTE</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <div>
        <Button>ADD</Button>
      </div>
    </form>
  );
}

function ContentBox({ selectedNote }) {
  const [content, setContent] = useState("");
  const handleContentChange = (e) => {
    setContent((content) => content + e.target.innerHTML);
  };
  return (
    <form className="form-content-box">
      <label>📝Type content for {selectedNote.name}</label>

      <div
        className="content-div"
        contentEditable="true"
        onInput={handleContentChange}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* <div
        className="content-div"
        contentEditable="true"
        onInput={handleContentChange}
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      <div>
        <Button>Save</Button>
      </div>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default App;
