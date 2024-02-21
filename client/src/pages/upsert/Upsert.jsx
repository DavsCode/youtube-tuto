import { useState } from "react";
import DragDropFiles from "./DragDropFiles";
import "./upsert.css";
import { FaImage } from "react-icons/fa";

export default function Upsert() {
  const [video, setVideo] = useState(null);
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const clearInputs = () => {
    setVideo(null);
    setCover(null);
    setTitle("");
    setDesc("");
  };

  const handleCover = (e) => {
    e.preventDefault();
    setCover(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      video,
      cover,
      title,
      desc,
    };

    console.log("saving...", data);

    clearInputs();
  };

  return (
    <div className="upsert">
      <div className="wrapper container">
        <h2 className="heading">Upload new video</h2>
        <div className="inputs-wrapper">
          <div className="left">
            <DragDropFiles file={video} setFile={setVideo} />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit} className="upsert-form">
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
              />

              <label htmlFor="upload-cover">
                <input
                  type="file"
                  id="upload-cover"
                  accept="image/png, image/jpg, image/jpeg"
                  style={{ display: "none" }}
                  onChange={handleCover}
                />
                <div className="upload-cover">
                  <FaImage className="camera-icon" />
                  <span>{cover ? `${cover?.name}` : "Select Cover"}</span>
                </div>
              </label>

              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description"
              />

              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
