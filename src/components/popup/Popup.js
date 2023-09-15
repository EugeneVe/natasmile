import React from "react";
import { isIOS } from "react-device-detect";
import "./Popup.scss";

const Popup = ({ children, className }) => {
  return (
    <>
      {!isIOS ? (
        <div className={`popup-wrapper ${className}`}>{children}</div>
      ) : (
        <div className={`popup-wrapper ios ${className}`}>{children}</div>
      )}
    </>
  );
};

export default Popup;
