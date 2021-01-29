import React, { Fragment, useState } from "react";

// Styles

import "./Searchbar.css";
// Assets

import CloseIcon from "@material-ui/icons/Close";

function SearchBar() {
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

  const handleOpenClick = () => {
    console.log("Opening filter drawer");
    setFilterDrawerVisible(true);
  };

  const handleCloseClick = () => {
    console.log("Closing filter drawer");
    setFilterDrawerVisible(false);
  };

  return (
    <Fragment>
      <div className="airbnb-mock__search-container" onClick={handleOpenClick}>
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
              onClick={handleCloseClick}
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
