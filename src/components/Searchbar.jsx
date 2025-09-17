import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

const Searchbar = ({
  placeholder,
  className,
  fetchMembers,
  setFilteredFamily,
  familyList,
  familyMembersList,
  setActiveMember,
  searchValue,
  setSearchValue,
  searchCount,
  setSearchCount,
}) => {
  // const [searchValue, setSearchValue] = useState("");
  // const [searchCount, setSearchCount] = useState(0);

  const searchClearHandler = () => {
    setSearchValue("");
    setFilteredFamily(familyList);
    setSearchCount(null);
  };

  const memberFilterHandler = (filterRequest) => {
    const searchedFamily = familyList?.filter((family) =>
      family.hof?.toLowerCase().includes(filterRequest.toLowerCase())
    );
    const searchedMembers = familyMembersList.filter((members) =>
      members.name.toLowerCase().includes(filterRequest.toLowerCase())
    );

    const familyFromMembers = familyList.filter((family) => {
      return searchedMembers.some(
        (member) => member.family_id === family.family_id
      );
    });


    const searchedPrayerGroups = familyList.filter((family)=>
      family?.prayer_group?.toLowerCase().includes(filterRequest.toLowerCase())
    )


    const consolidatedFamily = [...searchedFamily, ...familyFromMembers, ...searchedPrayerGroups];

    const searchResults = consolidatedFamily.filter((member, index, self) => {
      return (
        index === self.findIndex((item) => item.family_id === member.family_id)
      );
    });

    setFilteredFamily(searchResults);
    setSearchCount(searchResults.length);
  };

  const searchValueHandler = (e) => {
    setSearchValue(e.target.value);
    setActiveMember(null);

    if (e.target.value === "") {
      setSearchCount(null);
      setFilteredFamily(familyList);
    }
  };

  useEffect(()=>{
    if(searchValue.length >= 3){
      memberFilterHandler(searchValue)
    }
  }, [searchValue])
  

  return (
    <div className={`searchbar ${className}`}>
      <input
        type="text"
        value={searchValue || ""}
        placeholder={`Search from ${familyList.length || 'all'} families`}
        enterKeyHint="Search"
        onChange={searchValueHandler}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            memberFilterHandler(searchValue);
          }
          if (e.key === "Escape") {
            searchClearHandler();
          }
        }}
      />
      {searchValue !== "" && searchCount > 0 && (
        <div className="filter-count">
          <span>{searchCount}</span>{" "}
          <span>{searchCount > 1 ? "families" : "family"}</span>
        </div>
      )}

      {searchValue && (
        <div className="searchbar__clear" onClick={searchClearHandler}>
          <FontAwesomeIcon icon={faClose} />
        </div>
      )}
      <button
        disabled={searchValue === ""}
        onClick={() => memberFilterHandler(searchValue)}
      >
        <FontAwesomeIcon
          icon={faSearch}
          className="searchbar__search-icon"
        ></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default Searchbar;
