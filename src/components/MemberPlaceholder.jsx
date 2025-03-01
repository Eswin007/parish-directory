import {
  faCakeCandles,
  faInfoCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FACTS } from "./Utilities";

const MemberPlaceholder = ({ bdayMembers, familyList }) => {
  const [facts, setFacts] = useState();

  const randomFact = (arr) => {
    const random = arr[Math.floor(Math.random() * arr.length)];
    setFacts(random);
  };

  useEffect(() => {
    randomFact(FACTS);
  }, []);

  return (
    <motion.div
      className="member-placeholder"
      initial={{ opacity: 0, duration: 0.2 }}
      animate={{ opacity: 1, duration: 0.2 }}
      exit={{ opacity: 0, duration: 0.2 }}
    >
      <div className="bdays">
        <div className="bdays__title">
          <FontAwesomeIcon icon={faCakeCandles} />
          Upcoming Birthdays
        </div>
        {bdayMembers?.map((member) => {
          const selectedFam = familyList.filter(
            (family) => family.family_id === member.family_id
          );

          return (
            <div className="bdays__person">
              <div className="bdays__person-date">
                {new Date(member.dob).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="bdays__person-name">
                {member.name || member.hof}
              </div>
              <div className="bdays__person-detail">
                {member.membersID &&
                  `${member.relation} of ${selectedFam[0].hof}`}
              </div>
            </div>
          );
        })}
      </div>
      <div className="member-placeholder__content">
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="member-placeholder__icon"
        />
        <span>Select a member to view the details</span>
      </div>
    </motion.div>
  );
};

export default MemberPlaceholder;
