import React from "react";
import Searchbar from "./Searchbar";
import Button from "./Button";
import { FAMILY_INITIAL } from "./Utilities";
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
  toggleMode,
}) => {
  const addNewMember = () => {
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
        />
      )}
      <button onClick={() => toggleMode()}>Dark Mode</button>
      {!showForm && <Button onClick={addNewMember}>Add Family</Button>}
    </div>
  );
};

export default Header;
