import React, { createContext, useState, useContext } from "react";

const AddNewBtnContext = createContext();

export function AddNewBtnProvider({ children }) {
  const [buttons, setButtons] = useState([]);
  const [newButtonName, setNewButtonName] = useState("");
  const [newButtonLink, setNewButtonLink] = useState("");

  return (
    <AddNewBtnContext.Provider
      value={{
        buttons,
        setButtons,
        newButtonName,
        setNewButtonName,
        newButtonLink,
        setNewButtonLink,
      }}
    >
      {children}
    </AddNewBtnContext.Provider>
  );
}

export function useAddNewBtn() {
  return useContext(AddNewBtnContext);
}
