import React from "react";
import OverlayBackdrop from "./OverlayBackdrop";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = ({ title, children, confirmModal, cancelModal }) => {
  return createPortal(
    <>
      <OverlayBackdrop />
      <div className="modal">
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
      </div>
    </>,
    document.getElementById("overlay")
  );
};

export default Modal;
