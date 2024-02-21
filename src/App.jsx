import "./App.css";
import DragDropPage from "./pages/dragdrop/DragDropPage";
//import DropdownPage from "./pages/dropdown/DropdownPage";

export default function App() {
  return (
    <div className="container">
      <h2>Custom Components</h2>
      {/* <DropdownPage /> */}
      <DragDropPage />
    </div>
  );
}
