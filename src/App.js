import React, { useState } from "react";
import { useDebounce } from "react-use";
import memoize from "lodash.memoize";
import "./styles.css";
import { getData } from "./data";
import Tree from "./Tree";
import { TreeContextProvider } from "./TreeContext";
import { SearchContextProvider } from "./SearchContext";
import TreeInfo from "./TreeInfo";
const data = getData({ total: 3000, spread: 5 });

const findItems = memoize((searchTerm, data) => {
  const searchTermLower = searchTerm.toLowerCase().trim();
  if (!searchTermLower) return [];
  return data.filter(({ name }) => {
    return name.toLowerCase().includes(searchTermLower);
  });
});

const App = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = value => {
    const results = findItems(value, data);
    setSearch(value);
    setSearchResults(results);
  };

  useDebounce(
    () => {
      handleSearch(search);
    },
    800,
    [search]
  );

  return (
    <div className="App">
      <SearchContextProvider search={search} results={searchResults}>
        <TreeContextProvider
          data={data}
          itemID="id"
          parentSelector={({ parent }) => parent}
          childrenSelector={(id, data) =>
            data.filter(({ parent }) => parent === id)
          }
        >
          <span>{`there are ${data.length} items`}</span>
          <div>{searchResults.length} results</div>
          <TreeInfo />
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <label>
              <input
                type="search"
                placeholder="Search"
                value={search}
                onChange={({ target: { value } }) => setSearch(value)}
              />
            </label>
          </form>
          <Tree />
        </TreeContextProvider>
      </SearchContextProvider>
    </div>
  );
};

export default App;
