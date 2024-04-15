import React from "react";

const Members = ({ members }) => {
  return (
    <table className="members">
      <tr>
        <th>Name</th>
        <th>Rel.</th>
        <th>Occupation</th>
        <th>DOB</th>
        <th>DOM</th>
        <th>Blood</th>
      </tr>
      {members.map((member) => {
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
    </table>
  );
};

export default Members;
