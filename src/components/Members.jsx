import React from "react";

const Members = ({ members, dob, dom, occupation, name, blood }) => {
  return (
    <table className="members">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rel.</th>
          <th>Occupation</th>
          <th>DOB</th>
          <th>DOM</th>
          <th>Blood</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{name}</td>
          <td>HoF</td>
          <td>{occupation}</td>
          <td>{dob}</td>
          <td>{dom}</td>
          <td>{blood}</td>
        </tr>
        {members?.map((member) => {
          return (
            <tr>
              <td>{member.name}</td>
              <td>{member.relation}</td>
              <td>{member.occupation}</td>
              <td>{member.dob}</td>
              <td>{member.dom ?? "-"}</td>
              <td>{member.blood}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Members;
