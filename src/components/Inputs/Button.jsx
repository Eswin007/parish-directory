import React from "react";

const Button = ({ type, variant, className, children, onClick, style }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      style={style}
      className={`btn ${
        variant === "secondary" ? "btn-secondary" : "btn-primary"
      } ${className ?? className}`}
    >
      {children}
    </button>
  );
};

export default Button;
