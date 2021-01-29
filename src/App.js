import React from "react";
import "./App.css";
import logo from "./images/logo.svg";

function App() {
  return (
    <div className="App">
      <div className="airbnb-mock__container">
        <img src={logo} alt="logo" />
        <h1>Filter bar here</h1>
      </div>
    </div>
  );
}

export default App;
