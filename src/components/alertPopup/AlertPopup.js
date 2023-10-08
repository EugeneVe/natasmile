import React, { useState } from "react";
import Cookies from "js-cookie";
import Main from "../../pages/Main";
import "./AlertPopup.scss";

const AlertPopup = () => {
  const [redirectToMain, setRedirectToMain] = useState(false);

  const handleYesClick = () => {
    Cookies.set("ageCheck", "true", { expires: 30 });
    setRedirectToMain(true);
  };

  return (
    <>
      {!redirectToMain ? (
        <div className="modal-wrapper">
          <div className="modal-content">
            <p>Hello, my little pervert.</p>
            <p>Are you over 18 years old?</p>
            <div className="buttons-wrapper">
              <div className="alrt-button" onClick={handleYesClick}>
                Sure, i'm old enough
              </div>
              <div
                className="alrt-button alert-no"
                onClick={() =>
                  (window.location.href = "https://www.google.com")
                }
              >
                No, i`m not
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Main />
      )}
    </>
  );
};

export default AlertPopup;
