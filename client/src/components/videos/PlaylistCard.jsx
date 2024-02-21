import "./playlistcard.css";
import Cover from "../../assets/listcover.png";
import { RiPlayList2Fill } from "react-icons/ri";

export default function PlaylistCard() {
  return (
    <div className="playlist-card">
      <div className="wrapper">
        <div className="cover-wrapper">
          <img src={Cover} alt="" className="cover" />
          <div className="icon-wrapper">
            <span>22</span>
            <RiPlayList2Fill className="icon" />
          </div>
        </div>
        <span className="title">List Name</span>
      </div>
    </div>
  );
}
