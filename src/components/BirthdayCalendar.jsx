import {
  faCake,
  faCakeCandles,
  faInfoCircle,
  faTimes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FACTS } from "./Utilities";
import { useMediaQuery } from "react-responsive";

const BirthdayCalendar = ({ bdayMembers, familyList, setShowBday }) => {
  const [facts, setFacts] = useState();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const sortedBdayMembers = bdayMembers?.sort((a,b)=> new Date(`1000-${a.dob.slice(5)}`) - new Date(`1000-${b.dob.slice(5)}`));
  const randomFact = (arr) => {
    const random = arr[Math.floor(Math.random() * arr.length)];
    setFacts(random);
  };

  useEffect(() => {
    randomFact(FACTS);
  }, []);

  return (
    <motion.div
      className="member-placeholder custom-scroll"
      initial={{ opacity: 0, duration: 0.2 }}
      animate={{ opacity: 1, duration: 0.2 }}
      exit={{ opacity: 0, duration: 0.2 }}
    >
      <div className="bdays">
        <div className="bdays__title">
          <FontAwesomeIcon icon={faCakeCandles} />
          Upcoming Birthdays
        </div>
        <div className="bdays__person-set custom-scroll">
          {sortedBdayMembers?.map((member) => {
            const selectedFam = familyList.filter(
              (family) => family.family_id === member?.family_id
            );
            return (
              <div className="bdays__person">
                <div className="bdays__person-date">
                  {new Date(member?.dob).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="bdays__person-name">
                  {member?.name || member?.hof}
                  {new Date(member?.dob).getDate() === new Date().getDate() &&
                    new Date(member?.dob).getMonth() ===
                      new Date().getMonth() && (
                      <div className="bdays__today">
                        <FontAwesomeIcon icon={faCake} />
                      </div>
                    )}
                </div>
                <div className="bdays__person-detail">
                  {member.membersID &&
                    `${member?.relation} of ${selectedFam[0]?.hof}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isTabletOrMobile && (
        <button className="bdays__close-btn" onClick={() => setShowBday(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </motion.div>
  );
};

export default BirthdayCalendar;
