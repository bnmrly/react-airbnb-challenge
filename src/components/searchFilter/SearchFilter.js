import React, { Fragment, useContext } from "react";

// Styles
import "./SearchFilter.css";

// Assets
import SearchIcon from "@material-ui/icons/Search";

// Context
import { StaysContext } from "../../context/index";

function SearchBar() {
  const appContext = useContext(StaysContext);
  const {
    filterDrawerVisible,
    handleOpenLocationFilterChange,
    handleOpenGuestFilterChange,
  } = appContext;

  return (
    <Fragment>
      <div
        className={`airbnb-mock__search-bar-container airbnb-mock__search-bar-container--filter-drawer-visible-${filterDrawerVisible}`}
      >
        <form className="airbnb-mock__search-form">
          <div className="searchbar__input-container">
            <input
              className="searchbar__input searchbar__input--location"
              type="text"
              name="location"
              readOnly
              required
              id="searchFilter"
              // make below dynamic
              value="Helsinki, Finland"
              // onChange={handleChange}
              onClick={handleOpenLocationFilterChange}
            />
            <input
              className="searchbar__input searchform__input--guests"
              readOnly
              required
              type="text"
              name="guest"
              placeholder="Add guests"
              onClick={handleOpenGuestFilterChange}
            />
            <button className="searchbar__button" type="button">
              <SearchIcon />
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default SearchBar;
