import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Video from "./pages/video/Video";
import Channel from "./pages/channel/Channel";
import Upsert from "./pages/upsert/Upsert";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

export default function App() {
  const { state } = useContext(AppContext);
  console.log(state);
  return (
    <div className={`app ${state?.theme}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="videos">
              <Route path=":id" element={<Video />} />
            </Route>
            <Route path="channel">
              <Route path=":id" element={<Channel />} />
            </Route>
            <Route path="upload" element={<Upsert />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
