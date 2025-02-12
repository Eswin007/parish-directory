import React, { useEffect, useState } from "react";
import Members from "./Members";
import { photoURL } from "../App";
import Modal from "./Overlays/Modal";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import ImageViewer from "./Overlays/ImageViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faSquare } from "@fortawesome/free-solid-svg-icons";
import { RELATION } from "../App";
import PulseLoader from "./Overlays/PulseLoader";

const familyAnim = {
  initial: {
    opacity: 0,
    duration: 0.2,
  },
  animate: {
    opacity: 1,
    duration: 0.2,
  },
  exit: {
    opacity: 0,
    duration: 0.2,
  },
};

const Family = ({
  family,
  familyMembers, //newly added
  onDeleteFamily,
  onEditFamily,
  type,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setImageLoading(true);
  }, [family?.family_id]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {showLargeImage && (
          <ImageViewer
            title={`${family?.hof} and Family`}
            image={`${photoURL}/${family?.photo}`}
            showLargeImage={showLargeImage}
            setShowLargeImage={setShowLargeImage}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        {showModal && (
          <Modal
            title="Confirm Delete"
            confirmModal={() => onDeleteFamily(family?.family_id)}
            cancelModal={() => setShowModal(false)}
          >
            Are you sure you want to delete{" "}
            <span className="highlight">{family?.hof}</span> and Family from the
            Parish Directory?
          </Modal>
        )}
      </AnimatePresence>
      <motion.div
        variants={familyAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`family ${type === "list" ? "list" : ""}`}
      >
        <div className="family__header">
          <h2 className="family__name">{family?.hof}</h2>
          <div className="family__controls">
            <button
              className="family__btn btn-fancy"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
            <button
              className="family__btn btn-fancy"
              onClick={() => onEditFamily(family?.family_id)}
            >
              Edit
            </button>
          </div>
        </div>
        {family?.photo !== "" && (
          <div className="family__photo">
            <img
              src={`${photoURL}/${family?.photo}`}
              alt=""
              key={family?.photo}
              onLoad={() => setImageLoading(false)}
            />
            {/* {!imageLoading ? null : <PulseLoader />} */}
            <button
              className="family__photo-enlarge"
              onClick={() => setShowLargeImage(true)}
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>
          </div>
        )}

        <div className="family-grid">
          <div className="family-grid__row">
            <div className="family-grid__cell">Address</div>
            <div className="family-grid__cell">{family?.address}</div>
          </div>
          <div className="family-grid__row">
            <div className="family-grid__cell">Mother Parish</div>
            <div className="family-grid__cell">{family?.mother_parish}</div>
          </div>
          <div className="family-grid__row">
            <div className="family-grid__cell">Phone</div>
            <div className="family-grid__cell">{`${family?.phone1 || ""}  ${
              family?.phone2 && " / " + family?.phone2
            }`}</div>
          </div>
          <div className="family-grid__row">
            <div className="family-grid__cell">Email</div>
            <div className="family-grid__cell">{family?.email}</div>
          </div>
        </div>

        <Members family={family} familyMembers={familyMembers} />
      </motion.div>
    </>
  );
};

export default Family;
