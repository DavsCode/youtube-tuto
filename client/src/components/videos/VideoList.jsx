import VideoCard from "./VideoCard";
import "./videolist.css";

export default function VideoList() {
  return (
    <div className="video-list">
      {[...Array(30)].map((item, index) => (
        <VideoCard key={index} />
      ))}
    </div>
  );
}
