import React, { useState, useEffect } from "react";
import qs from "qs";

const StaysContext = React.createContext();

const StaysProvider = (props) => {
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [locationFilterVisible, setLocationFilterVisible] = useState(false);
  const [guestFilterVisible, setGuestFilterVisible] = useState(false);
  const [stays, setStays] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSearchOption, setLocationSearchOption] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [adultGuestNumber, setAdultGuestNumber] = useState(0);
  const [childGuestNumber, setChildGuestNumber] = useState(0);
  const [totalGuestNumber, setTotalGuestNumber] = useState(0);

  const handleOpenLocationFilterChange = () => {
    setFilterDrawerVisible(true);
    setLocationFilterVisible(true);
    setGuestFilterVisible(false);
  };

  const handleOpenGuestFilterChange = () => {
    setFilterDrawerVisible(true);
    setGuestFilterVisible(true);
    setLocationFilterVisible(false);
  };

  // manage with state
  const handlelocationSearchChange = (e) => {
    setLocationSearchOption(e.target.innerText);
  };

  // const guestSearchInput = useRef(null);

  // const locationSearchInput = useRef(null);

  const uniqueCities =
    stays.length > 0
      ? [...new Set(stays.map((stay) => `${stay.city}, ${stay.country}`))]
      : [];

  const url = `https://gist.githubusercontent.com/bnmrly/017a87ef0b50c39e778c427a6b4bee60/raw/2f316eae029b7cedd6e0b808b07655e2d40f7281/holidays.json`;

  const fetchStays = () => {
    fetch(url)
      .then((response) => response.json())
      .then((staysData) => {
        setStays(staysData);

        if (staysData.length > 0) {
          const defaultLocation = `${staysData[0].city}, ${staysData[0].country}`;
          if (!locationSearchOption) {
            setLocationSearchOption(defaultLocation);
          }
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleSearchFormSubmit = (e) => {
    // e.preventDefault();
    // console.log("this is e", e);
    console.log("this is stays", stays);
    // e.preventDefault();
    // this fn displays properties
  };

  // removing dependency array or adding fetchStays makes continuous get requests but removing it gives an error without eslint line below

  useEffect(() => {
    fetchStays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSearchOption]);

  const guestsNumber =
    qs.parse(window.location.search, { ignoreQueryPrefix: true }).guests ||
    totalGuestNumber;

  const location =
    qs.parse(window.location.search, { ignoreQueryPrefix: true }).location ||
    locationSearchOption;

  useEffect(() => {
    console.log("this is guestsNumber", guestsNumber);
    const resultMap = stays.map((stay) => stay);
    const locationCity = location ? location.split(",")[0] : searchTerm;

    const results =
      resultMap.length > 0
        ? resultMap.filter(
            (result) =>
              result.city.includes(locationCity) &&
              result.maxGuests >= guestsNumber
          )
        : "";

    console.log("results", results);

    setSearchResults(results);
  }, [
    stays,
    setSearchResults,
    searchTerm,
    location,
    locationSearchOption,
    guestsNumber,
  ]);

  return (
    <StaysContext.Provider
      value={{
        filterDrawerVisible,
        setFilterDrawerVisible,
        stays,
        fetchStays,
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        locationFilterVisible,
        setLocationFilterVisible,
        handleOpenLocationFilterChange,
        guestFilterVisible,
        setGuestFilterVisible,
        handleOpenGuestFilterChange,
        uniqueCities,
        locationSearchOption,
        setLocationSearchOption,
        handlelocationSearchChange,
        totalGuestNumber,
        setChildGuestNumber,
        setAdultGuestNumber,
        setTotalGuestNumber,
        adultGuestNumber,
        childGuestNumber,
        handleSearchFormSubmit,
        guestsNumber,
        location,
      }}
    >
      {props.children}
    </StaysContext.Provider>
  );
};

export { StaysProvider, StaysContext };
