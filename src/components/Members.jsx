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
            <div className="members-table__cell" data-label="Name">
              {family?.hof}
            </div>
            <div className="members-table__cell" data-label="relation">
              HoF
            </div>
            <div className="members-table__cell" data-label="occupation">
              {family?.occupation || "-"}
            </div>
            <div className="members-table__cell" data-label="Dob">
              {formattedDate(family?.dob) || "-"}
            </div>
            <div className="members-table__cell" data-label="Dom">
              {formattedDate(family?.dom) || "-"}
            </div>
            <div className="members-table__cell" data-label="blood">
              {family?.blood || "-"}
            </div>
          </div>
          {orderedFamilyMembers?.map((member, index) => {
            return (
              familyMembers && (
                <div className="members-table__row" key={index}>
                  <div className="members-table__cell" data-label="Name">
                    {member.name}
                  </div>
                  <div className="members-table__cell" data-label="Relation">
                    {member.relation}
                  </div>
                  <div className="members-table__cell" data-label="Occupation">
                    {member.occupation || "-"}
                  </div>
                  <div className="members-table__cell" data-label="Dob">
                    {formattedDate(member.dob) || "-"}
                  </div>
                  <div className="members-table__cell" data-label="Dom">
                    {formattedDate(member.dom) ?? "-"}
                  </div>
                  <div className="members-table__cell" data-label="Blood">
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
