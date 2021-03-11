import React, { Fragment, useState, useContext } from "react";
import uniqid from "uniqid";

// Styles
import "./FilterDrawer.css";

// Assets
import CloseIcon from "@material-ui/icons/Close";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

// Context
import { StaysContext } from "../../context/index";

function SearchBar(props) {
  const appContext = useContext(StaysContext);
  const {
    filterDrawerVisible,
    guestFilterVisible,
    locationFilterVisible,
    setFilterDrawerVisible,
    uniqueCities,
    locationSearchOption,
    handlelocationSearchChange,
    handleOpenLocationFilterChange,
    handleOpenGuestFilterChange,
    totalGuestNumber,
    adultGuestNumber,
    setChildGuestNumber,
    setAdultGuestNumber,
    setTotalGuestNumber,
    childGuestNumber,
    handleSearchFormSubmit,
    guestsNumber,
    location,
  } = appContext;

  const [
    adultDecrementButtonDisabled,
    setAdultDecrementButtonDisabled,
  ] = useState(true);

  const [
    childDecrementButtonDisabled,
    setChildDecrementButtonDisabled,
  ] = useState(true);

  const incrementAdultGuestNumber = () => {
    if (adultDecrementButtonDisabled) {
      setAdultDecrementButtonDisabled(!adultDecrementButtonDisabled);
    }
    setAdultGuestNumber(adultGuestNumber + 1);
    setTotalGuestNumber(totalGuestNumber + 1);
  };

  const decrementAdultGuestNumber = () => {
    if (adultGuestNumber > 0) {
      setAdultGuestNumber(adultGuestNumber - 1);
      setTotalGuestNumber(totalGuestNumber - 1);
    } else {
      setAdultDecrementButtonDisabled(!adultDecrementButtonDisabled);
    }
  };

  const incrementChildGuestNumber = () => {
    if (childDecrementButtonDisabled) {
      setChildDecrementButtonDisabled(!childDecrementButtonDisabled);
    }
    setChildGuestNumber(childGuestNumber + 1);
    setTotalGuestNumber(totalGuestNumber + 1);
  };

  const decrementChildGuestNumber = () => {
    const updatedChildGuestNumber = childGuestNumber - 1;

    if (childGuestNumber > 0) {
      setChildGuestNumber(updatedChildGuestNumber);
      setTotalGuestNumber(totalGuestNumber - 1);
    }

    if (updatedChildGuestNumber === 0) {
      setChildDecrementButtonDisabled(true);
    }
  };

  const disabledSubmit = guestsNumber < 1 || !location;

  return (
    <Fragment>
      {filterDrawerVisible && (
        <div className="airbnb-mock__filter-drawer-container">
          <div className="airbnb-mock__filter-drawer">
            <div className="filter-drawer__header">
              <p className="filter-drawer__header-text">Edit your search</p>
              <button
                className="filter-drawer__close-button"
                onClick={() => setFilterDrawerVisible(!filterDrawerVisible)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="filter-drawer__container">
              <form className="filter-drawer__form">
                <div className="filter-drawer__input-container">
                  <div className="input__container input__container--location">
                    <label
                      htmlFor="filterDrawerLocation"
                      className="filter-drawer__label filter-drawer__label--location"
                    >
                      Location
                    </label>
                    <input
                      className="filter-drawer__input filter-drawer__input--location"
                      type="text"
                      name="location"
                      required
                      id="searchFilter"
                      placeholder="Helsinki, Finland"
                      value={locationSearchOption}
                      readOnly
                      onClick={handleOpenLocationFilterChange}
                    />
                  </div>

                  <div className="input__container input__container--guests">
                    <label
                      htmlFor="filterDrawerGuests"
                      className="filter-drawer__label filter-drawer__label--location"
                    >
                      Guests
                    </label>
                    <div
                      className={`filter-drawer__input filter-drawer__input--guests guests-${guestsNumber}`}
                      onClick={handleOpenGuestFilterChange}
                    >
                      {guestsNumber < 1
                        ? "Add Guests"
                        : `${guestsNumber} guests`}
                    </div>
                    <input
                      type="hidden"
                      readOnly
                      name="guests"
                      value={guestsNumber}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="filter-drawer-form_submit-button"
                  disabled={disabledSubmit}
                  onSubmit={() => {
                    setFilterDrawerVisible(!filterDrawerVisible);
                    handleSearchFormSubmit();
                  }}
                >
                  <SearchIcon className="filter-drawer-form-submit-button__icon" />
                  Search
                </button>
              </form>
              <div className="filter-drawer__location-guests-container">
                {locationFilterVisible && (
                  <div className="filter-drawer__filter filter-drawer__filter--location">
                    <ul className="filter-location__list">
                      {uniqueCities.map((city) => (
                        <li
                          className="filter-location__list-item"
                          key={uniqid()}
                          onClick={handlelocationSearchChange}
                        >
                          <LocationOnIcon className="filter-location-list-item__icon" />
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {guestFilterVisible && (
                  <div className="filter-drawer__filter filter-drawer__filter--guests">
                    <div className="filter-drawer-guests__container filter-drawer-guests__container--adults">
                      <p className="filter-drawer-guests__title filter-drawer-guests__title--adults">
                        Adults
                      </p>
                      <p className="filter-drawer__meta">Ages 13 or above </p>
                      <div className="filter-drawer-guests__button-container filter-drawer-guests__button-container--adults">
                        <button
                          className={`filter-drawer__guest-button filter-drawer__guest-button--decrement filter-drawer-guest-button__decrement--disabled-${adultDecrementButtonDisabled}`}
                          disabled={adultDecrementButtonDisabled}
                          onClick={decrementAdultGuestNumber}
                        >
                          <RemoveIcon />
                        </button>
                        <p className="filter-drawer-guest__number-value filter-drawer-guest__number-value--adults">
                          {adultGuestNumber}
                        </p>
                        <button
                          className="filter-drawer__guest-button filter-drawer__guest-button--increment"
                          onClick={incrementAdultGuestNumber}
                        >
                          <AddIcon />
                        </button>
                      </div>
                    </div>
                    <div className="filter-drawer-guests__container filter-drawer-guests__container--children">
                      <p className="filter-drawer-guests__title filter-drawer-guests__title--children">
                        Children
                      </p>
                      <p className="filter-drawer__meta">Ages 2-12</p>
                      <div className="filter-drawer-guests__button-container filter-drawer-guests__button-container--children">
                        <button
                          className={`filter-drawer__guest-button filter-drawer__guest-button--decrement filter-drawer-guest-button__decrement--disabled-${childDecrementButtonDisabled}`}
                          disabled={childDecrementButtonDisabled}
                          onClick={decrementChildGuestNumber}
                        >
                          <RemoveIcon />
                        </button>
                        <p className="filter-drawer-guest__number-value filter-drawer-guest__number-value--children">
                          {childGuestNumber}
                        </p>
                        <button
                          className="filter-drawer__guest-button filter-drawer__guest-button--increment"
                          onClick={incrementChildGuestNumber}
                        >
                          <AddIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default SearchBar;
