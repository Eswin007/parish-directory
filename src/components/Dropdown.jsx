import React, { useState } from "react";

const Dropdown = ({ options, placeholder, label, value, onChange, errors }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const openMenuHandler = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleValue = (item) => {
    setSelectedValue(item);
    onChange(item);
  };

  return (
    <div className={`dropdown ${errors ? "invalid" : ""}`}>
      <label htmlFor="">{label}</label>
      <div className=" dd" onClick={openMenuHandler}>
        <div className="dd__field">
          {selectedValue ? (
            <div className="dd__selected-value">{selectedValue}</div>
          ) : (
            <div className="dd__placeholder">{placeholder}</div>
          )}
        </div>
        {menuOpen && (
          <div className="dd__options">
            {options?.length > 0 ? (
              <ul className="dd__menu">
                {options.map((item) => (
                  <li
                    key={item}
                    className="dd__menu-item"
                    onClick={(e) => handleValue(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="dd__no-data">No data to show</div>
            )}
          </div>
        )}
        <div className="dd__arrow">&#9660;</div>
      </div>
      {errors && <div className="input-error">{errors}</div>}
    </div>
  );
};

export default Dropdown;
