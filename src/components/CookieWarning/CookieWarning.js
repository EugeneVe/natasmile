import React, { useState } from "react";
import Cookies from "js-cookie";
import "./CookieWarning.scss";

const CookieWarning = () => {
  const [showWarning, setShowWarning] = useState(
    !Cookies.get("cookieWarningDismissed")
  );

  const handleDismissClick = () => {
    Cookies.set("cookieWarningDismissed", "true", { expires: 365 });
    setShowWarning(false);
  };

  return (
    <>
      {showWarning ? (
        <>
          <div className="cookie-warning">
            <p>This website uses cookies to enhance your experience.</p>
            <button onClick={handleDismissClick}>Close</button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CookieWarning;
