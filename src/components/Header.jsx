import React from "react";
import Searchbar from "./Searchbar";
import Button from "./Button";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">DIRECTORY</div>
      <Searchbar placeholder="search" />
      <Button>Add Family</Button>
    </div>
  );
};

export default Header;
