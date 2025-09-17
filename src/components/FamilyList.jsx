import React, { useState, useMemo, useEffect } from "react";
import { photoURL } from "../App";
import ImageViewer from "./Overlays/ImageViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faExpand, faHandsPraying, faMobilePhone, faPersonPraying, faPhone, faPhoneAlt, faPray, faPrayingHands, faSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Overlays/Modal";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import coupleImage from "../assets/couple-01.svg";
import catImage1 from "../assets/cat1.png";
import catImage2 from "../assets/cat2.png";
import catImage3 from "../assets/cat3.png";
import icoPrayerGroup from '../assets/prayer-group-ico.svg'
import { PRAYER_GROUP } from "./Utilities";

const FamilyList = ({
  filteredFamily,
  activeMemberHandler,
  activeMember,
  onEditFamily,
  onDeleteFamily,
  showForm,
}) => {
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [viewingFamily, setViewingFamily] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedCatImage, setSelectedCatImage] = useState();
  const openImageHandler = (id) => {
    const familyForImage = filteredFamily?.filter(
      (item) => item?.family_id === id
    );
    setViewingFamily(...familyForImage);
    setShowLargeImage(true);
  };

  const catImages = [catImage1, catImage2, catImage3];

  useEffect(() => {
    setSelectedCatImage(
      catImages[Math.floor(Math.random() * catImages.length)]
    );
  }, [filteredFamily]);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });



  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {showLargeImage && (
          <ImageViewer
            title={`${viewingFamily?.hof} and Family`}
            image={`${photoURL}/${viewingFamily?.photo}`}
            showLargeImage={showLargeImage}
            setShowLargeImage={setShowLargeImage}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        {showModal && (
          <Modal
            title="Confirm Delete"
            confirmModal={() => onDeleteFamily(activeMember?.family_id)}
            cancelModal={() => setShowModal(false)}
          >
            Are you sure you want to delete{" "}
            <span className="highlight">{activeMember?.hof}</span> and Family
            from the Parish Directory?
          </Modal>
        )}
      </AnimatePresence>
      <div className="family-list__table ">
        <div className="family-list__table-row header">
          <div className="family-list__table-cell">&nbsp;</div>
          <div className="family-list__table-cell">Name & Address</div>
          <div className="family-list__table-cell">Prayer Group</div>
          <div className="family-list__table-cell">Phone & Email</div>
        </div>
        {filteredFamily?.length > 0 ? (
          <div className="family-list__table-body custom-scroll">
            {filteredFamily?.length > 0 &&
              filteredFamily?.map((family) => {

                // finding the prayer group color
                const groupColor = PRAYER_GROUP.find(item =>item?.value === family?.prayer_group)

                let firstInLine;
                if (family?.hof.toLowerCase().includes("rev")) {
                  firstInLine = true;
                }
                let clickDisabled;
                if (showForm && activeMember) {
                  clickDisabled = true;
                }

                return (
                  <div
                    className={`family-list__table-row ${
                      activeMember?.family_id === family.family_id
                        ? "active"
                        : ""
                    } ${firstInLine ? "first" : ""} ${
                      clickDisabled ? "disabled" : ""
                    }`}
                    key={family?.family_id}
                    onClick={() => activeMemberHandler(family)}
                  >
                    <div className="family-list__table-cell">
                      <div className="family-list__photo">
                        {family?.photo !== "" ? (
                          <div className="family-list__photo">
                            <img
                              src={`${photoURL}/${family?.photo}`}
                              alt=""
                              onClick={(e) => {
                                if (!isTabletOrMobile) {
                                  openImageHandler(family?.family_id);
                                } else return;
                              }}
                            />
                          </div>
                        ) : (
                          <div className="family-list__photo no-photo">
                            <img src={coupleImage} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="family-list__table-cell">
                      <div className="family-list__detail">
                        <div className="family-list__name">{family?.hof}</div>
                        <div className="family-list__address">
                          {family?.address}
                        </div>
                      </div>
                    </div>
                    <div className="family-list__table-cell">
                      <div className={`family-list__prayer-group ${groupColor?.color}`}>
                        {isTabletOrMobile && family?.prayer_group && <img src={icoPrayerGroup}/>}
                        {family?.prayer_group}
                      </div>
                    </div>
                    <div className="family-list__table-cell">
                      <div className="family-list__phone">
                        <div className="family-list__phone--1">
                          {isTabletOrMobile &&  family?.phone1 &&
                          <FontAwesomeIcon icon={faPhone} fontSize=".875rem" className="ico-phone"/>
                          }
                          {family?.phone1}</div>
                        {family?.phone2 && 
                        <div className="family-list__phone--2">
                            {isTabletOrMobile && 
                          <FontAwesomeIcon icon={faPhone} font-size=".875rem" className="ico-phone"/>
                          }
                          {family?.phone2}
                          </div>
                        }
                        {/* {`${family?.phone1} ${
                          family?.phone2 && "/ " + family?.phone2
                        }`} */}
                      </div>
                      <div className="family-list__email">{family?.email}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, duration: 1 }}
            animate={{ opacity: 1, duration: 1 }}
            className="empty-results"
          >
            <img src={selectedCatImage} alt="" />
            <span>Oops...No results 😔</span>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default FamilyList;
