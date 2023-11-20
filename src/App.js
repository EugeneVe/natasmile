import React, { useState } from "react";
import Cookies from "js-cookie";
import Main from "./pages/Main";
import AlertPopup from "./components/alertPopup/AlertPopup";
import "./App.scss";

const App = () => {
  const [ageCheck] = useState(Cookies.get("ageCheck"));
  return (
    <>
      <div className="app-wrapper">
        <div className="app-content-wrapper">
          {ageCheck === "true" ? <Main /> : <AlertPopup />}
        </div>
      </div>
    </>
  );
};

export default App;
