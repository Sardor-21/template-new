import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

// Pages
import HomeLayout from "./Home/homelayout.jsx";
import Login from "./Home/Authentication/login";
import Register from "./Home/Authentication/register";
import Forgotpassword from "./Home/Authentication/forgotpassword";
//Admin Layout
import AdminLayout from "./Admin/initialpage/Sidebar/DefaultLayout";
import AdminLogin from "./Admin/MainPage/Pages/Authentication/login";
import Page404 from "./Home/components/Page404/page404.js";
import Loading from "./Home/components/Loading/Loading.js";
// End Admin layout
import { LoadingOff } from "./redux/Actions";
// Api
import { UserAuth } from "./Api";
// Hooks
import useWindowSize from "./hooks/useWindowSize.js";
// Components
import Statusbar from "./Home/Mentee/components/statusbar.js";
import TeacherStatusBar from "./Home/Mentor/components/TeacherStatus.js";
// End components
const AppUniversal = (props) => {
  const { location } = props;
  const [path, setPath] = useState("");
  useEffect(() => {
    LoadingOff();
    if (
      location.pathname.includes("admin") ||
      location.pathname.includes("admin_login")
    ) {
      setPath("");
    } else {
      UserAuth(setPath);
    }
  }, []);
  const loading = useSelector((state) => state.Global.loading);
  const role = localStorage.getItem("role");
  const { width } = useWindowSize();
  return (
    <>
      {loading && <Loading />}
      <ToastContainer />

      <Switch>
        <Route path="/admin" component={AdminLayout} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={Forgotpassword} />
        <Route path="/admin_login" component={AdminLogin} />
        <Route path={"/404"} component={Page404} />
        <Route exact path="/">
          <Redirect to={path} />
        </Route>
        <Route path="/" component={HomeLayout} />
      </Switch>
      {width <= 768 && role === "mentee" ? <Statusbar /> : ""}
      {width <= 768 && role === "mentor" ? <TeacherStatusBar /> : ""}
    </>
  );
};
export default AppUniversal;
