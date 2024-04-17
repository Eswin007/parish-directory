import React from "react";

const Members = ({ members }) => {
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
