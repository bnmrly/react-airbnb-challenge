import React, { useState, useEffect } from "react";
import qs from "qs";

const StaysContext = React.createContext();

const StaysProvider = (props) => {
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [locationFilterVisible, setLocationFilterVisible] = useState(false);
  const [guestFilterVisible, setGuestFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSearchOption, setLocationSearchOption] = useState(
    qs.parse(window.location.search, { ignoreQueryPrefix: true }).location || ""
  );
  const [searchResults, setSearchResults] = useState([]);
  const [adultGuestNumber, setAdultGuestNumber] = useState(
    +qs.parse(window.location.search, { ignoreQueryPrefix: true }).adults || 0
  );
  const [childGuestNumber, setChildGuestNumber] = useState(
    +qs.parse(window.location.search, { ignoreQueryPrefix: true }).children || 0
  );
  const [totalGuestNumber, setTotalGuestNumber] = useState(
    +qs.parse(window.location.search, { ignoreQueryPrefix: true }).guests || 0
  );

  const [loading, setLoading] = useState(true);

  const [uniqueLocations, setuniqueLocations] = useState([]);

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

  const handlelocationSearchChange = (e) => {
    setLocationSearchOption(e.target.innerText);
  };

  // const guestSearchInput = useRef(null);

  // const locationSearchInput = useRef(null);

  const url = `https://gist.githubusercontent.com/bnmrly/017a87ef0b50c39e778c427a6b4bee60/raw/2f316eae029b7cedd6e0b808b07655e2d40f7281/holidays.json`;

  const fetchStays = () => {
    return fetch(url)
      .then((response) => response.json())
      .then((staysData) => {
        return staysData;
      })
      .catch((err) => console.log(err.message));
  };

  const handleSearchFormSubmit = (e) => {
    console.log(e);
  };

  useEffect(() => {
    setLoading(true);
    fetchStays().then((staysData) => {
      setLoading(false);
      if (staysData.length > 0) {
        const defaultLocation = `${staysData[0].city}, ${staysData[0].country}`;

        const cities = [
          ...new Set(staysData.map((stay) => `${stay.city}, ${stay.country}`)),
        ];
        setuniqueLocations(cities);
        if (!locationSearchOption) {
          setLocationSearchOption(defaultLocation);
        }
      }
      const resultMap = staysData.map((stay) => stay);
      const locationCity = locationSearchOption
        ? locationSearchOption.split(",")[0]
        : searchTerm;

      const results =
        resultMap.length > 0
          ? resultMap.filter(
              (result) =>
                result.city.includes(locationCity) &&
                result.maxGuests >= totalGuestNumber
            )
          : [];
      setSearchResults(results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StaysContext.Provider
      value={{
        filterDrawerVisible,
        setFilterDrawerVisible,
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
        uniqueLocations,
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
        loading,
      }}
    >
      {props.children}
    </StaysContext.Provider>
  );
};

export { StaysProvider, StaysContext };
