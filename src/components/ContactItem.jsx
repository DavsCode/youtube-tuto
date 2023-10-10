import React from "react";
import Avatar from "./Avatar";

export default function ContactItem({ contact, createConversation }) {
  return (
    <div
      onClick={() => createConversation(contact?.id)}
      className="contact-item"
    >
      <Avatar
        src={contact?.profile ? contact.profile.url : ""}
        height={55}
        width={55}
        username={contact?.username}
      />
    </div>
  );
}
