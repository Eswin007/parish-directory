import { faInfoCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FACTS } from "./Utilities";

const MemberPlaceholder = () => {
  const [facts, setFacts] = useState();

  const randomFact = (arr) => {
    // setFacts(null)
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
      <div className="member-placeholder__facts">{facts || ""}</div>
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
