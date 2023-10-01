import React, { useState, useEffect } from "react";
import "./AlertPopup.scss";

const AlertPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const ageCheck = localStorage.getItem("ageCheck");
    if (!ageCheck) {
      setIsOpen(true);
    }
  }, []);

  const handleYesClick = () => {
    localStorage.setItem("ageCheck", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <p>Could be NSFW content</p>
        <p>Ary you 18+ ?</p>
        <div className="buttons-wrapper">
          <div className="alrt-button" onClick={handleYesClick}>Sure, i'm old enough</div>
          <div className="alrt-button alert-no"
            onClick={() => (window.location.href = "https://www.google.com")}
          >
            No, i`m not
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertPopup;
