import { createContext, useEffect, useReducer } from "react";
import { Reducer } from "./Reducer";
import { chechAuthUser } from "./Actions";

const initState = {
  auth: JSON.parse(localStorage.getItem("chat_user")) || null,
  user: null,
  users: [],
  currentChat: null,
  chats: [],
};

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initState);

  useEffect(() => {
    chechAuthUser(dispatch);
  }, []);

  useEffect(() => {
    localStorage.setItem("chat_user", JSON.stringify(state.auth));
  }, [state.auth]);

  return (
    <Context.Provider
      value={{
        auth: state.auth,
        user: state.user,
        users: state.users,
        currentChat: state.currentChat,
        chats: state.chats,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
