import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";

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
    <div className={`toast ${error ? "error" : "success"}`}>
      <div className="toast__icon">
        <FontAwesomeIcon icon={faCircleCheck} />
      </div>
      <div className="toast__body">{children}</div>
      <button onClick={() => setShowToast(false)} className="toast__close">
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>,
    document.getElementById("overlay")
  );
};

export default Toast;
