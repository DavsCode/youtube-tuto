import { useState } from "react";
import "../assets/css/upsert.css";
import { v4 as getID } from "uuid";

export const UpsertNote = ({
  setOpen,
  note,
  image,
  setImage,
  createNote,
  updateNote,
  setCurrNote,
}) => {
  const [title, setTitle] = useState(note ? note?.title : "");
  const [desc, setDesc] = useState(note ? note?.desc : "");

  const clearInputs = () => {
    setTitle("");
    setDesc("");
  };

  const handleClear = (event) => {
    event.preventDefault();
    clearInputs();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (note) {
      // update note
      updateNote({
        ...note,
        title,
        desc,
      });
    } else {
      // create note
      createNote({
        id: getID(),
        title,
        desc,
        image: "",
        createdAt: new Date().toDateString(),
      });
    }
    clearInputs();
    setOpen(false);
  };

  const handleImage = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const img = {
        filename: new Date().getTime() + "-" + file.name,
        file,
      };
      setImage(img);
    }
  };

  return (
    <div className="upsert-note">
      <div className="upsert-wrapper">
        <div className="upsert-header">
          <h2 className="heading">{note ? "Update Note" : "Add Note"}</h2>
          <div
            className="close-btn"
            onClick={() => {
              setOpen(false);
              setCurrNote(null);
              setImage(null);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        <form className="upsert-form" onSubmit={handleSubmit}>
          {(image || note?.image) && (
            <div className="image-wrapper">
              <img
                src={image ? URL.createObjectURL(image.file) : note.image}
                alt=""
              />
            </div>
          )}
          <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
            <input
              style={{ display: "none" }}
              type="file"
              accept=".jpg,.jpeg,.png"
              id="upload-image"
              onChange={handleImage}
            />{" "}
            <i className="fa-solid fa-image"></i> Image
          </label>
          <input
            required
            type="text"
            placeholder="Title"
            className="input-form"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="textarea-form"
            placeholder="Enter your note"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="upsert-actions">
            <button className="clear-btn" onClick={handleClear}>
              Clear
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
