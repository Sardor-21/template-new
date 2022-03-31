import React from "react";

import * as ReactDOMClient from "react-dom/client";
import Main from "./App";
import { Provider } from "react-redux";
import Store from "./redux/store";
import "./Home/assets/css/style.css";
import "./Home/assets/css/modal.css";
import "react-phone-number-input/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("app");

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(
  <Provider store={Store}>
    <Main />
  </Provider>
);
