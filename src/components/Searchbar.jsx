import React, { useState } from "react";

const Searchbar = ({
  placeholder,
  className,
  fetchMembers,
  setFilteredFamily,
  familyList,
  familyMembersList,
}) => {
  const [searchValue, setSearchValue] = useState();
  const [searchCount, setSearchCount] = useState(0);

  const searchClearHandler = () => {
    setSearchValue("");
    setFilteredFamily(familyList);
    setSearchCount(null);
  };

  const memberFilterHandler = (filterRequest) => {

    const searchedFamily = familyList?.filter((family) =>
      family.hof?.toLowerCase().includes(filterRequest.toLowerCase())
    );

    const searchedMembers = familyMembersList.filter((members)=>
       members.name.toLowerCase().includes(filterRequest.toLowerCase())
    );

    const familyFromMembers = familyList.filter((family)=>{
      return searchedMembers.some(member=> member.family_id === family.family_id)
    });

    const consolidatedFamily = [...searchedFamily, ...familyFromMembers];

    const searchResults = consolidatedFamily.filter((member, index, self)=>{
      return index === self.findIndex(item=> item.family_id === member.family_id)
    });

    setFilteredFamily(searchResults);
    setSearchCount(searchResults.length)
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
