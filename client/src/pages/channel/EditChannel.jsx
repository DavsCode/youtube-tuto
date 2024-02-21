import "./editchannel.css";
import { AppContext } from "../../context/AppContext";
import DefaultBanner from "../../assets/banner.png";
import DefaulProfile from "../../assets/default.png";
import { useContext, useState } from "react";
import { FaCamera } from "react-icons/fa6";

export default function EditChannel({ open, onClose }) {
  const [banner, setBanner] = useState(null);
  const [profile, setProfile] = useState(null);
  const [channel, setChannel] = useState("");
  const [desc, setDesc] = useState("");
  const { state } = useContext(AppContext);

  const handleCancel = (e) => {
    e.preventDefault();
    clearInputs();
    onClose(false);
  };

  const handleBanner = (e) => {
    setBanner(e.target.files[0]);
  };

  const handleProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  const clearInputs = () => {
    setBanner(null);
    setProfile(null);
    setChannel("");
    setDesc("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      banner,
      profile,
      channel,
      desc,
    };

    console.log("saving...", data);
    clearInputs();

    onClose(false);
  };

  return (
    <div className={open ? "edit-channel active" : "edit-channel"}>
      <div className={`wrapper ${state?.theme}`}>
        <div className="banner">
          <img
            src={banner ? URL.createObjectURL(banner) : DefaultBanner}
            alt=""
          />
          <label htmlFor="upload-banner">
            <input
              type="file"
              id="upload-banner"
              accept="image/png, image/jpg, image/jpeg"
              style={{ display: "none" }}
              onChange={handleBanner}
            />
            <div className="upload-banner">
              <FaCamera className="camera-icon" />
            </div>
          </label>
        </div>

        <div className="infos">
          <div className="profile-wrapper">
            <img
              src={profile ? URL.createObjectURL(profile) : DefaulProfile}
              alt=""
              className="avatar"
            />
            <label htmlFor="upload-profile">
              <input
                type="file"
                id="upload-profile"
                accept="image/png, image/jpg, image/jpeg"
                style={{ display: "none" }}
                onChange={handleProfile}
              />
              <div className="upload-profile">
                <FaCamera className="camera-icon" />
              </div>
            </label>
          </div>

          <form onSubmit={handleSubmit} className="details">
            <input
              required
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              type="text"
              placeholder="Channel Name"
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Channel Description"
            />
            <div className="actions">
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
