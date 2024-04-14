import React from "react";
import Searchbar from "./Searchbar";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">DIRECTORY</div>
      <Searchbar placeholder="search" />
      <div></div>
    </div>
  );
};

export default Header;
