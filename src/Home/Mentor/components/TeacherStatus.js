import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  faHome,
  faUser,
  faComment,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import "../../Mentee/components/statusbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import scroll_to_top from "../../../hooks/scroll_to_top";
import { faBloggerB } from "@fortawesome/free-brands-svg-icons";

const TeacherStatusBar = () => {
  const location = useLocation();
  return (
    <div className="statusbar">
      <div className="statusbar_item">
        <Link
          className={`link ${
            location.pathname.includes("/mentor/mentor-profile") ? "active" : ""
          }`}
          onClick={() => scroll_to_top()}
          to={"/mentor/mentor-profile"}
        >
          <FontAwesomeIcon icon={faUser} />
          <span className="text">Profil</span>
        </Link>
      </div>
      <div className="statusbar_item">
        <Link
          className={`link ${
            location.pathname.includes("/mentor/mentee-list") ? "active" : ""
          }`}
          onClick={() => scroll_to_top()}
          to={"/mentor/mentee-list"}
        >
          <FontAwesomeIcon icon={faUserGraduate} />
          <span className="text">O'quvchilar</span>
        </Link>
      </div>
      <div className="statusbar_item">
        <Link
          className={`link ${
            location.pathname.includes("/mentor/dashboard") ? "active" : ""
          }`}
          onClick={() => scroll_to_top()}
          to={"/mentor/dashboard"}
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
        <Link className="link " to={"/mentor/blog"}>
          <FontAwesomeIcon icon={faBloggerB} />
          <span className="text">Blog</span>
        </Link>
      </div>
    </div>
  );
};

export default TeacherStatusBar;
