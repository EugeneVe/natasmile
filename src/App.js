import React, { useState } from "react";
import Cookies from "js-cookie";
import CookieWarning from "./components/CookieWarning/CookieWarning";
import Main from "./pages/Main";
import AlertPopup from "./components/alertPopup/AlertPopup";
import "./App.scss";
import SignIn from "./components/signin/Signin";

const App = () => {
  const [ageCheck] = useState(Cookies.get("ageCheck"));

  return (
    <>
      <CookieWarning />
      <div className="app-wrapper">
        <div className="app-content-wrapper">
          {ageCheck === "true" ? <Main /> : <AlertPopup />}
        </div>
      </div>
      <SignIn />
    </>
  );
};

export default App;
