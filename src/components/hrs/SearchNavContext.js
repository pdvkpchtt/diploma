"use client";

import { useState, createContext, usefect } from "react";

export const SearchNavContext = createContext();

const SearchNavContextWrap = ({ children }) => {
  const [scroll, setScroll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [updatePeople, setUpdatePeople] = useState({
    startFiltering: false,
    input: "",
    peoplecity: { label: "" },
    educationLevel: { label: "" },
    workExperience: { label: "" },
    UserSkills: [],
  });

  return (
    <SearchNavContext.Provider
      value={{
        scroll,
        setScroll,
        showFilters,
        setShowFilters,
        updatePeople,
        setUpdatePeople,
      }}
    >
      {children}
    </SearchNavContext.Provider>
  );
};

export default SearchNavContextWrap;
