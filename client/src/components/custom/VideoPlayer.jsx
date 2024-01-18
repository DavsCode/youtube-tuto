import "./videoplayer.css";
import sample from "../../assets/sample.mp4";

export default function VideoPlayer({ src }) {
  return (
    <div className="video-player">
      <video src={src ? src : sample} controls />
    </div>
  );
}
