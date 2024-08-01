import React from "react";

const Searchbar = ({ placeholder, className }) => {
  return (
    <div className={`searchbar ${className}`}>
      <input type="text" placeholder={placeholder} />
      <button>Search</button>
    </div>
  );
};

export default Searchbar;
