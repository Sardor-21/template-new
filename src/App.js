import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./app-universal.jsx";
import 'react-toastify/dist/ReactToastify.css';

const MainApp = (props) => {
  // useEffect(() => {
  //   document.addEventListener("contextmenu", (event) => event.preventDefault());
  //   document.onkeydown = function (e) {
  //     if (e.keyCode === 123) {
  //       return false;
  //     }
  //     if (e.ctrlKey && e.shiftKey && e.keyCode === "I".charCodeAt(0)) {
  //       return false;
  //     }
  //     if (e.ctrlKey && e.shiftKey && e.keyCode === "J".charCodeAt(0)) {
  //       return false;
  //     }
  //     if (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) {
  //       return false;
  //     }
  //   };
  // }, []);
  return (
    <Router>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
};

export default MainApp;
