import { format } from "timeago.js";
import "../assets/css/message.css";

export default function Message({ owner, msg, openImageViewer, scrollRef }) {
  return (
    <div className={owner ? "message owner" : "message"}>
      <div className="message-wrapper">
        {msg?.images.length > 0 && (
          <div
            className="image-wrapper"
            onClick={() => openImageViewer(msg.images)}
          >
            <img src={msg?.images[0]?.url} alt="" />
            {msg?.images.length > 1 && (
              <div className="image-count">+{msg?.images.length - 1}</div>
            )}
          </div>
        )}
        <p>{msg?.message}</p>
      </div>
      <span ref={scrollRef} className="timeline">
        {format(msg?.createdAt?.toDate())}
      </span>
    </div>
  );
}
