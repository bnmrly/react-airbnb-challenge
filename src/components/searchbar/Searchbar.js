import React, { Fragment, useContext } from "react";

// Styles
import "./Searchbar.css";

// Assets
import CloseIcon from "@material-ui/icons/Close";

// Context
import { StaysContext } from "../../context/index";

function SearchBar(props) {
  const appContext = useContext(StaysContext);
  console.log("appContext in searchbar***", appContext);
  const {
    filterDrawerVisible,
    handleOpenFilterDrawerClick,
    handleCloseFilterDrawerClick,
  } = appContext;

  return (
    <Fragment>
      <div
        className="airbnb-mock__search-container"
        onClick={handleOpenFilterDrawerClick}
      >
        <div className="airbnb-mock__searchbar">
          <input
            className="searchbar__input searchbar__input--location"
            type="text"
            name="location"
            readOnly
            required
            id="searchFilter"
            placeholder="Helsinki, Finland"
            // value={searchTerm}
            // onChange={handleChange}
          />
          <input
            className="searchbar__input searchform__input--guests"
            readOnly
            required
            type="text"
            name="guest"
            placeholder="Add guests"
          />
          <div className="searchbar__button-container">
            <button className="searchbar__button" type="button">
              ?
            </button>
          </div>
        </div>
      </div>

      {filterDrawerVisible && (
        <div className="airbnb-mock__filter-drawer">
          <div className="filter-drawer__header">
            <p>Edit your search</p>
            <button
              className="filter-drawer__close-button"
              onClick={handleCloseFilterDrawerClick}
            >
              <CloseIcon />
            </button>
          </div>

          <h1>Filter drawer here please</h1>
        </div>
      )}
    </Fragment>
  );
}

export default SearchBar;
