/**
 * App Routes
 */
import React from "react";
import { Redirect, Route } from "react-router-dom";

// router service
import routerService from "../../router_service";
import Header from "./header.jsx";
import SidebarContent from "./sidebar";
import $ from "jquery";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { LoadingOff } from "../../../redux/Actions";
import { get_admin_profile } from "../../Api";

import "../../assets/css/modal.css";
import "../../assets/css/style.css";
import { ToastContainer } from "react-toastify";

const DefaultLayout = (props) => {
  useEffect(() => {
    {
      let pathvar = window.location.pathname;
      if (
        pathvar.includes("admin_login") ||
        pathvar.includes("admin_register") ||
        pathvar.includes("admin_forgot-password")
      ) {
        $("body").addClass("account-page");
      } else if (
        pathvar.includes("error-404") ||
        pathvar.includes("error-500")
      ) {
        $("body").addClass("error-page");
      }
    }
    get_admin_profile();
    LoadingOff();
  }, []);

  const { location, match, history } = props;
  const admin_role = localStorage.getItem("admin_role");
  const admin_token = localStorage.getItem("admin_token");

  return (
    <div className="main-wrapper">
      {location.pathname.includes("error-404") ||
      location.pathname.includes("error-500") ? (
        ""
      ) : (
        <Header />
      )}
      <div>
        {admin_token &&
        admin_role == "admin" &&
        location.pathname.includes("/admin") ? (
          <Route exact path={"/admin"}>
            <Redirect to={"/admin/index"} />
          </Route>
        ) : (
          <Redirect to={"/admin_login"} />
        )}
        <ToastContainer />
        {admin_token && admin_role == "admin" ? (
          routerService &&
          routerService.map((route, key) => (
            <Route
              key={key}
              path={`${match.url}/${route.path}`}
              component={route.component}
            />
          ))
        ) : (
          <Redirect to={"/admin_login"} />
        )}
      </div>
      {location.pathname.includes("error-404") ||
      location.pathname.includes("error-500") ? (
        ""
      ) : (
        <SidebarContent />
      )}
    </div>
  );
};
export default DefaultLayout;
