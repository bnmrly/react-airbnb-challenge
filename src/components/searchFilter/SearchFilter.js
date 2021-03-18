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
    guestSearchInput,
    handleSearchFormSubmit,
    totalGuestNumber,
    childGuestNumber,
    adultGuestNumber,
    location,
  } = appContext;

  const disabled = totalGuestNumber < 1 || !location;

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
            {/* below hack for better mobile styling due to input type text width REVISIT*/}
            {/* <button
              className="searchbar__input searchbar__input--location"
              type="button"
              name="location"
              onClick={handleOpenLocationFilterChange}
            >
              {location}
            </button> */}
            <div
              className={`searchbar__guests-container searchbar__guests-container--${totalGuestNumber}-guests`}
              onClick={handleOpenGuestFilterChange}
            >
              {totalGuestNumber < 1
                ? "Add Guests"
                : `${totalGuestNumber} guests`}
            </div>

            <input
              type="hidden"
              ref={guestSearchInput}
              name="guests"
              readOnly
              value={totalGuestNumber}
            />
            <input
              type="hidden"
              ref={guestSearchInput}
              name="children"
              readOnly
              value={childGuestNumber}
            />
            <input
              type="hidden"
              ref={guestSearchInput}
              name="adults"
              readOnly
              value={adultGuestNumber}
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
