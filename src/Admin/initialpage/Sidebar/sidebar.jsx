/**
 * App Header
 */
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    const { location } = this.props;
    let pathname = location.pathname;

    return (
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span> Main</span>
              </li>
              <li className={pathname.includes("index") ? "active" : ""}>
                <Link to="/admin/index">
                  <i className="feather-home" />
                  <span> Umumiy</span>
                </Link>
              </li>
              <li className={pathname.includes("lead") ? "active" : ""}>
                <Link to="/admin/lead">
                  <i className="feather-users" />
                  <span>Lead</span>
                </Link>
              </li>
              <li className={pathname.includes("mentor") ? "active" : ""}>
                <Link to="/admin/mentor">
                  <i className="feather-user" />
                  <span>O'qituvchilar</span>
                </Link>
              </li>
              <li className={pathname.includes("mentee") ? "active" : ""}>
                <Link to="/admin/mentee">
                  <i className="feather-users" />
                  <span>O'quvchilar</span>
                </Link>
              </li>

              <li className={pathname.includes("booking-list") ? "active" : ""}>
                <Link to="/admin/booking-list">
                  <i className="feather-list" />
                  <span>Sinov darslari</span>
                </Link>
              </li>
              <li className={pathname.includes("categories") ? "active" : ""}>
                <Link to="/admin/categories">
                  <i className="feather-disc" />
                  <span>Categories</span>
                </Link>
              </li>
              <li
                className={
                  pathname.includes("transactions-list") ? "active" : ""
                }
              >
                <Link to="/admin/transactions-list">
                  <i className="feather-dollar-sign"></i>
                  <span>O'tkazmalar</span>
                </Link>
              </li>
              <li className={pathname.includes("settings") ? "active" : ""}>
                <Link to="/admin/settings">
                  <i className="feather-settings"></i>
                  <span>Sozlash</span>
                </Link>
              </li>
              <li className={pathname.includes("team") ? "active" : ""}>
                <Link to="/admin/team">
                  <i className="feather-users" />
                  <span>Bizning jamoa</span>
                </Link>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="feather-book"></i>
                  <span> Reports</span> <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link
                      className={pathname.includes("invoice") ? "active" : ""}
                      to="/admin/invoice-report"
                    >
                      To'lovlar tarixi
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="menu-title">
                <span> Sahifalar</span>
              </li>
              <li className={pathname.includes("profile") ? "active" : ""}>
                <Link to="/admin/profile">
                  <i className="feather-user-plus"></i>
                  <span>Mening akkauntim</span>
                </Link>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="feather-book-open"></i>
                  <span>Blog</span> <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link
                      className={pathname.includes("blog_") ? "active" : ""}
                      to="/admin/blog_"
                    >
                      {" "}
                      Blog{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes("blog-details") ? "active" : ""
                      }
                      to="/admin/blog-details"
                    >
                      {" "}
                      Blog Details{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={pathname.includes("add-blog") ? "active" : ""}
                      to="/admin/add-blog"
                    >
                      {" "}
                      Add Blog{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={pathname.includes("edit-blog") ? "active" : ""}
                      to="/admin/edit-blog"
                    >
                      {" "}
                      Edit Blog{" "}
                    </Link>
                  </li>
                </ul>
              </li>
              {/* <li className="submenu">
                <a href="#">
                  <i className="feather-lock"></i>
                  <span> Authentication </span> <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link to="/admin_login"> Login </Link>
                  </li>
                  <li>
                    <Link to="/admin_register"> Register </Link>
                  </li>
                  <li>
                    <Link to="/admin_forgot-password"> Forgot Password </Link>
                  </li>
                  <li>
                    <Link to="/lock-screen"> Lock Screen </Link>
                  </li>
                </ul>
              </li> */}
              {/* <li className={pathname.includes("blank-page") ? "active" : ""}>
                <Link to="/admin/blank-page">
                  <i className="feather-file"></i>
                  <span>Blank Page</span>
                </Link>
              </li> */}
              <li className="menu-title">
                <span>
                  <i className="fe fe-star-o" /> UI Interface
                </span>
              </li>
              <li className={pathname.includes("components") ? "active" : ""}>
                <Link to="/admin/components">
                  <i className="feather-layers"></i>
                  <span>Components</span>
                </Link>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="feather-sidebar"></i>
                  <span> Forms </span> <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link
                      className={
                        pathname.includes("form-input-groups") ? "active" : ""
                      }
                      to="/admin/form-input-groups"
                    >
                      Input Groups{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={pathname.includes("form-mask") ? "active" : ""}
                      to="/admin/form-mask"
                    >
                      {" "}
                      Form Mask{" "}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="feather-layout"></i>
                  <span> Tables </span> <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <Link
                      className={
                        pathname.includes("tables-basic") ? "active" : ""
                      }
                      to="/admin/tables-basic"
                    >
                      Basic Tables{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        pathname.includes("data-tables") ? "active" : ""
                      }
                      to="/admin/data-tables"
                    >
                      Data Table{" "}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Sidebar);
