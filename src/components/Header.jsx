import React from "react";
import Searchbar from "./Searchbar";
import Button from "./Button";

const Header = ({ setAddMembers }) => {
  return (
    <div className="header">
      <div className="logo">DIRECTORY</div>
      <Searchbar placeholder="search" />
      <Button onClick={() => setAddMembers(true)}>Add Family</Button>
    </div>
  );
};

export default Header;
