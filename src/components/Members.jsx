import React from "react";
import { RELATION } from "./Utilities";

const Members = ({ familyMembers, family }) => {
  const formattedDate = (date) => {
    if (date) {
      return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
    } else return;
  };

  const orderedFamilyMembers = familyMembers.sort(
    (a, b) => RELATION.indexOf(a) - RELATION.indexOf(b)
  );

  return (
    <>
      <div className="members-table">
        <div className="members-table__row header">
          <div className="members-table__cell">Name</div>
          <div className="members-table__cell">Rel.</div>
          <div className="members-table__cell">Occupation</div>
          <div className="members-table__cell">DOB</div>
          <div className="members-table__cell">DOM</div>
          <div className="members-table__cell">Blood</div>
        </div>
        <div className="members-table__body">
          <div className="members-table__row">
            <div className="members-table__cell">{family?.hof}</div>
            <div className="members-table__cell">HoF</div>
            <div className="members-table__cell">
              {family?.occupation || "-"}
            </div>
            <div className="members-table__cell">
              {formattedDate(family?.dob) || "-"}
            </div>
            <div className="members-table__cell">
              {formattedDate(family?.dom) || "-"}
            </div>
            <div className="members-table__cell">{family?.blood || "-"}</div>
          </div>
          {orderedFamilyMembers?.map((member, index) => {
            return (
              familyMembers && (
                <div className="members-table__row" key={index}>
                  <div className="members-table__cell">{member.name}</div>
                  <div className="members-table__cell">{member.relation}</div>
                  <div className="members-table__cell">
                    {member.occupation || "-"}
                  </div>
                  <div className="members-table__cell">
                    {formattedDate(member.dob) || "-"}
                  </div>
                  <div className="members-table__cell">
                    {formattedDate(member.dom) ?? "-"}
                  </div>
                  <div className="members-table__cell">
                    {member.blood || "-"}
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Members;
