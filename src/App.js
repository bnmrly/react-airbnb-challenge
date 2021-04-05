import React, { useContext } from "react";

// Styles
import "./App.css";

// Assets
import logo from "./images/logo.svg";

// Context
import { StaysContext } from "./context/index";

// Components
import SearchBar from "./components/searchBar/SearchBar";
import FilterDrawer from "./components/filterDrawer/FilterDrawer";
import Cards from "./components/cards/Cards";

function App() {
  const appContext = useContext(StaysContext);
  const { filterDrawerVisible } = appContext;

  return (
    <div className="App">
      <div className="airbnb-mock__container">
        <div className="airbnb-mock__header">
          <a className="airbnb-mock__home-link" href="/">
            <img
              src={logo}
              alt="logo"
              className={`airbnb-mock__logo airbnb-mock__logo--filter-drawer-visible-${filterDrawerVisible}`}
            />
          </a>
          <SearchBar />
        </div>
        <FilterDrawer />
        <Cards />
      </div>
    </div>
  );
}

export default App;
