import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Select from 'react-select'

const Dropdown = ({ options, placeholder, label, value, onChange, errors }) => {
  return (
    <div 
    className={`dropdown ${errors ? "invalid" : ""}`} 
    >

      <label htmlFor="">{label}</label>
      <Select 
        classNamePrefix='dd' 
        options={options}
        value={options.find(opt => opt.value === value)} 
        menuPlacement="auto" 
        onChange={onChange} 
      />
      {errors && <div className="input-error">{errors}</div>}
    </div>
  );
};

export default Dropdown;
