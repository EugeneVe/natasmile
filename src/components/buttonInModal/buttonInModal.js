import React from "react";
import "./buttonInModal.scss";

const ButtonInModal = ({ onClickYes, onClickNo, title }) => {
  return (
    <div className="small-modal-buttons-wrapper">
      <p>
        Are you sure you want to remove <span>{title}</span>?
      </p>
      <div className="small-modal-buttons">
        <button className="small-modal-button alert" onClick={onClickYes}>
          YES
        </button>
        <button className="small-modal-button" onClick={onClickNo}>
          NO
        </button>
      </div>
    </div>
  );
};

export default ButtonInModal;
