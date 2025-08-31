import React, { useEffect, useRef, useState } from "react";
import Members from "./Members";
import { photoURL } from "../App";
import Modal from "./Overlays/Modal";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import ImageViewer from "./Overlays/ImageViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import { RELATION } from "../App";
import PulseLoader from "./Overlays/PulseLoader";
import { useMediaQuery } from "react-responsive";
import coupleImage from "../assets/couple-01.svg";

const familyAnim = {
  initial: {
    opacity: 0,
    duration: 0.1,
  },
  animate: {
    opacity: 1,
    duration: 0.1,
  },
  exit: {
    opacity: 0,
    duration: 0.1,
  },
};

const Family = ({
  family,
  familyMembers, //newly added
  onDeleteFamily,
  onEditFamily,
  activeMember,
  type,
  setActiveMember,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const containerRef = useRef(null);

  useEffect(() => {
    setImageLoading(true);
  }, [family?.family_id]);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const loggedInUser = localStorage.getItem("username");

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
        ref={containerRef}
        className={`family custom-scroll ${type === "list" ? "list" : ""}`}
      >
        <div className="family__header">
          <h2 className="family__name">{family?.hof}</h2>
          <div className="family__controls">
            {loggedInUser === "admin" && (
              <>
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
              </>
            )}
            <AnimatePresence mode="wait">
              {isTabletOrMobile && activeMember !== null && (
                <motion.button
                  drag
                  initial={{ x: 100 }}
                  animate={{ x: -10 }}
                  exit={{ x: 100 }}
                  dragConstraints={containerRef}
                  className="family__btn btn-float-m"
                  onClick={() => setActiveMember(null)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        {family?.photo !== "" ? (
          <div className="family__photo">
            <img
              src={`${photoURL}/${family?.photo}`}
              alt=""
              key={family?.photo}
              onLoad={() => setImageLoading(false)}
            />
            {/* {!imageLoading ? null : <PulseLoader />} */}
            {!isTabletOrMobile && (
              <button
                className="family__photo-enlarge"
                onClick={() => setShowLargeImage(true)}
              >
                <FontAwesomeIcon icon={faExpand} />
              </button>
            )}
          </div>
        ) : (
          <div className="family__photo no-photo">
            <img src={coupleImage} />
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
          <div className="family-grid__row">
            <div className="family-grid__cell">Location</div>
            {family?.lon !== null ? (
              <a
                href={`https://www.google.com/maps?q=${family?.lon},${family?.lat}`}
                target="_blank"
              >
                Show in Google Maps
              </a>
            ) : (
              <div className="family-grid__cell">Not updated</div>
            )}
          </div>
        </div>

        <Members family={family} familyMembers={familyMembers} />
      </motion.div>
    </>
  );
};

export default Family;
