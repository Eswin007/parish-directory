import React from "react";

const Input = ({ label, placeholder, type, name }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input placeholder={placeholder} type={type} name={name} />
    </div>
  );
};

export default Input;
