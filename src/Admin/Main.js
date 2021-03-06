import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./initialpage/App";


const MainApp = () => (
  <Router>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </Router>
);

export default MainApp;
