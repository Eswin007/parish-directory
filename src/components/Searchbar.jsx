import React, { useState } from "react";

const Searchbar = ({
  placeholder,
  className,
  fetchMembers,
  setFilteredMembers,
}) => {
  const [searchValue, setSearchValue] = useState();
  const [searchCount, setSearchCount] = useState(0);

  const searchClearHandler = () => {
    // setSearchValue("");
    // setFilteredMembers(members);
    // setSearchCount(null);
  };

  const memberFilterHandler = (filterRequest) => {
    // const searchedMembers = members?.filter((member) =>
    //   member?.members.some((person) =>
    //     person.name.toLowerCase().includes(filterRequest.toLowerCase())
    //   )
    // );
    // setSearchCount(searchedMembers.length);
    // setFilteredMembers(searchedMembers);
  };

  const searchValueHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={`searchbar ${className}`}>
      <input
        type="text"
        value={searchValue || ""}
        placeholder={placeholder}
        onChange={searchValueHandler}
      />
      {searchCount > 0 && (
        <div className="filter-count">
          <span>{searchCount}</span>{" "}
          <span>{searchCount > 1 ? "families" : "family"}</span>
        </div>
      )}

      {searchValue && (
        <div className="searchbar__clear" onClick={searchClearHandler}>
          Clear
        </div>
      )}
      <button onClick={() => memberFilterHandler(searchValue)}>Search</button>
    </div>
  );
};

export default Searchbar;
