import React from "react";
import SearchContext from "./SearchContext";

const SearchContextProvider = ({ search, results, children }) => {
  return (
    <SearchContext.Provider
      value={{
        search,
        results
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
