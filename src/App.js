import { useState } from "react";
import "./index.css";

const initialNotes = [
  {
    title: "Note 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eius,earum exercitationem dolore ducimus esse natus officiis sunt, cumminus cupiditate odit deserunt.",
    color: "#5aa0f1",
  },
  {
    title: "Note 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eius,earum exercitationem dolore ducimus esse natus officiis sunt, cumminus cupiditate odit deserunt.",
    color: "#875af1",
  },
];

export default function App() {
  return (
    <div className="app">
      <Noter />
    </div>
  );
}

function Noter() {
  const [notes, setNotes] = useState([...initialNotes]);
  const [showForm, setShowForm] = useState(false);

  function handleAddNotes(note) {
    setNotes((notes) => (notes = [...notes, note]));
    console.log(notes);
    setShowForm((showForm) => (showForm = !showForm));
  }

  return (
    <>
      <Header />
      <Notes notes={notes} />
      <AddNote
        onAddNotes={handleAddNotes}
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </>
  );
}

function Header() {
  return (
    <header>
      <h1>Noter 📝</h1>
      <input className="search" type="text" placeholder="🔎 Search..." />
    </header>
  );
}

function Notes({ notes }) {
  return (
    <div className="grid-container">
      {notes.map((note) => (
        <Note
          title={note.title}
          description={note.description}
          color={note.color}
          key={crypto.randomUUID()}
        />
      ))}
    </div>
  );
}

function Note({ title, description, color }) {
  return (
    <div style={{ backgroundColor: color }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function AddNote({ onAddNotes, showForm, setShowForm }) {
  return (
    <>
      <button
        className="myButton"
        onClick={() => setShowForm((showForm) => (showForm = !showForm))}
      >
        {showForm ? "-" : "+"}
      </button>
      {showForm && <Form onAddNotes={onAddNotes} />}
    </>
  );

  // return !showForm ? (
  //   <button
  //     className="myButton"
  //     onClick={() => setShowForm((showForm) => (showForm = !showForm))}
  //   >
  //     +
  //   </button>
  // ) : (
  //   <Form onAddNotes={onAddNotes} />
  // );
}

function Form({ onAddNotes }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      window.alert("Please enter title!");
      return;
    }
    if (!description) {
      window.alert("Please enter description!");
      return;
    }
    const newNote = { title: title, description: description, color: color };
    onAddNotes(newNote);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Note Title</label>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle((title) => (title = e.target.value))}
      />

      <label>Description</label>
      <textarea
        cols="21"
        rows="5"
        maxLength="118"
        wrap="hard"
        value={description}
        onChange={(e) =>
          setDescription((description) => (description = e.target.value))
        }
      ></textarea>

      <label>Note Color</label>
      <select
        name=""
        id=""
        onChange={(e) => setColor((color) => (color = e.target.value))}
      >
        <option value="#5aa0f1">Blue</option>
        <option value="#f15a76">Red</option>
        <option value="#478b36">Green</option>
        <option value="#875af1">Violet</option>
      </select>
      <button>➕ Add Note</button>
    </form>
  );
}
