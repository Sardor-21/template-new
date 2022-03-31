import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  faHome,
  faBookReader,
  faUser,
  faComment,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import "./statusbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import scroll_to_top from "../../../hooks/scroll_to_top";
const Statusbar = () => {
  const location = useLocation();
  return (
    <div className="statusbar">
      <div className="statusbar_item">
        <Link
          className={`link ${
            location.pathname.includes("/mentee/mentee-profile") ? "active" : ""
          }`}
          onClick={() => scroll_to_top()}
          to={"/mentee/mentee-profile"}
        >
          <FontAwesomeIcon icon={faUser} />
          <span className="text">Profil</span>
        </Link>
      </div>
      <div className="statusbar_item">
        <Link
          className={`link ${
            location.pathname.includes("/mentee/favourites") ? "active" : ""
          }`}
          onClick={() => scroll_to_top()}
          to={"/mentee/favourites"}
        >
          <FontAwesomeIcon icon={faBookReader} />
          <span className="text">Darslarim</span>
        </Link>
      </div>
      <div className="statusbar_item">
        <Link
          className={`link ${
            location.pathname.includes("/mentee/dashboard") ? "active" : ""
          }`}
          onClick={() => scroll_to_top()}
          to={"/mentee/dashboard"}
        >
          <FontAwesomeIcon icon={faHome} />
          <span className="text">Umumiy</span>
        </Link>
      </div>
      <div className="statusbar_item">
        <Link className="link" to={"/"}>
          <FontAwesomeIcon icon={faComment} />
          <span className="text">Chat</span>
        </Link>
      </div>
      <div className="statusbar_item">
        <Link className="link " to={"/"}>
          <FontAwesomeIcon icon={faWallet} />
          <span className="text">To'lov</span>
        </Link>
      </div>
    </div>
  );
};

export default Statusbar;
