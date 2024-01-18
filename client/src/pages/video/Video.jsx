import { useState } from "react";
import Comments from "../../components/comments/Comments";
import Avatar from "../../components/custom/Avatar";
import VideoPlayer from "../../components/custom/VideoPlayer";
import VideoCard from "../../components/videos/VideoCard";
import "./video.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

export default function Video() {
  const [more, setMore] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <div className="video-preview">
      <div className="video-preview-wrapper container">
        <div className="video-preview-left">
          <VideoPlayer />
          <h2 className="video-title">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa omnis
            sunt
          </h2>
          <div className="video-preview-infos">
            <div className="channel-infos">
              <div className="left">
                <a href={`/channel/xyz`} className="avatar-wrapper">
                  <Avatar size={35} />
                  <div className="avatar-infos">
                    <h4 className="name">John Doe</h4>
                    <span className="subscribers">2.5k subscribers</span>
                  </div>
                </a>
                <button>subscribe</button>
              </div>
              <div className="right">
                <div className="action-item">
                  <FaEdit />
                </div>
                <div className="action-item">
                  <FaTrashAlt />
                </div>
                <div className="like-wrapper">
                  <div
                    className="action-item"
                    onClick={() => setLiked((prev) => !prev)}
                  >
                    {liked ? <FaHeart /> : <FaRegHeart />}
                  </div>
                  <span>25</span>
                </div>

                <div className="action-item">
                  <FaShare />
                </div>

                <div className="action-item">
                  <HiDotsHorizontal />
                </div>
              </div>
            </div>

            <div
              className={
                more ? "video-preview-desc active" : "video-preview-desc"
              }
            >
              <div className="views">235 views . 5 weeks ago</div>
              <div className="video-desc">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Velit sed mollitia debitis veniam pariatur quos cumque
                  inventore suscipit dolorem provident.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Velit sed mollitia debitis veniam pariatur quos cumque
                  inventore suscipit dolorem provident.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Velit sed mollitia debitis veniam pariatur quos cumque
                  inventore suscipit dolorem provident.
                </p>
              </div>
              <span
                onClick={() => setMore((prev) => !prev)}
                className="read-more"
              >
                {more ? "show less" : "show more"}
              </span>
            </div>

            <div className="video-comments">
              <Comments />
            </div>
          </div>
        </div>
        <div className="video-preview-right">
          {[...Array(15)].map((item, index) => (
            <VideoCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
