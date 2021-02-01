import React, { useContext } from "react";

// Styles
import "./App.css";

// Assets
import logo from "./images/logo.svg";

// Context
import { StaysContext } from "./context/index";

// Components
import Searchbar from "./components/searchbar/Searchbar";

function App() {
  const appContext = useContext(StaysContext);
  console.log("appContext in app***", appContext);

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
