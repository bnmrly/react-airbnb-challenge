import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StaysProvider } from "./context/index";

ReactDOM.render(
  <StaysProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StaysProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
