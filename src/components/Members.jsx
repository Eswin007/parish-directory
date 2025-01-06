import React from "react";

const Members = ({
  memberList,
  members,
  dob,
  id,
  dom,
  occupation,
  name,
  blood,
}) => {
  const relatives = memberList.filter((relative) => relative?.family_id === id);
  // const relatives = memberList.map((relative) => relative.family_id);
  console.log(id, "family id");
  // console.log(relatives, "relatives");
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
        {relatives?.map((member) => {
          // const theMembers = memberList.filter(
          //   (member) => member.faimly_id === id
          // );

          // console.log(relatives, "relatives");
          return (
            relatives && (
              <tr key={member.id}>
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
