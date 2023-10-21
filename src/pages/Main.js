import React from "react";
import OnlyFansLogo from "../assests/icons/onlyfans.png";
import InstagramLogo from "../assests/icons/instagram.png";
import TwitterLogo from "../assests/icons/twitter.png";
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
import {
  FacebookShareButton,
  TelegramShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import OnlyFans from "../components/onlyFans/OnlyFans";
import "./Main.scss";

const Main = () => {
  const { fetchData } = useUserData();
  const { popupFans, setPopupFans, popupLogin, setPopupLogin } = useModal();
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
      <Popup className={!popupFans ? "hidden-popup" : ""}>
        <OnlyFans />
      </Popup>
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
          <div className="name">{fetchData[0]?.Name}</div>
          <div className="description">{fetchData[0]?.Description}</div>
          <div className="links">
            <div className="link" onClick={() => setPopupFans(!popupFans)}>
              <div className="icon">
                <img src={OnlyFansLogo} alt="" />
              </div>
              <div className="link-name">OnlyFans</div>
            </div>
            <a href="https://www.instagram.com/nat_smile2023/" target="blank">
              <div className="link">
                <div className="icon">
                  <img src={InstagramLogo} alt="" />
                </div>
                <div className="link-name">Instagram</div>
              </div>
            </a>
            <a href="https://twitter.com/NataliiaVep" target="blank">
              <div className="link">
                <div className="icon">
                  <img src={TwitterLogo} alt="" />
                </div>
                <div className="link-name">Twitter</div>
              </div>
            </a>
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
