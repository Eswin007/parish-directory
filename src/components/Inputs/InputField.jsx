import React from "react";

const InputField = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  errors,
  autoFocus
}) => {
  return (
    <div className={`input-group ${errors ? "invalid" : ""}`}>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
      />
      {errors && <div className="input-error">{errors}</div>}
    </div>
  );
};

export default InputField;
