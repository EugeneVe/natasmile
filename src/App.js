import React from "react";
import MainPage from "./pages/Main";
import "./App.scss";

const App = () => {
  return (
    <div className="app-wrapper">
      <div className="app-content-wrapper">
        <MainPage />
      </div>
    </div>
  );
};

export default App;
