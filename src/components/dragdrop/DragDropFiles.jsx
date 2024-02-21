import "./dragdrop.css";

export default function DragDropFiles({ setFiles, accepts }) {
  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!e.dataTransfer?.files) return;
    const files = [...e.dataTransfer.files];
    const acceptedFiles = files.filter((file) => accepts.includes(file.type));
    setFiles([...acceptedFiles]);
  };

  const handleFiles = (e) => {
    e.preventDefault();
    setFiles([...e.target.files]);
  };

  return (
    <div className="dragdrop" onDragOver={handleDrag} onDrop={handleDrop}>
      <i className="fa-solid fa-cloud-arrow-down"></i>
      <h4>Drag and drop your files.</h4>
      <label htmlFor="upload-files">
        <input
          accept={accepts}
          multiple
          onChange={handleFiles}
          type="file"
          id="upload-files"
        />
        <div className="upload-btn">Select files</div>
      </label>
    </div>
  );
}
