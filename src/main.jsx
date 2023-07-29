import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/global.css";
import { PaletteProvider } from "./context/PaletteContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PaletteProvider>
      <App />
    </PaletteProvider>
  </React.StrictMode>
);
