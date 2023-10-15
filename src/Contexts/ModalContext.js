import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [popupFans, setPopupFans] = useState(false);
  const [popupLogin, setPopupLogin] = useState(false);

  return (
    <ModalContext.Provider
      value={{ popupFans, setPopupFans, popupLogin, setPopupLogin }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
