import React, { useEffect, useState } from "react";

const ToggleSwitch = ({
  label,
  fieldName,
  checked,
  disabled,
  style,
  onChange,
}) => {
  //   const [isChecked, setIsChecked] = useState(checked);

  //   //   useEffect(() => {
  //   //     setIsChecked(checked);
  //   //   }, [checked]);

  return (
    <label className="switch-wrap" style={{ ...style }}>
      <span className="switch__label">{label}</span>
      <div className="switch">
        <input
          className="switch__input"
          type="checkbox"
          name={fieldName}
          id={fieldName}
          checked={checked}
          onChange={onChange}
          hidden
        />
        <span className="switch__control"></span>
      </div>
    </label>
  );
};

export default ToggleSwitch;
