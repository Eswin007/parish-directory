import React, { useState } from "react";
import Searchbar from "./Searchbar";
import Button from "./Inputs/Button";
import { FAMILY_INITIAL } from "./Utilities";
import ToggleSwitch from "./Inputs/ToggleSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { faCake, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
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
  setShowBday,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchCount, setSearchCount] = useState(0);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

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
      {!showForm && (
        <Button onClick={addNewMember}>
          {isTabletOrMobile ? (
            <FontAwesomeIcon icon={faUserPlus} />
          ) : (
            "Add Family"
          )}
        </Button>
      )}
      {!showForm && isTabletOrMobile && (
        <Button onClick={() => setShowBday(true)}>
          <FontAwesomeIcon icon={faCake} />
        </Button>
      )}
    </div>
  );
};

export default Header;
