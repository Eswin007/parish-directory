import React from "react";
import Searchbar from "./Searchbar";
import Button from "./Button";
import { FAMILY_INITIAL } from "../App";
const Header = ({
  setShowForm,
  formRevealHandler,
  showForm,
  setFormData,
  fetchMembers,
  setFilteredMembers,
}) => {
  const addNewMember = () => {
    formRevealHandler(true);
    setFormData(FAMILY_INITIAL);
  };

  return (
    <div className="header">
      <div className="logo">DIRECTORY</div>
      {!showForm && (
        <Searchbar
          placeholder="search"
          setFormData={setFormData}
          fetchMembers={fetchMembers}
          setFilteredMembers={setFilteredMembers}
        />
      )}
      {!showForm && <Button onClick={addNewMember}>Add Family</Button>}
    </div>
  );
};

export default Header;
