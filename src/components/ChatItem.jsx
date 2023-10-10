import React from "react";
import Avatar from "./Avatar";
import { format } from "timeago.js";

export default function ChatItem({ chat, active, selectConversation }) {
  let lastMessage = "";
  if (chat?.last?.createdAt) {
    lastMessage = chat?.last?.message ? chat.last.message : "...";
  } else {
    lastMessage = `You: say hi! to ${chat?.friend?.username}`;
  }
  return (
    <div
      className={active ? "chat-item active" : "chat-item"}
      onClick={() => selectConversation(chat)}
    >
      <Avatar
        src={chat?.friend?.profile ? chat.friend.profile : ""}
        height={55}
        width={55}
      />
      <div className="chat-item-infos">
        <div className="avatar-infos">
          <span className="username">{chat?.friend?.username}</span>
          {chat?.last?.createdAt && (
            <span className="timeline">
              {format(chat?.last?.createdAt?.toDate())}
            </span>
          )}
        </div>
        <p className="last-message">{lastMessage}</p>
      </div>
    </div>
  );
}
