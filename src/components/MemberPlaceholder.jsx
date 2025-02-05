import { faInfoCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FACTS } from "./Utilities";

const MemberPlaceholder = () => {
  const [facts, setFacts] = useState();

  return (
    <motion.div
      className="member-placeholder"
      initial={{ opacity: 0, duration: 0.2 }}
      animate={{ opacity: 1, duration: 0.2 }}
      exit={{ opacity: 0, duration: 0.2 }}
    >
      <FontAwesomeIcon
        icon={faInfoCircle}
        className="member-placeholder__icon"
      />
      <div>{facts}</div>
      <span>Select a member to view the details</span>
    </motion.div>
  );
};

export default MemberPlaceholder;
