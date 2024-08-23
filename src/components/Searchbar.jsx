import React, { useState } from "react";

const Searchbar = ({
  placeholder,
  className,
  members,
  setMembers,
  fetchMembers,
}) => {
  const [searchValue, setSearchValue] = useState();
  const [searchCount, setSearchCount] = useState(0);

  const searchClearHandler = () => {
    setSearchValue("");
    fetchMembers();
  };

  const memberFilterHandler = (filterRequest) => {
    const membersToFilter = [...members];
    console.log(membersToFilter);
    const filteredMembers = membersToFilter.filter((person) =>
      person.hof.toLowerCase().includes(filterRequest.toLowerCase())
    );
    setMembers(filteredMembers);
    setSearchCount(filteredMembers.length);
    console.log(searchCount);
    fetchMembers();
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
