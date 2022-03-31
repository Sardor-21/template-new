import React from "react";
import AppLogo from "../constant/Logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  const scroll_to_top = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="footer">
      {/* Footer Top */}
      <div className="footer-top">
        <div className="container-fluid">
          <div className="row m-0 p-0">
            <div className="col-lg-3 col-md-6">
              {/* Footer Widget */}
              <div className="footer-widget footer-about">
                <div className="footer-logo">
                  <img src={AppLogo} alt="logo" />
                </div>
                <div className="footer-about-content">
                  <div className="social-icon">
                    <ul>
                      <li>
                        <a href="https://t.me/MyTeacheruzb" target="_blank">
                          <i className="fab fa-telegram-plane" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://instagram.com/uzmyteacher?utm_medium=copy_link"
                          target="_blank"
                        >
                          <i className="fab fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/uzmyteacher/"
                          target="_blank"
                        >
                          <i aria-hidden="true" className="fab fa-facebook-f" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* /Footer Widget */}
            </div>
            <div className="col-lg-3 col-md-6">
              {/* Footer Widget */}
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">Menyu</h2>
                <ul>
                  <li>
                    <Link onClick={scroll_to_top} to="/home">Asosiy</Link>
                  </li>
                  <li>
                    <Link onClick={scroll_to_top} to="/about/">Biz haqimizda</Link>
                  </li>
                  <li>
                    <Link onClick={scroll_to_top} to="/blog/blog-grid/">Blog</Link>
                  </li>
                  <li>
                    <Link to="#">Fikrlar</Link>
                  </li>
                  {/* <li>
                    <Link to="#">Jamoa</Link>
                  </li> */}
                </ul>
              </div>
              {/* /Footer Widget */}
            </div>
            <div className="col-lg-3 col-md-6">
              {/* Footer Widget */}
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">Eng so'nggi yangiliklar</h2>
                <ul>
                  <li>
                    <Link to="/">Bizga investitsiya kiriting…...</Link>
                  </li>
                  <li>
                    <Link to="/">Daryo.uz maqolasi: Audio kursm...</Link>
                  </li>
                  <li>
                    <Link to="/">Xabar.uz maqolasi: Ikki yosh f...</Link>
                  </li>
                </ul>
              </div>
              {/* /Footer Widget */}
            </div>
            <div className="col-lg-3 col-md-6">
              {/* Footer Widget */}
              <div className="footer-widget footer-contact">
                <h2 className="footer-title">Aloqa</h2>
                <div className="footer-contact-info">
                  <div className="footer-address">
                    <span>
                      <i className="fas fa-map-marker-alt" />
                    </span>
                    <p>
                      Toshkent shahri, Yunusobod tumani, <br /> 19-mavze, 17-uy
                    </p>
                  </div>
                  <p>
                    <i className="fas fa-phone-alt" />
                    +998973003011
                  </p>
                  <p className="mb-0">
                    <i className="fas fa-envelope" />
                    info@myteacher.uz
                  </p>
                </div>
              </div>
              {/* /Footer Widget */}
            </div>
          </div>
        </div>
      </div>
      {/* /Footer Top */}
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container-fluid">
          {/* Copyright */}
          <div className="copyright">
            <div className="row">
              <div className="col-12 text-center">
                <div className="copyright-text">
                  <p className="mb-0">© 2022 MyTeacher</p>
                </div>
              </div>
            </div>
          </div>
          {/* /Copyright */}
        </div>
      </div>
      {/* /Footer Bottom */}
    </footer>
  );
};

export default Footer;
