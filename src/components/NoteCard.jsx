import "../assets/css/card.css";

export const NoteCard = ({ onPreview, onUpdate, onDelete, note }) => {
  return (
    <div className="note-card">
      <div className="note-card-wrapper">
        {note?.image && (
          <div className="card-image">
            <img src={note.image} alt="" />
          </div>
        )}
        <h2 className="card-title" onClick={() => onPreview(note)}>
          {note?.title}
        </h2>
        <div className="card-body">
          <p>{note?.desc}</p>
        </div>
        <span className="card-details" onClick={() => onPreview(note)}>
          read more
        </span>
        <div className="card-footer">
          <span className="card-timeline">{note?.createdAt}</span>
          <div className="card-actions">
            <div className="action-item" onClick={() => onUpdate(note)}>
              <i className="fa-solid fa-pen-to-square edit"></i>
            </div>
            <div className="action-item" onClick={() => onDelete(note?.id)}>
              <i className="fa-solid fa-trash-can delete"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
