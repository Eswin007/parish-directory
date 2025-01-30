import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const toastAnim = {
  initial: {
    y: "10rem",
    x: "-50%",

    duration: 0.2,
  },

  animate: {
    y: 0,
    x: "-50%",
    duration: 0.2,
  },

  exit: {
    y: "10rem",
    x: "-50%",

    duration: 0.2,
  },
};

const Toast = ({
  children,
  error,
  onClick,
  setShowToast,
  autoClose = 3000,
}) => {
  setTimeout(() => {
    setShowToast(false);
  }, autoClose);

  return createPortal(
    <motion.div
      variants={toastAnim}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`toast ${error ? "error" : "success"}`}
    >
      <div className="toast__icon">
        <FontAwesomeIcon icon={faCircleCheck} />
      </div>
      <div className="toast__body">{children}</div>
      <button onClick={() => setShowToast(false)} className="toast__close">
        <FontAwesomeIcon icon={faClose} />
      </button>
    </motion.div>,
    document.getElementById("overlay")
  );
};

export default Toast;
