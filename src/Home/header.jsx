import React, { useEffect, useState } from "react";
import { withRouter, Link, useHistory, useLocation } from "react-router-dom";
import { USER } from "../constant/imagepath_home";
import { useSelector } from "react-redux";
import AppLogo from "../constant/Logo.png";
import { logout } from "../Api";
import { useLayoutEffect } from "react";
import { baseImageUrl } from "../Api/helpers/baseUrlImage";
const Header = () => {
  const role = localStorage.getItem("role");

  useEffect(() => {}, []);

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [width, height] = useWindowSize();

  const userdata = useSelector((state) => state?.Reducer.userdata);
  const location = useLocation();
  const history = useHistory();
  let pathname = location.pathname;
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const headerSettings = useHistory().location.pathname;
  return (
    <header
      className={` ${
        headerSettings.includes("/home") ? "mb-0 pb-0" : "mb-5 pb-3"
      }`}
    >
      <div className="has_menu_close " id="has_menu_close"></div>
      <div
        className={`header-fixed ${
          scrollPosition > 50 ? "bg-white shadow" : ""
        }  `}
      >
        {/* <div className="container-test-regim w-100">
          <p className="text-danger w-100 text-start Test_Our_Website mb-0 bg-transparent">
            Saytimiz test rejimida ishlamoqda. Ayrim xatoliklar bo'lsa, uzr
            so'raymiz!
          </p>
        </div> */}
        <nav
          className={`navbar navbar-expand-lg header-nav ${
            pathname.includes("/home") ? "  bg-transparent " : ""
          }`}
        >
          <div className="navbar-header">
            <a id="mobile_btn" href="">
              <span
                className={`bar-icon ${
                  scrollPosition > 50 ? "text-white" : " text-primary"
                }`}
              >
                <span />
                <span />
                <span />
              </span>
            </a>

            <Link to="/home" className="navbar-brand logo">
              <img
                src={AppLogo}
                className="img-fluid ms-4 logotipSize"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to="/home" className="menu-logo">
                <img src={AppLogo} className="img-fluid" alt="Logo" />
              </Link>
              <a id="menu_close" className="menu-close" href="#">
                <i className="fas fa-times" />
              </a>
            </div>
            <ul className="main-nav">
              <li className={pathname.includes("/home") ? "active" : ""}>
                <Link
                  id="menu_close"
                  to="/home"
                  className={`${
                    scrollPosition > 50 && width > 992
                      ? "text-dark"
                      : " text-white"
                  }  ${
                    pathname.includes("/home") || width <= 992
                      ? "  text-white "
                      : " text-dark"
                  }    `}
                >
                  Asosiy
                </Link>
              </li>
              <li className={`pathname.includes("/about") ? "active" : ""   `}>
                <Link
                  id="menu_close"
                  to="/about"
                  className={` ${
                    scrollPosition > 50 && width > 992
                      ? "text-dark"
                      : " text-white"
                  } ${
                    pathname.includes("/home") || width <= 992
                      ? "  text-white "
                      : "text-dark"
                  }`}
                >
                  Biz haqimizda
                </Link>
              </li>
              <li className={pathname.includes("blog-grid") ? "active" : ""}>
                <Link
                  id="menu_close"
                  // /reviwes-all
                  to="/home"
                  className={`${
                    scrollPosition > 50 && width > 992
                      ? "text-dark"
                      : " text-white"
                  }  ${
                    pathname.includes("/home") || width <= 992
                      ? "  text-white "
                      : "text-dark"
                  } `}
                >
                  Fikrlar
                </Link>
              </li>
              <li className={pathname.includes("blog-grid") ? "active" : ""}>
                <Link
                  id="menu_close"
                  to="/blog/blog-grid"
                  className={`default  ${
                    scrollPosition > 50 && width > 992
                      ? "text-dark"
                      : " text-white"
                  }  ${
                    pathname.includes("/home") || width <= 992
                      ? "  text-white "
                      : "text-dark"
                  } `}
                >
                  Blog
                </Link>
              </li>
              <>
                {userdata ? (
                  <>
                    <li>
                      <Link
                        id="menu_close"
                        className={`dropdown-item ${width > 576 && "d-none"}`}
                        to={`/${role}/dashboard`}
                      >
                        Umumiy
                      </Link>
                    </li>
                    <li>
                      <Link
                        id="menu_close"
                        className={`dropdown-item ${width > 576 && "d-none"}`}
                        to={`/${role}/profile-settings`}
                      >
                        Profil sozlamalari
                      </Link>
                    </li>
                    <li>
                      <Link
                        id="menu_close"
                        className={`dropdown-item ${width > 576 && "d-none"}`}
                        to="#"
                        onClick={() => logout(history)}
                      >
                        Chiqish
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="login-link">
                      <Link to="/login">Kirish </Link>
                    </li>
                    <li className="login-link">
                      <Link to="/register">Ro'ytdan o'tish</Link>
                    </li>
                  </>
                )}
              </>
            </ul>
          </div>
          {userdata ? (
            <ul className="nav header-navbar-rht">
              {/* User Menu */}
              <li className="nav-item dropdown has-arrow logged-item">
                <a
                  href="#"
                  className="dropdown-toggle nav-link"
                  data-toggle="dropdown"
                >
                  <span className="user-img">
                    <img
                      className="rounded-circle"
                      src={
                        userdata?.user?.image
                          ? `${baseImageUrl}${userdata.user.image}`
                          : USER
                      }
                      width={31}
                      alt="Darren Elder"
                    />
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <div className="user-text p-2 px-3">
                    <h6>
                      {userdata?.user?.first_name} {userdata?.user?.last_name}
                    </h6>
                    <p className="text-muted mb-0">
                      {userdata?.user?.role === "mentor"
                        ? "O'qituvchi"
                        : "O'quvchi"}
                    </p>
                  </div>
                  <Link className="dropdown-item" to={`/${role}/dashboard`}>
                    Umumiy
                  </Link>
                  <Link
                    className="dropdown-item"
                    to={`/${role}/profile-settings`}
                  >
                    Profil sozlamalari
                  </Link>
                  <div
                    className="dropdown-item"
                    to="#"
                    onClick={() => logout(history)}
                  >
                    Chiqish
                  </div>
                </div>
              </li>
              {/* /User Menu */}
            </ul>
          ) : (
            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <Link
                  className={`nav-link${
                    pathname.includes("/home")
                      ? "  text-white "
                      : " text-primary  "
                  } ${scrollPosition > 50 ? "text-primary" : " text-white"} `}
                  to="/login"
                >
                  Kirish
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link header-login " to="/register">
                  <span>Ro'yxatdan o'tish</span>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default withRouter(Header);
