import React from "react";
import MainPage from "./pages/Main";
import AlertPopup from "./components/alertPopup/AlertPopup";
import "./App.scss";

const App = () => {
  return (
    <>
      <AlertPopup />
      <div className="app-wrapper">
        <div className="app-content-wrapper">
          <MainPage />
        </div>
      </div>
    </>
  );
};

export default App;
