import React from "react";
import Main from "./pages/Main";
import AlertPopup from "./components/alertPopup/AlertPopup";
import "./App.scss";

const App = () => {
  const checkValue = localStorage.getItem("ageCheck");

  return (
    <>
      <div className="app-wrapper">
        <div className="app-content-wrapper">
          {checkValue === "true" ? <Main /> : <AlertPopup />}
        </div>
      </div>
    </>
  );
};

export default App;
