import { useContext, useEffect, useState } from "react";
import "./assets/css/app.css";
import { Navbar } from "./components/Navbar";
import { NoteCard } from "./components/NoteCard";
import { NoteDetails } from "./components/NoteDetails";
import { UpsertNote } from "./components/UpsertNote";
import { PaletteContext } from "./context/PaletteContext";
import * as services from "./services/services";

const palettes = [
  { id: 1, color: "#0d1282", name: "blue-palette" },
  { id: 2, color: "#ff2171", name: "rose-palette" },
  { id: 3, color: "#360d95", name: "violet-palette" },
  { id: 4, color: "#333", name: "black-palette" },
];

export default function App() {
  const { state, dispatch } = useContext(PaletteContext);
  const [onCreateNote, setOnCreateNote] = useState(false);
  const [onViewNote, setOnViewNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPalette, setCurrentPalette] = useState(
    state?.palette
      ? palettes.find((p) => p.id === state.palette.id)
      : palettes[0]
  );

  const [image, setImage] = useState(null);

  let filteredNotes = [];

  useEffect(() => {
    const loadNotes = async () => {
      const res = await services.getNotesAsync();
      res && setNotes(res);
    };
    loadNotes();
  }, []);

  const handleCreateNote = async (note) => {
    if (note) {
      const res = await services.createNoteAsync(note, image);
      const tempNotes = [...notes, res];
      setNotes(tempNotes);
      setImage(null);
    }
  };

  const handleOnUpdate = (note) => {
    setCurrentNote(note);
    setOnCreateNote(true);
  };

  const handleUpdateNote = async (note) => {
    if (note) {
      const res = await services.updateNoteAsync(note, image);
      if (res) {
        const tempNotes = [...notes.map((n) => (n.id === res.id ? res : n))];
        setNotes(tempNotes);
        setCurrentNote(null);
        setImage(null);
      }
    }
  };

  const handleDeleteNote = async (noteId) => {
    await services.deleNoteAsync(noteId);
    const tempNotes = [...notes.filter((n) => n.id !== noteId)];
    setNotes(tempNotes);
  };

  const handleOnPreview = (note) => {
    setCurrentNote(note);
    setOnViewNote(true);
  };

  if (search) {
    filteredNotes = [
      ...notes.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
          n.desc.toLowerCase().includes(search.toLocaleLowerCase())
      ),
    ];
  } else {
    filteredNotes = [...notes];
  }

  return (
    <div
      className={`app ${
        state?.palette ? state?.palette?.name : currentPalette?.name
      }`}
    >
      <Navbar
        setOpen={setOnCreateNote}
        state={state}
        dispatch={dispatch}
        setCurrentPalette={setCurrentPalette}
        palettes={palettes}
        currentPalette={currentPalette}
      />
      <div className="wrapper container">
        <div className="search-wrapper">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="search-input"
            placeholder="Search"
          />
          <button className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="notes-wrapper">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note?.id}
              note={note}
              onDelete={handleDeleteNote}
              onUpdate={handleOnUpdate}
              onPreview={handleOnPreview}
            />
          ))}
        </div>
        {onCreateNote && (
          <UpsertNote
            note={currentNote}
            image={image}
            setImage={setImage}
            createNote={handleCreateNote}
            updateNote={handleUpdateNote}
            setOpen={setOnCreateNote}
            setCurrNote={setCurrentNote}
          />
        )}
        {onViewNote && (
          <NoteDetails
            note={currentNote}
            setCurrNote={setCurrentNote}
            setView={setOnViewNote}
          />
        )}
      </div>
    </div>
  );
}
