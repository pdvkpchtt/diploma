"use client";

import { useState, createContext, usefect } from "react";

export const SearchNavContext = createContext();

const SearchNavContextWrap = ({ children }) => {
  const [scroll, setScroll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [updateVacancies, setUpdateVacancies] = useState({
    startFiltering: false,
    input: "",
    isAi: { label: false },
  });

  return (
    <SearchNavContext.Provider
      value={{
        scroll,
        setScroll,
        showFilters,
        setShowFilters,
        updateVacancies,
        setUpdateVacancies,
      }}
    >
      {children}
    </SearchNavContext.Provider>
  );
};

export default SearchNavContextWrap;
