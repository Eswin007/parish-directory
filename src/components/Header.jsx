import React, { useState } from "react";
import Searchbar from "./Searchbar";
import Button from "./Inputs/Button";
import { FAMILY_INITIAL } from "./Utilities";
import ToggleSwitch from "./Inputs/ToggleSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { faCake, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const addNewMember = () => {
    setSearchValue("");
    setFilteredFamily(familyList);
    setSearchCount(null);
    setActiveMember(null);
    formRevealHandler(true);
    setFormData(FAMILY_INITIAL);
  };

  const handleLogout = () =>{
    localStorage.removeItem('username');
    navigate('/login')
  }

  const loggedInUser = localStorage.getItem('username')

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
      {!showForm && loggedInUser === 'admin' && (
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
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
