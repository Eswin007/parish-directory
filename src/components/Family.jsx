import React from "react";

const Family = ({ children }) => {
  return (
    <div className="family">
      <h2 className="family__name">John Doe</h2>
      <table className="family__detail">
        <tr>
          <td>Address</td>
          <td>Address</td>
        </tr>
        <tr>
          <td>Mother Parish</td>
          <td>Mother Parish</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>Phone</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>Email</td>
        </tr>
      </table>
      {children}
    </div>
  );
};

export default Family;
