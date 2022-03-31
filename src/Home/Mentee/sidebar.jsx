import React from "react";
import { useSelector } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";
import { baseImageUrl } from "../../Api/helpers/baseUrlImage";
import useWindowSize from "../../hooks/useWindowSize";
const Sidebar = (props) => {
  const userdata = useSelector((state) => state.Reducer.userdata);
  const { location } = props;
  let pathname = location.pathname;
  const { width } = useWindowSize();
  return (
    <div>
      <div className={`profile-sidebar ${width <= 768 && "d-none"} `}>
        <div className="user-widget">
          {userdata?.user?.image ? (
            <img
              className="pro-avatar-image"
              src={`${baseImageUrl}${userdata?.user?.image}`}
              alt="user_image"
            />
          ) : (
            <div className="pro-avatar">
              {userdata?.user?.first_name?.slice(0, 1)}
              {userdata?.user?.last_name?.slice(0, 1)}
            </div>
          )}
          <div className="user-info-cont">
            <h4 className="usr-name">
              {userdata?.user?.first_name} {userdata?.user?.last_name}
            </h4>
            <p className="mentor-type"> Fan nomi</p>
          </div>
        </div>
        <div className="progress-bar-custom">
          <h6>O'zlashtirish ko'rsatgichi &gt;</h6>
          <div className="pro-progress">
            <div className="tooltip-toggle" tabIndex={0} />
            <div className="tooltip">80%</div>
          </div>
        </div>
        <div className="custom-sidebar-nav">
          <ul>
            <li>
              <Link
                to="/mentee/dashboard"
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
                to="/mentee/favourites"
                className={pathname.includes("favourites") ? "active" : ""}
              >
                <i className="fas fa-book-reader" />
                Dars{" "}
                <span>
                  <i className="fas fa-chevron-right" />
                </span>
              </Link>
            </li>
            <li>
              <Link to="#" disabled className="disabled">
                <i className="fas fa-comments" />
                Yozishmalar{" "}
                <span>
                  <i className="fas fa-chevron-right" />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className={pathname.includes("invoices") ? "active" : ""}
              >
                <i className="fas fa-wallet" />
                To'lovlar
                <span>
                  <i className="fas fa-chevron-right" />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/mentee/mentee-profile"
                className={pathname.includes("profile-mentee") ? "active" : ""}
              >
                <i className="fas fa-user" />
                Mening profilim{" "}
                <span>
                  <i className="fas fa-chevron-right" />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* sidebar bottom  */}
    </div>
  );
};

export default withRouter(Sidebar);
