import React from "react";

const InputField = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  errors,
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
      />
      {errors && <div className="input-error">{errors}</div>}
    </div>
  );
};

export default InputField;
