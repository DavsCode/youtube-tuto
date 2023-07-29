import { createContext, useReducer, useEffect } from "react";

const initState = {
  palette: JSON.parse(localStorage.getItem("palette")),
};

export const PaletteContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PALETTE":
      return {
        ...state,
        palette: action.payload,
      };
    default:
      return state;
  }
};

export const PaletteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    localStorage.setItem("palette", JSON.stringify(state.palette));
  }, [state?.palette?.color]);

  return (
    <PaletteContext.Provider value={{ state, dispatch }}>
      {children}
    </PaletteContext.Provider>
  );
};
