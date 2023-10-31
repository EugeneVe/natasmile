import React from "react";
import ReactDOM from "react-dom/client";
import { AuthUserProvider } from "./Contexts/AuthUserContext";
import { ImageUplodedProvider } from "./Contexts/ImageUplodedContext";
import CookieWarning from "./components/cookieWarning/CookieWarning";
import { ModalProvider } from "./Contexts/ModalContext";
import { AddNewBtnProvider } from "./Contexts/AddNewBtnContext";
import { UserDataProvider } from "./Contexts/UserDataContext";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <React.StrictMode>
  <>
    <AddNewBtnProvider>
      <UserDataProvider>
        <CookieWarning />
        <AuthUserProvider>
          <ImageUplodedProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </ImageUplodedProvider>
        </AuthUserProvider>
      </UserDataProvider>
    </AddNewBtnProvider>
  </>
  //   </React.StrictMode>
);
reportWebVitals();
