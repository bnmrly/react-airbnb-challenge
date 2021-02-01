import React, { useState } from "react";

const StaysContext = React.createContext();

const StaysProvider = (props) => {
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

  const handleOpenFilterDrawerClick = () => {
    console.log("Opening filter drawer");
    setFilterDrawerVisible(true);
  };

  const handleCloseFilterDrawerClick = () => {
    console.log("Closing filter drawer");
    setFilterDrawerVisible(false);
  };

  return (
    <StaysContext.Provider
      value={{
        filterDrawerVisible,
        handleOpenFilterDrawerClick,
        handleCloseFilterDrawerClick,
      }}
    >
      {props.children}
    </StaysContext.Provider>
  );
};

export { StaysProvider, StaysContext };
