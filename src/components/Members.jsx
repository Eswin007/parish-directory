import React from "react";

const Members = ({ familyMembers, family }) => {
  // const relatives = membersList?.filter(
  //   (relative) => relative?.family_id === id
  // );
  // console.log(id, "family id");
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
          <td>{family?.hof}</td>
          <td>HoF</td>
          <td>{family?.occupation}</td>
          <td>{family?.dob}</td>
          <td>{family?.dom}</td>
          <td>{family?.blood}</td>
        </tr>
        {familyMembers?.map((member, index) => {
          return (
            familyMembers && (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.relation}</td>
                <td>{member.occupation}</td>
                <td>{member.dob}</td>
                <td>{member.dom ?? "-"}</td>
                <td>{member.blood}</td>
              </tr>
            )
          );
        })}
      </tbody>
    </table>
  );
};

export default Members;
