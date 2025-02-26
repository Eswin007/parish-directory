import React, { useState } from "react";
import Searchbar from "./Searchbar";
import Button from "./Inputs/Button";
import { FAMILY_INITIAL } from "./Utilities";
import ToggleSwitch from "./Inputs/ToggleSwitch";
const Header = ({
  setShowForm,
  formRevealHandler,
  showForm,
  setFormData,
  fetchMembers,
  setFilteredFamily,
  familyList,
  familyMembersList,
  setActiveMember,
  storage,
  toggleMode,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const addNewMember = () => {
    setSearchValue("");
    setFilteredFamily(familyList);
    setSearchCount(null);
    setActiveMember(null);
    formRevealHandler(true);
    setFormData(FAMILY_INITIAL);
  };

  return (
    <div className="header">
      <div className="logo">Parish Directory 2025</div>
      {!showForm && (
        <Searchbar
          placeholder="Search..."
          className="header__searchbar"
          setFormData={setFormData}
          fetchMembers={fetchMembers}
          setFilteredFamily={setFilteredFamily}
          familyList={familyList}
          familyMembersList={familyMembersList}
          setActiveMember={setActiveMember}
          setSearchValue={setSearchValue}
          setSearchCount={setSearchCount}
          searchValue={searchValue}
          searchCount={searchCount}
        />
      )}
      {/* <button onClick={() => toggleMode()}>Dark Mode</button> */}
      <ToggleSwitch
        label="Dark Mode"
        name="darkMode"
        onChange={toggleMode}
        style={{ marginLeft: "auto" }}
        checked={storage === "dark"}
      />
      {!showForm && <Button onClick={addNewMember}>Add Family</Button>}
    </div>
  );
};

export default Header;
