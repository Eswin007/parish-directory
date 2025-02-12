import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import OverlayBackdrop from "./OverlayBackdrop";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const imageViewerAnim = {
  initial: {
    scale: 0.75,
    x: "-75%",
    y: "-50%",
    opacity: 0,
    duration: 0.2,
  },
  animate: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    opacity: 1,
    duration: 0.2,
  },

  exit: {
    scale: 0.75,
    x: "-75%",
    y: "-50%",
    opacity: 0,
    duration: 0.2,
  },
};

const ImageViewer = ({ title, image, showLargeImage, setShowLargeImage }) => {
  window.addEventListener("keydown", (e) => {
    if (showLargeImage) {
      if (e.key === "Escape") {
        setShowLargeImage(false);
      }
    }
  });

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0, transition: { duration: 0.1 } }}
        animate={{ opacity: 1, transition: { duration: 0.1 } }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <OverlayBackdrop />
      </motion.div>
      <motion.div
        className="image-viewer"
        variants={imageViewerAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="image-viewer__gradient"></div>
        <div className="image-viewer__image">
          <button
            className="image-viewer__close"
            onClick={() => setShowLargeImage(false)}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
          <img src={image} alt="" />
          <div className="image-viewer__title">{title}</div>
        </div>
      </motion.div>
    </>,
    document.getElementById("overlay")
  );
};

export default ImageViewer;
