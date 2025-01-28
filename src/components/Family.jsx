import React, { useState } from "react";
import Members from "./Members";
import { photoURL } from "../App";
import Modal from "./Modal";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";

const Family = ({
  family,
  familyMembers, //newly added
  onDeleteFamily,
  onEditFamily,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
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
      <div className="family">
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
            <img src={`${photoURL}/${family?.photo}`} alt="" />
          </div>
        )}

        <table className="family__detail">
          <tbody>
            <tr>
              <td>Address</td>
              <td>{family?.address}</td>
            </tr>
            <tr>
              <td>Mother Parish</td>
              <td>{family?.mother_parish || "-"}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>
                <span>{`${family?.phone1 || ""}  / ${
                  family?.phone2 || "-"
                }`}</span>
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{family?.email}</td>
            </tr>
          </tbody>
        </table>
        <Members family={family} familyMembers={familyMembers} />
      </div>
    </>
  );
};

export default Family;
