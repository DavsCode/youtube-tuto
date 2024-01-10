import { createContext, useReducer, useEffect } from "react";

const initState = {
  theme: JSON.parse(localStorage.getItem("theme")) || "dark",
  onMenu: false,
};

export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "TOGGLE_MENU":
      return {
        ...state,
        onMenu: !state.onMenu,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(state.theme));
  }, [state.theme]);

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    });
  };

  const toggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  return (
    <AppContext.Provider value={{ state, toggleMenu, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};
