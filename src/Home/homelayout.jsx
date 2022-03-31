import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// router service
import routerService from "./router_service";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
// bootstrap

import { Helmet } from "react-helmet";
import Page404 from "./components/Page404/page404";

const DefaultLayout = (props) => {
  const token = localStorage.getItem("access_token");
  const { location, match } = props;
  // for (let i = 0; i < routerService.length; i++) {
  //   const result = routerService[i].path === location.path.toString().slice(1, location.path.length)
  //   console.log(result)
  // }

  return (
    <div className="main-wrapper">
      <Helmet>
        <script src="//code-sb1.jivosite.com/widget/KYqF5sgbrH" async></script>
      </Helmet>
      <Header />
      <Switch>
        {routerService &&
          routerService.map((route, key) => (
            <Route
              key={key}
              path={`/${route.path}`}
              component={route.component}
            />
          ))}
        <Route component={Page404} />
      </Switch>
      {location.pathname.includes("chat") ||
      location.pathname.includes("voice-call") ||
      location.pathname.includes("video-call") ||
      location.pathname.includes("map-list") ||
      // location.pathname.includes("*") ||
      location.pathname.includes("map-grid") ? (
        ""
      ) : (
        <Footer />
      )}
    </div>
  );
};
export default withRouter(DefaultLayout);
