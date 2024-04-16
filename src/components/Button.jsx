import React from "react";

const Button = ({ type, variant, className, children }) => {
  return (
    <button
      type={type}
      className={`btn ${
        variant === "secondary" ? "btn-secondary" : "btn-primary"
      } ${className && className}`}
    >
      {children}
    </button>
  );
};

export default Button;
