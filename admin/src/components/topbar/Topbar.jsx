import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { userLogout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function Topbar() {
  const myStorage = window.localStorage;
  const dispatch = useDispatch();

  const handleClick = () => {
    userLogout(dispatch);
    myStorage.removeItem("persist:root");
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Razer Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <a href="/login" style={{ textDecoration: "none", color: "black" }} onClick={handleClick}>Logout</a>
          </div>
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Razer_snake_logo.svg/1200px-Razer_snake_logo.svg.png" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
