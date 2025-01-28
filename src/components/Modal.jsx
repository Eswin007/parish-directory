import React from "react";
import OverlayBackdrop from "./OverlayBackdrop";
import { createPortal } from "react-dom";
import Button from "./Button";
import { motion } from "framer-motion";

const modalScale = {
  hidden: {
    scale: 0.6,
    translateX: "-50%",
    translateY: "-50%",
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    translateX: "-50%",
    translateY: "-50%",
    scale: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    translateX: "-50%",
    translateY: "-50%",
    scale: 0.6,
    transition: {
      duration: 0.1,
    },
  },
};
const Modal = ({ title, children, confirmModal, cancelModal }) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0, transition: { duration: 0.1 } }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <OverlayBackdrop />
      <motion.div
        key={title}
        className="modal"
        variants={modalScale}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="modal__head">
          <h3 className="modal__title">{title}</h3>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__footer">
          <Button variant="secondary" onClick={cancelModal}>
            Cancel
          </Button>
          <Button onClick={confirmModal}>Delete</Button>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById("overlay")
  );
};

export default Modal;
