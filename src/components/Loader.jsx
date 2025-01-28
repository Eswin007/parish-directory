import React from "react";
import OverlayBackdrop from "./OverlayBackdrop";
import { createPortal } from "react-dom";

const Loader = ({ message = "Please Wait..." }) => {
  return createPortal(
    <>
      <OverlayBackdrop />
      <div className="loader">
        <div className="loader__circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
          <div className="circle circle-5"></div>
        </div>
        {message}
      </div>
    </>,
    document.getElementById("overlay")
  );
};

export default Loader;
