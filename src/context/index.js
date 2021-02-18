import React, { useState, useEffect } from "react";

const StaysContext = React.createContext();

//  SIMPLIFY THIS FILE

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
  const [
    adultDecrementButtonDisabled,
    setAdultDecrementButtonDisabled,
  ] = useState(true);

  const [
    childDecrementButtonDisabled,
    setChildDecrementButtonDisabled,
  ] = useState(true);

  const uniqueCities =
    stays.length > 0
      ? [...new Set(stays.map((stay) => `${stay.city}, ${stay.country}`))]
      : [];

  const url = `https://gist.githubusercontent.com/bnmrly/017a87ef0b50c39e778c427a6b4bee60/raw/2f316eae029b7cedd6e0b808b07655e2d40f7281/holidays.json`;

  const fetchStays = () => {
    fetch(url)
      .then((response) => response.json())
      .then((staysData) => {
        console.dir(staysData);
        setStays(staysData);
      })
      .catch((err) => console.log(err.message));
  };

  const handleOpenFilterDrawerChange = () => setFilterDrawerVisible(true);

  const handleCloseFilterDrawerChange = () => setFilterDrawerVisible(false);

  const handleOpenLocationFilterChange = () => {
    // do i want conditional checks in these?
    setFilterDrawerVisible(true);
    setLocationFilterVisible(true);
    setGuestFilterVisible(false);
  };

  const handleOpenGuestFilterChange = () => {
    setFilterDrawerVisible(true);
    setGuestFilterVisible(true);
    setLocationFilterVisible(false);
  };

  const handlelocationSearchChange = (e) =>
    setLocationSearchOption(e.target.innerText);

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

  // const handleTotalGuestNumberChnage = () => {

  // }

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // removing dependency array or adding fetchStays makes continuous get requests but removing it gives an error without eslint line below

  useEffect(() => {
    fetchStays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // fetchStays();
    if (stays.length > 0) {
      const defaultLocation = `${stays[0].city}, ${stays[0].country}`;
      setLocationSearchOption(defaultLocation);
    }
  }, [stays]);

  return (
    <StaysContext.Provider
      value={{
        filterDrawerVisible,
        handleOpenFilterDrawerChange,
        handleCloseFilterDrawerChange,
        stays,
        fetchStays,
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        handleSearchChange,
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
        setTotalGuestNumber,
        adultGuestNumber,
        adultDecrementButtonDisabled,
        childDecrementButtonDisabled,
        incrementAdultGuestNumber,
        decrementAdultGuestNumber,
        childGuestNumber,
        incrementChildGuestNumber,
        decrementChildGuestNumber,
      }}
    >
      {props.children}
    </StaysContext.Provider>
  );
};

export { StaysProvider, StaysContext };
