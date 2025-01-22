import React from "react";
import Members from "./Members";
import { photoURL } from "../App";

const Family = ({
  family,
  familyMembers, //newly added
  onDeleteFamily,
  onEditFamily,
}) => {
  return (
    <div className="family">
      <h2 className="family__name">{family?.hof}</h2>
      {family?.photo && (
        <div className="family__photo">
          <img
            src={`${photoURL}/${family?.photo}`}
            style={{ width: "100%" }}
            alt=""
          />
        </div>
      )}
      <div className="family__controls">
        <button
          className="family__btn btn-fancy"
          onClick={() => onDeleteFamily(family?.family_id)}
        >
          Delete
        </button>
        <button
          className="family__btn btn-fancy"
          onClick={() => onEditFamily(family?.family_id)}
        >
          Edit
        </button>
      </div>
      <table className="family__detail">
        <tbody>
          <tr>
            <td>Address</td>
            <td>{family?.address}</td>
          </tr>
          <tr>
            <td>Mother Parish</td>
            <td>{family?.mother_parish || "-"}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>
              <span>{`${family?.phone1} / ${family?.phone2}`}</span>
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{family?.email}</td>
          </tr>
        </tbody>
      </table>
      <Members family={family} familyMembers={familyMembers} />
    </div>
  );
};

export default Family;
