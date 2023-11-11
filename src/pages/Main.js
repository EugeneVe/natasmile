import React from "react";
import PaypalLogo from "../assests/icons/paypal.svg";
import Popup from "../components/popup/Popup";
import ImageUploader from "../components/imageUploader/ImageUploader";
import { useUserData } from "../Contexts/UserDataContext";
import { useAuth } from "../Contexts/AuthUserContext";
import { useImage } from "../Contexts/ImageUplodedContext";
import { useModal } from "../Contexts/ModalContext";
import { ref, deleteObject } from "firebase/storage";
import { imageDb } from "../Firebase";
import SignIn from "../components/signin/Signin";
import AddNewButton from "../components/addNewButton/AddNewButton";
import {
  FacebookShareButton,
  TelegramShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import "./Main.scss";

const Main = () => {
  const { fetchData } = useUserData();
  const { popupLogin, setPopupLogin } = useModal();
  const { imageData, setImageData } = useImage();
  const { authUser } = useAuth();

  const deleteImage = (imageUrl) => {
    const imageRef = ref(imageDb, imageUrl);
    deleteObject(imageRef)
      .then(() => {
        setImageData(imageData.filter((data) => data.url !== imageUrl));
      })
      .catch((error) => {
        console.error("Error deleting image: ", error);
      });
  };

  return (
    <>
      <Popup className={!popupLogin ? "hidden-popup " : "popup-login"}>
        <div className="close-wrapper">
          <div
            className="close"
            onClick={() => {
              setPopupLogin(!popupLogin);
            }}
          ></div>
        </div>
        <SignIn />
      </Popup>
      <div className="main-wrapper">
        <div
          className="open-login-menu"
          onClick={() => setPopupLogin(!popupLogin)}
        >
          {!popupLogin ? <>☰</> : <>✕</>}
        </div>
        <div className="content-wrapper">
          <ImageUploader />
          <>
            {imageData.length !== 0 ? (
              <>
                <div className="avatar-content">
                  <img
                    className="uploaded-avatar"
                    src={imageData[0].url}
                    alt={imageData[0].timestamp}
                  />
                  {authUser && (
                    <div
                      className="remove-avatar"
                      onClick={() => deleteImage(imageData[0].url)}
                    >
                      Delete
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="logo" />
            )}
          </>
          <div className="name">
            {fetchData[0]?.Name}
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04LjUyNDcgMTUuMTIzNEM4LjIwMyAxNC45MjUxIDcuNzk3IDE0LjkyNTEgNy40NzUzIDE1LjEyMzRMNy4xNDg3MyAxNS4zMjQ3QzYuNjk0MiAxNS42MDQ4IDYuMDk5NzQgMTUuNDc4NSA1Ljc5ODQ1IDE1LjAzNzdMNS41ODE5OSAxNC43MjFDNS4zNjg3NSAxNC40MDkgNC45OTc4NSAxNC4yNDM4IDQuNjIzMzIgMTQuMjk0MUw0LjI0MzExIDE0LjM0NTJDMy43MTM5MiAxNC40MTYyIDMuMjIyMjYgMTQuMDU5IDMuMTI2MzEgMTMuNTMzOEwzLjA1NzM3IDEzLjE1NjRDMi45ODk0NyAxMi43ODQ3IDIuNzE3OCAxMi40ODMgMi4zNTUxOSAxMi4zNzY2TDEuOTg3MDkgMTIuMjY4NkMxLjQ3NDc1IDEyLjExODIgMS4xNzA4OCAxMS41OTE5IDEuMjk2ODcgMTEuMDczMUwxLjM4NzM4IDEwLjcwMDNDMS40NzY1NSAxMC4zMzMgMS4zNTEwOSA5Ljk0NjkyIDEuMDYzMSA5LjcwMjI0TDAuNzcwNzU3IDkuNDUzODVDMC4zNjM4NTIgOS4xMDgxMyAwLjMwMDMyNyA4LjUwMzczIDAuNjI2NDYyIDguMDgwOTZMMC44NjA3NzcgNy43NzcyMkMxLjA5MTYgNy40NzgwMSAxLjEzNDA0IDcuMDc0MjQgMC45NzA0NjggNi43MzM1OEwwLjgwNDQyNCA2LjM4Nzc2QzAuNTczMzE0IDUuOTA2NDMgMC43NjExMTQgNS4zMjg0NCAxLjIzMTAxIDUuMDc0ODhMMS41Njg2MSA0Ljg5MjdDMS45MDExNyA0LjcxMzI0IDIuMTA0MTcgNC4zNjE2NCAyLjA5MzMgMy45ODM5TDIuMDgyMjcgMy42MDA0NEMyLjA2NjkyIDMuMDY2NzIgMi40NzM1NyAyLjYxNTA5IDMuMDA1OTcgMi41NzQ1N0wzLjM4ODQ4IDIuNTQ1NDZDMy43NjUyOSAyLjUxNjc4IDQuMDkzNzUgMi4yNzgxNCA0LjIzNzQ2IDEuOTI4NjRMNC4zODMzNSAxLjU3Mzg1QzQuNTg2NCAxLjA4MDAyIDUuMTQxNiAwLjgzMjgzNiA1LjY0NDQ1IDEuMDEyMzdMNi4wMDU3MyAxLjE0MTM1QzYuMzYxNjMgMS4yNjg0MiA2Ljc1ODc1IDEuMTg0MDEgNy4wMzIxOSAwLjkyMzE3M0w3LjMwOTc4IDAuNjU4MzkxQzcuNjk2MTMgMC4yODk4NTIgOC4zMDM4NyAwLjI4OTg1MiA4LjY5MDIyIDAuNjU4MzkyTDguOTY3ODEgMC45MjMxNzNDOS4yNDEyNSAxLjE4NDAxIDkuNjM4MzcgMS4yNjg0MiA5Ljk5NDI3IDEuMTQxMzVMMTAuMzU1NSAxLjAxMjM3QzEwLjg1ODQgMC44MzI4MzYgMTEuNDEzNiAxLjA4MDAyIDExLjYxNjcgMS41NzM4NUwxMS43NjI1IDEuOTI4NjRDMTEuOTA2MyAyLjI3ODE0IDEyLjIzNDcgMi41MTY3OCAxMi42MTE1IDIuNTQ1NDZMMTIuOTk0IDIuNTc0NTdDMTMuNTI2NCAyLjYxNTA5IDEzLjkzMzEgMy4wNjY3MiAxMy45MTc3IDMuNjAwNDRMMTMuOTA2NyAzLjk4MzlDMTMuODk1OCA0LjM2MTY0IDE0LjA5ODggNC43MTMyNCAxNC40MzE0IDQuODkyN0wxNC43NjkgNS4wNzQ4OEMxNS4yMzg5IDUuMzI4NDQgMTUuNDI2NyA1LjkwNjQzIDE1LjE5NTYgNi4zODc3NkwxNS4wMjk1IDYuNzMzNThDMTQuODY2IDcuMDc0MjQgMTQuOTA4NCA3LjQ3ODAxIDE1LjEzOTIgNy43NzcyMkwxNS4zNzM1IDguMDgwOTZDMTUuNjk5NyA4LjUwMzczIDE1LjYzNjEgOS4xMDgxMyAxNS4yMjkyIDkuNDUzODVMMTQuOTM2OSA5LjcwMjI0QzE0LjY0ODkgOS45NDY5MiAxNC41MjM0IDEwLjMzMyAxNC42MTI2IDEwLjcwMDNMMTQuNzAzMSAxMS4wNzMxQzE0LjgyOTEgMTEuNTkxOSAxNC41MjUzIDEyLjExODIgMTQuMDEyOSAxMi4yNjg2TDEzLjY0NDggMTIuMzc2NkMxMy4yODIyIDEyLjQ4MyAxMy4wMTA1IDEyLjc4NDcgMTIuOTQyNiAxMy4xNTY0TDEyLjg3MzcgMTMuNTMzOEMxMi43Nzc3IDE0LjA1OSAxMi4yODYxIDE0LjQxNjIgMTEuNzU2OSAxNC4zNDUyTDExLjM3NjcgMTQuMjk0MUMxMS4wMDIxIDE0LjI0MzggMTAuNjMxMyAxNC40MDkgMTAuNDE4IDE0LjcyMUwxMC4yMDE1IDE1LjAzNzdDOS45MDAyNiAxNS40Nzg1IDkuMzA1OCAxNS42MDQ4IDguODUxMjcgMTUuMzI0N0w4LjUyNDcgMTUuMTIzNFoiIGZpbGw9IiMwMEI2RkYiLz4KPHBhdGggZD0iTTUuMDY5OTggNy41NjI2NUw3LjE5MTMgOS42ODM5N0wxMS40MzM5IDUuNDQxMzMiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K" />
          </div>
          <div className="main-description">{fetchData[0]?.Description}</div>
          <div className="links">
            <AddNewButton />
          </div>
          <div className="share-wrapper">
            <p>Share this page:</p>
            <div className="share-links">
              <FacebookShareButton url="https://natsmile.github.io/">
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url="https://natsmile.github.io/">
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
              <TelegramShareButton url="https://natsmile.github.io/">
                <TelegramIcon size={40} round={true} />
              </TelegramShareButton>
            </div>
          </div>
          <div className="support-wrapper">
            <a href="https://www.paypal.com/paypalme/natyvep">
              <div className="support-content">
                <div className="support-label">support me</div>
                <img src={PaypalLogo} alt="" />
              </div>
            </a>
          </div>
          <div className="des-link">
            <a href="https://eugeneve.github.io/" target="blank">
              Designed by EV
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
