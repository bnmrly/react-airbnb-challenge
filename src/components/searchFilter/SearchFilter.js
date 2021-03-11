import React, { Fragment, useContext } from "react";
import qs from "qs";

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
    guestSearchInput,
    handleSearchFormSubmit,
    guestsNumber,
    location,
  } = appContext;

  const disabled = guestsNumber < 1 || !location;

  return (
    <Fragment>
      <div
        className={`airbnb-mock__search-bar-container airbnb-mock__search-bar-container--filter-drawer-visible-${filterDrawerVisible}`}
      >
        <form
          className="airbnb-mock__search-form"
          onSubmit={handleSearchFormSubmit}
        >
          <div className="searchbar__input-container">
            <input
              className="searchbar__input searchbar__input--location"
              type="text"
              readOnly
              name="location"
              id="searchFilter"
              value={location}
              onClick={handleOpenLocationFilterChange}
            />
            <div
              className="searchbar__guests-container"
              onClick={handleOpenGuestFilterChange}
            >
              {guestsNumber < 1 ? "Add Guests" : `${guestsNumber} guests`}
            </div>

            <input
              type="hidden"
              ref={guestSearchInput}
              name="guests"
              readOnly
              value={guestsNumber}
            />
            <button
              className="searchbar__submit"
              type="submit"
              disabled={disabled}
            >
              <SearchIcon />
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default SearchBar;
