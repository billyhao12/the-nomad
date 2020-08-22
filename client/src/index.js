import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { StoreProvider } from "./store";

ReactDOM.render(
    (
  <StoreProvider>
    <App />
  </StoreProvider>
    ),

  document.getElementById("root")
);
registerServiceWorker();
