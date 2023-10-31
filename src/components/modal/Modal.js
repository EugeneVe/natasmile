import React from "react";
import "./Modal.scss";

const Modal = ({ children }) => {
  return <div className="small-modal-wrapper">{children}</div>;
};

export default Modal;
