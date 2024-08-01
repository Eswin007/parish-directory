import React from "react";
import Members from "./Members";

const Family = ({
  hof,
  address,
  email,
  parish,
  phone1,
  phone2,
  members,
  id,
  onDeleteFamily,
  onEditFamily,
}) => {
  console.log(phone1, "phone");
  return (
    <div className="family">
      <h2 className="family__name">{hof}</h2>
      <div className="family__controls">
        <button className="family__btn" onClick={() => onDeleteFamily(id)}>
          Delete
        </button>
        <button className="family__btn" onClick={() => onEditFamily(id)}>
          Edit
        </button>
      </div>
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
              <span>{`${phone1} / ${phone2}`}</span>
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
