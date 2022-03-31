import React from "react";
import { useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { baseImageUrl } from "../../Api/helpers/baseUrlImage";
import useWindowSize from "../../hooks/useWindowSize"
const Sidebar = (props) => {
  const { location } = props;
  let pathname = location.pathname;
  const userdata = useSelector((state) => state.Reducer.userdata);
  const { width } = useWindowSize()
  return (
    <>
      <div className={`profile-sidebar ${width <= 768 && "d-none"}`}>
        <div className="user-widget">
          {userdata?.user?.image ? (
            <img
              className="pro-avatar-image"
              src={`${baseImageUrl}${userdata?.user?.image}`}
              alt="user_image"
            />
          ) : (
            <div className="pro-avatar">
              {userdata?.user?.first_name.slice(0, 1)}
              {userdata?.user?.last_name.slice(0, 1)}
            </div>
          )}

          <div className="rating">
            <StarRatings
              rating={userdata?.user?.rating ? userdata?.user?.rating : 0}
              starDimension="17px"
              starSpacing="2px"
              starRatedColor="#bd970a"
            />
          </div>
          <div className="user-info-cont">
            <h4 className="usr-name">
              {userdata?.user?.first_name} {userdata?.user?.last_name}
            </h4>
            <p className="mentor-type">{userdata?.user?.course_name}</p>
          </div>
        </div>
        <div className="progress-bar-custom">
          <h6>Complete your profiles &gt;</h6>
          <div className="pro-progress">
            <div className="tooltip-toggle" tabIndex={0} />
            <div className="tooltip">80%</div>
          </div>
        </div>
        <div className="custom-sidebar-nav">
          <ul>
            <li>
              <Link
                to="/mentor/dashboard"
                className={pathname.includes("dashboard") ? "active" : ""}
              >
                <i className="fas fa-home" />
                Umumiy{" "}
                <span>
                  <i className="fas fa-chevron-right" />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/mentor/mentee-list"
                className={pathname.includes("mentee-list") ? "active" : ""}
              >
                <i className="fas fa-user-graduate" />
                O'quvchilarim{" "}
                <span>
                  <i className="fas fa-chevron-right" />
                </span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-comments" />
                Chat{" "}
                <span>
                  <i className="fas fa-chevron-right" />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/mentor/blog"
                className={pathname.includes("blog") ? "active" : ""}
              >
                <i className="fab fa-blogger-b" />
                Blog{" "}
                <span>
                  <i className="fas fa-chevron-right" />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/mentor/mentor-profile"
                className={pathname.includes("mentor-profile") ? "active" : ""}
              >
                <i className="fas fa-user" />
                Mening Profilim{" "}
                <span>
                  <i className="fas fa-chevron-right" />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default withRouter(Sidebar);
