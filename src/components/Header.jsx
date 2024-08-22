import React from "react";
import Searchbar from "./Searchbar";
import Button from "./Button";
import { FAMILY_INITIAL } from "../App";
const Header = ({
  setShowForm,
  showForm,
  setFormData,
  members,
  setMembers,
  fetchMembers,
}) => {
  const addNewMember = () => {
    setShowForm(true);
    setFormData(FAMILY_INITIAL);
  };

  return (
    <div className="header">
      <div className="logo">DIRECTORY</div>
      {!showForm && (
        <Searchbar
          placeholder="search"
          setFormData={setFormData}
          members={members}
          setMembers={setMembers}
          fetchMembers={fetchMembers}
        />
      )}
      {!showForm && <Button onClick={addNewMember}>Add Family</Button>}
    </div>
  );
};

export default Header;
