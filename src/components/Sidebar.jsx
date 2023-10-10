import { useContext, useEffect, useState } from "react";
import "../assets/css/sidebar.css";
import Avatar from "./Avatar";
import ChatItem from "./ChatItem";
import ContactItem from "./ContactItem";
import Profile from "./Profile";
import { logoutAsync } from "../services/authServices";
import { Context } from "../context/Context";
import { signOut } from "../context/Actions";
import {
  createConversationAsync,
  getConversationsQueryByUser,
  getSnapshotData,
} from "../services/chatServices";
import { onSnapshot } from "firebase/firestore";

export default function Sidebar() {
  const { auth, users, dispatch, chats, currentChat } = useContext(Context);
  const [newChat, setNewChat] = useState(false);
  const [onProfile, setOnProfile] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    users && setContacts(users);
    chats && setConversations(chats);
  }, [users, chats]);

  useEffect(() => {
    loadConversations();
  }, [auth, users]);

  const handleSearch = (e) => {
    const toSearch = e.target.value;
    if (newChat) {
      // start a new conversation
      if (toSearch) {
        setContacts(
          users.filter((usr) =>
            usr.username.toLowerCase().includes(toSearch.toLowerCase())
          )
        );
      } else {
        setContacts(users);
      }
    } else {
      // search conversations
      if (toSearch) {
        setConversations(
          chats.filter((chat) =>
            chat.friend.username.toLowerCase().includes(toSearch.toLowerCase())
          )
        );
      } else {
        setConversations(chats);
      }
    }
  };

  const loadConversations = () => {
    if (auth == null || users.length == 0) return;
    const query = getConversationsQueryByUser(auth.id);
    onSnapshot(query, (snapshots) => {
      const tmpConversations = [];
      snapshots.forEach((snapshot) => {
        const conv = getSnapshotData(snapshot);
        const friendId = conv.members.find((id) => id !== auth.id);
        const friend = users.find((contact) => contact.id === friendId);
        if (friend) {
          tmpConversations.push({
            ...conv,
            friend: {
              id: friendId,
              username: friend.username,
              profile: friend.profile ? friend.profile.url : "",
            },
          });
        }
      });
      dispatch({ type: "LOAD_CHATS", payload: tmpConversations });
      const convId = JSON.parse(localStorage.getItem("convId"));
      if (convId) {
        const currChat = tmpConversations.find((c) => c.id === convId);
        dispatch({ type: "SET_CURRENT_CHAT", payload: currChat });
      }
    });
  };

  const handleCreateConversation = async (friendId) => {
    if (auth == null) return;
    // check if conversation exists
    const conv = conversations.find((c) => c.friend.id === friendId);
    if (conv) {
      // set conv als current conversation
      dispatch({ type: "SET_CURRENT_CHAT", payload: conv });
      localStorage.setItem("convId", JSON.stringify(conv.id));
      setNewChat(false);
    } else {
      // let's create first a conversation
      const res = await createConversationAsync(auth.id, friendId);
      if (res) {
        localStorage.setItem("convId", JSON.stringify(res.id));
        setNewChat(false);
      }
    }
  };

  const handleSelectConversation = (conv) => {
    dispatch({ type: "SET_CURRENT_CHAT", payload: conv });
    localStorage.setItem("convId", JSON.stringify(conv.id));
  };

  const handleLogout = async () => {
    await logoutAsync();
    dispatch(signOut());
  };

  return (
    <div className="sidebar">
      <Profile open={onProfile} setOpen={setOnProfile} />
      <div className="wrapper">
        <div className="top">
          <div style={{ cursor: "pointer" }} onClick={() => setOnProfile(true)}>
            <Avatar
              src={auth?.profile ? auth.profile : ""}
              height={45}
              width={45}
            />
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
                onChange={handleSearch}
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
                {contacts.map((contact) => (
                  <ContactItem
                    createConversation={handleCreateConversation}
                    contact={contact}
                    key={contact?.id}
                  />
                ))}
              </div>
            ) : (
              <div className="items-wrapper">
                {conversations.map((chat) => (
                  <ChatItem
                    chat={chat}
                    active={chat?.id == currentChat?.id}
                    selectConversation={handleSelectConversation}
                    key={chat?.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="bottom">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-power-off"></i>Logout
          </button>
        </div>
      </div>
    </div>
  );
}
