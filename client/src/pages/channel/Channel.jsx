import "./channel.css";
import Banner from "../../assets/banner.png";
import noprofile from "../../assets/default.png";
import VideoCard from "../../components/videos/VideoCard";
import PlaylistCard from "../../components/videos/PlaylistCard";
import { useState } from "react";
import EditChannel from "./EditChannel";

export default function Channel() {
  const [tabIndex, setTabIndex] = useState(0);
  const [onEdit, setOnEdit] = useState(false);
  const authUser = true;
  return (
    <div className="channel">
      <div className="channel-wrapper container">
        <div className="banner">
          <img src={Banner} alt="banner" />
        </div>

        <div className="infos">
          <img src={noprofile} alt="avatar" className="avatar" />
          <div className="details">
            <h4 className="channel-name">John Doe</h4>
            <span className="stats">6524 subscribers . 148 videos</span>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              esse modi assumenda maiores. Accusantium tempore praesentium
              commodi qui dolorem est?
            </p>
            {authUser ? (
              <button onClick={() => setOnEdit(true)}>Edit Channel</button>
            ) : (
              <button>subscribe</button>
            )}
          </div>
        </div>

        <div className="tab-wrapper">
          <div
            className={tabIndex == 0 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(0)}
          >
            <span>Videos</span>
          </div>
          <div
            className={tabIndex == 1 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(1)}
          >
            <span>Playlist</span>
          </div>
          <div
            className={tabIndex == 2 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(2)}
          >
            <span>Settings</span>
          </div>
        </div>

        <div className="tab-content">
          {tabIndex == 0 && (
            <div className="list-items">
              {[...Array(15)].map((item, index) => (
                <VideoCard key={index} />
              ))}
            </div>
          )}
          {tabIndex == 1 && (
            <div className="list-items">
              {[...Array(15)].map((item, index) => (
                <PlaylistCard key={index} />
              ))}
            </div>
          )}
          {tabIndex == 2 && <div className="channel-settings">settings</div>}
        </div>
      </div>

      <EditChannel open={onEdit} onClose={setOnEdit} />
    </div>
  );
}
