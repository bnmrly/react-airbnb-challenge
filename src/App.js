import React from "react";

// Styles
import "./App.css";

// Assets
import logo from "./images/logo.svg";

// Components

import Searchbar from "./components/searchbar/Searchbar";

function App() {
  return (
    <div className="App">
      <div className="airbnb-mock__container">
        <img src={logo} alt="logo" />
        <Searchbar />
      </div>
    </div>
  );
}

export default App;
