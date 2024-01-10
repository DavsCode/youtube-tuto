import VideoList from "../../components/videos/VideoList";
import "./home.css";
import cover from "../../assets/header.png";

export default function Home() {
  return (
    <div className="home">
      <div className="header">
        <img src={cover} alt="cover header" className="cover-header" />
        <div className="header-wrapper">
          <h2>Your videos, your community, your stage.</h2>
          <p>Where videos bring poeple together</p>
        </div>
      </div>
      <VideoList />
    </div>
  );
}
