import "../assets/css/details.css";

export const NoteDetails = ({ setView, note }) => {
  return (
    <div className="note-details">
      <div className="details-wrapper">
        <div className="details-back-btn" onClick={() => setView(false)}>
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <h2 className="details-title">{note?.title}</h2>
        <span className="details-timeline">{note?.createdAt}</span>
        <div className="details-body">
          <p>{note?.desc}</p>
        </div>
      </div>
    </div>
  );
};
