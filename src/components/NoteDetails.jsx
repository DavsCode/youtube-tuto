import "../assets/css/details.css";

export const NoteDetails = ({ setView, note, setCurrNote }) => {
  return (
    <div className="note-details">
      <div className="details-wrapper">
        <div
          className="details-back-btn"
          onClick={() => {
            setView(false);
            setCurrNote(null);
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        {note?.image && (
          <div className="details-image">
            <img src={note.image} alt="" />
          </div>
        )}
        <h2 className="details-title">{note?.title}</h2>
        <span className="details-timeline">{note?.createdAt}</span>
        <div className="details-body">
          <p>{note?.desc}</p>
        </div>
      </div>
    </div>
  );
};
