import React, { useEffect, useState } from "react";
import { useAddNewBtn } from "../../Contexts/AddNewBtnContext";
import { ReactComponent as RemoveIcon } from "../../assests/icons/removeIcon.svg";
import { useAuth } from "../../Contexts/AuthUserContext";
import ButtonInModal from "../../components/buttonInModal/buttonInModal";
import Modal from "../../components/modal/Modal";
import Popup from "../../components/popup/Popup";
import { db } from "../../Firebase";
import OnlyFans from "../onlyFans/OnlyFans";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import "./AddNewButton.scss";

const AddNewButton = () => {
  const {
    buttons,
    setButtons,
    newButtonName,
    setNewButtonName,
    newButtonLink,
    setNewButtonLink,
  } = useAddNewBtn();
  const { authUser } = useAuth();
  const [modal, setModal] = useState("");
  const [isSensitive, setIsSensitive] = useState(false);
  const [buttonToDelete, setButtonToDelete] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentButtonName, setCurrentButtonName] = useState("");

  const handleSensitiveChange = (e) => {
    setIsSensitive(e.target.checked);
  };

  useEffect(() => {
    const fetchButtons = async () => {
      const buttonCollection = await getDocs(collection(db, "buttons"));
      setButtons(
        buttonCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchButtons();
  }, []);

  const addNewButton = async () => {
    const newButton = {
      name: newButtonName,
      link: newButtonLink,
      sensitive: isSensitive,
    };
    const docRef = await addDoc(collection(db, "buttons"), newButton);
    setButtons([...buttons, { ...newButton, id: docRef.id }]);
    setNewButtonName("");
    setNewButtonLink("");
  };

  const deleteButton = async (id) => {
    await deleteDoc(doc(db, "buttons", id));
    setButtons(buttons.filter((button) => button.id !== id));
  };

  const handleButtonLinkClick = (button) => {
    if (button.sensitive) {
      setSelectedButton(button);
      setCurrentButtonName(button.name);
      setShowConfirmation(true);
    } else {
      window.open(button.link, "_blank");
    }
  };

  return (
    <div className="add-new-btn-wrapper">
      {authUser && (
        <>
          <input
            value={newButtonName}
            onChange={(e) => setNewButtonName(e.target.value)}
            placeholder="Enter button name"
          />
          <input
            value={newButtonLink}
            onChange={(e) => setNewButtonLink(e.target.value)}
            placeholder="Enter the link"
          />
          {newButtonName.length !== 0 && newButtonLink.length !== 0 && (
            <>
              <label>
                Sensitive content:
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={isSensitive}
                  onChange={handleSensitiveChange}
                />
              </label>
              <button className="button" onClick={() => addNewButton()}>
                Click to add new button
              </button>
            </>
          )}
        </>
      )}
      {buttons
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
        .map((button, index) => (
          <div key={index} className="remove-button-wrapper">
            <div onClick={() => handleButtonLinkClick(button)}>
              <div className="link">
                <div className="link-name">{button.name}</div>
              </div>
            </div>
            {authUser && (
              <>
                <button
                  onClick={() => {
                    setModal(true);
                    setButtonToDelete(button.id);
                    setCurrentButtonName(button.name);
                  }}
                  title="Remove the button"
                >
                  <RemoveIcon />
                </button>
              </>
            )}
          </div>
        ))}
      {showConfirmation && (
        <Popup>
          <OnlyFans
            yes={() => {
              setShowConfirmation(false);
              window.open(selectedButton.link, "_blank");
            }}
            no={() => setShowConfirmation(false)}
            btnName={currentButtonName}
          />
        </Popup>
      )}
      {modal && (
        <Modal>
          <ButtonInModal
            title={currentButtonName}
            onClickYes={() => {
              deleteButton(buttonToDelete);
              setModal(false);
            }}
            onClickNo={() => setModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default AddNewButton;
