import React from "react";

const InputField = ({ label, placeholder, type, name, value, onChange }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
