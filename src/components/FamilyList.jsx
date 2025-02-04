import React, { useState } from "react";
import { photoURL } from "../App";
import ImageViewer from "./ImageViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
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
  const openImageHandler = (id) => {
    const familyForImage = filteredFamily?.filter(
      (item) => item?.family_id === id
    );
    setViewingFamily(...familyForImage);
    console.log(familyForImage, "familyforimage");
    setShowLargeImage(true);
  };

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
      <div className="family-list">
        <div className="family-list__table">
          <div className="family-list__table-row header">
            <div className="family-list__table-cell">&nbsp;</div>
            <div className="family-list__table-cell">Name & Address</div>
            <div className="family-list__table-cell">Mother Parish</div>
            <div className="family-list__table-cell">Phone & Email</div>
          </div>
          <div className="family-list__table-body">
            {filteredFamily?.length > 0 &&
              filteredFamily?.map((family) => {
                let firstInLine;
                if (family?.hof.toLowerCase().includes("rev")) {
                  firstInLine = true;
                }
                let clickDisabled;
                if (showForm && activeMember) {
                  clickDisabled = true;
                  console.log(clickDisabled, "click");
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
                        {family?.photo !== "" && (
                          <div className="family-list__photo">
                            <img
                              src={`${photoURL}/${family?.photo}`}
                              alt=""
                              onClick={(e) =>
                                openImageHandler(family?.family_id)
                              }
                            />
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
                      <div className="family-list__parish">
                        {family?.mother_parish}
                      </div>
                    </div>
                    <div className="family-list__table-cell">
                      <div className="family-list__phone">
                        <a href={`tel:${family?.phone1}`}> {family?.phone1}</a>

                        {family?.phone2 && (
                          <>
                            {" "}
                            /
                            <a href={`tel:${family?.phone2}`}>
                              {" "}
                              {family?.phone2}
                            </a>
                          </>
                        )}
                      </div>
                      <div className="family-list__email">{family?.email}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyList;
