import { useState } from "react";
import "../assets/css/sidebar.css";
import Avatar from "./Avatar";
import ChatItem from "./ChatItem";
import ContactItem from "./ContactItem";
import Profile from "./Profile";

export default function Sidebar({ setChat }) {
  const [newChat, setNewChat] = useState(false);
  const [onProfile, setOnProfile] = useState(false);

  console.log(onProfile);
  return (
    <div className="sidebar">
      <Profile open={onProfile} setOpen={setOnProfile} />
      <div className="wrapper">
        <div className="top">
          <div style={{cursor: "pointer"}} onClick={() => setOnProfile(true)}>
            <Avatar src="" height={45} width={45} />
          </div>
          {newChat && <span className="heading">Add Conversation</span>}
          <div
            className={newChat ? "app-icon active" : "app-icon"}
            onClick={() => setNewChat((prev) => !prev)}
          >
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
        <div className="center">
          <div className="search-wrapper">
            <div className="input-wrapper">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder={
                  newChat ? "Search a contact" : "Search a conversation"
                }
              />
            </div>
          </div>
          <div className="center-wrapper">
            {newChat ? (
              <div className="items-wrapper">
                {[...Array(50)].map((contact, index) => (
                  <ContactItem key={index} />
                ))}
              </div>
            ) : (
              <div className="items-wrapper">
                {[...Array(50)].map((chat, index) => (
                  <ChatItem setChat={setChat} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="bottom">
          <button className="logout-btn">
            <i className="fa-solid fa-power-off"></i>Logout
          </button>
        </div>
      </div>
    </div>
  );
}
