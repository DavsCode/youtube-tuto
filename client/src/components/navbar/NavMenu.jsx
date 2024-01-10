import Avatar from "../custom/Avatar";
import "./navmenu.css";
import { NavLink } from "react-router-dom";
import {
  FaGear,
  FaFlag,
  FaCircleQuestion,
  FaCircleHalfStroke,
} from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function NavMenu({ user, open, onClose }) {
  const { state, toggleTheme } = useContext(AppContext);
  return (
    <div className={open ? "nav-menu active" : "nav-menu"}>
      <div className={`nav-menu-wrapper ${state?.theme}`}>
        {user && (
          <NavLink
            onClick={() => onClose(false)}
            to={`channel/xyz`}
            className="nav-menu-avatar"
          >
            <Avatar size={40} />
            <div className="nav-menu-infos">
              <h4>John Doe</h4>
              <span>View Channel</span>
            </div>
          </NavLink>
        )}

        <div className="nav-menu-links">
          {user ? (
            <div className="nav-menu-item" onClick={() => onClose(false)}>
              <FiLogOut className="nav-menu-icon" />
              <span>Logout</span>
            </div>
          ) : (
            <div className="auth">
              <p>Sign in to like videos, comment and subscribe.</p>
              <NavLink
                className="login-btn"
                to="/login"
                onClick={() => onClose(false)}
              >
                Sign In
              </NavLink>
            </div>
          )}
          <div
            className="nav-menu-item"
            onClick={() => {
              toggleTheme();
              onClose(false);
            }}
          >
            <FaCircleHalfStroke className="nav-menu-icon" />
            <span>Dark Mode</span>
          </div>
          <NavLink onClick={() => onClose(false)} to="/settings">
            <FaGear className="nav-menu-icon" />
            <span>Settings</span>
          </NavLink>
          <NavLink onClick={() => onClose(false)} to="/report">
            <FaFlag className="nav-menu-icon" />
            <span>Report</span>
          </NavLink>
          <NavLink onClick={() => onClose(false)} to="/help">
            <FaFlag className="nav-menu-icon" />
            <span>Help</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
