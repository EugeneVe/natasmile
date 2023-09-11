import React from "react";
import "./Popup.scss";

const Popup = ({ children, className }) => {
  return <div className={`popup-wrapper ${className}`}>{children}</div>;
};

export default Popup;
