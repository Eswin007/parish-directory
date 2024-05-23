import React from "react";
import Searchbar from "./Searchbar";
import Button from "./Button";

const Header = ({ setShowForm, showForm }) => {
  return (
    <div className="header">
      <div className="logo">DIRECTORY</div>
      <Searchbar placeholder="search" />
      {!showForm && (
        <Button onClick={() => setShowForm(true)}>Add Family</Button>
      )}
    </div>
  );
};

export default Header;
