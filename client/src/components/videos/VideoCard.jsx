import "./videocard.css";
import Avatar from "../custom/Avatar";
import cover from "../../assets/bookstore.png";

export default function VideoCard() {
  return (
    <div className="video-card">
      <a href="/videos/xyz" className="card-cover">
        <img src={cover} alt="card cover" />
      </a>
      <div className="card-details">
        <a href="/videos/xyz" className="card-title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </a>

        <div className="card-infos">
          <a href={`/channel/xyz`} className="card-profile">
            <Avatar size={24} />
          </a>
          <a href={`/channel/xyz`} className="card-channel">
            John Doe
          </a>
          <span className="card-views">125 views</span>
          <span className="timeline">2 weeks ago</span>
        </div>
      </div>
    </div>
  );
}
