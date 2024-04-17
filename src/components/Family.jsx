import React from "react";
import Members from "./Members";

const Family = ({ children, hof, address, email, parish, phone, members }) => {
  return (
    <div className="family">
      <h2 className="family__name">{hof}</h2>
      <button className="family__edit">Edit</button>
      <table className="family__detail">
        <tbody>
          <tr>
            <td>Address</td>
            <td>{address}</td>
          </tr>
          <tr>
            <td>Mother Parish</td>
            <td>{parish}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>
              <span>{/* {phone} / {phone} */}</span>
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{email}</td>
          </tr>
        </tbody>
      </table>
      <Members members={members} />
    </div>
  );
};

export default Family;
