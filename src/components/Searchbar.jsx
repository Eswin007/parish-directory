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
    // const searchedMembers = members?.filter((member) =>
    //   member?.members.some((person) =>
    //     person.name.toLowerCase().includes(filterRequest.toLowerCase())
    //   )
    // );
    const searchedFamily = familyList?.filter((family) =>
      family.hof?.toLowerCase().includes(filterRequest.toLowerCase())
    );

    const searchedMembers = familyMembersList.filter((family) => {
      let fromMembers;
      if (family.name?.toLowerCase().includes(filterRequest.toLowerCase())) {
        fromMembers = family.family_id;
        console.log(fromMembers, "fromMembers");
        return fromMembers;
      }
    });

    const familyFromMembers = searchedMembers?.flatMap((id) => {
      return familyList.filter((family) => family?.family_id === id.family_id);
    });

    console.log(familyFromMembers, "familyfrommembers");

    const matchingMembers = [...searchedFamily, ...familyFromMembers];

    const matchedMembers = matchingMembers.map((item) => {
      let ar = [];
      if (item?.family_id !== item?.family_id) {
        ar.push(item);
      }
    });
    console.log(matchedMembers, "matchedMembers");

    // setSearchCount(searchedFamily.length);
    setFilteredFamily(matchedMembers);
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
