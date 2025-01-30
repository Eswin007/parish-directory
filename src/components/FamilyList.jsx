import React, { useState } from "react";
import { photoURL } from "../App";
import ImageViewer from "./ImageViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const FamilyList = ({ filteredFamily }) => {
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [viewingFamily, setViewingFamily] = useState({});
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
      <div className="family-list">
        <div className="family-list__table">
          <div className="family-list__table-row header">
            <div className="family-list__table-cell">&nbsp;</div>
            <div className="family-list__table-cell">Name & Address</div>
            <div className="family-list__table-cell">Mother Parish</div>
            <div className="family-list__table-cell">Phone & Email</div>
            <div className="family-list__table-cell">&nbsp;</div>
          </div>
          {filteredFamily?.length > 0 &&
            filteredFamily?.map((family) => {
              return (
                <div
                  className="family-list__table-row"
                  key={family?.family__id}
                >
                  <div className="family-list__table-cell">
                    <div className="family-list__photo">
                      {family?.photo !== "" && (
                        <div className="family-list__photo">
                          <img
                            src={`${photoURL}/${family?.photo}`}
                            alt=""
                            onClick={(e) => openImageHandler(family?.family_id)}
                          />

                          {/* <button
                            className="family-list__photo-enlarge"
                            onClick={() => setShowLargeImage(true)}
                          >
                            <FontAwesomeIcon icon={faExpand} />
                          </button> */}
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
                      {family?.phone1} {family?.phone2 && "/ " + family?.phone2}
                    </div>
                    <div className="family-list__email">{family?.email}</div>
                  </div>
                  <div className="family-list__table-cell">
                    <div className="family-list__action">
                      <button className="family-list__action--edit">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="family-list__action--delete">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                  {/* <div className="family-list__table-cell">
                    <div className="family-list__email">{family?.email}</div>
                  </div> */}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default FamilyList;
