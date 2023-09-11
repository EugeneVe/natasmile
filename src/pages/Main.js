import React, { useState } from "react";
import OnlyFansLogo from "../assests/icons/onlyfans.png";
import InstagramLogo from "../assests/icons/instagram.png";
import TwitterLogo from "../assests/icons/twitter.png";
import Popup from "../components/popup/Popup";
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
  const [popup, setPopup] = useState(false);
  return (
    <>
      <Popup className={!popup ? "hidden-popup" : ""}>
        <>
          <div className="close-wrapper">
            <div
              className="close"
              onClick={() => {
                setPopup(!popup);
              }}
            ></div>
          </div>
          <div className="description">
            <p className="bold">
              <p className="bold">OnlyFans 😋</p> <br />
              Sensative Content
            </p>
            <br /> This link contains OnlyFans content, a platform limited{" "}
            <br /> to users and visitors of 18 and over
          </div>
          <a
            href="https://onlyfans.com/nat_smile"
            target="blank"
            onClick={() => {
              setPopup(!popup);
            }}
          >
            <div className="link invert">
              <div className="link-name">Continue</div>
            </div>
          </a>
        </>
      </Popup>
      <div className="main-wrapper">
        <div className="content-wrapper">
          <div className="logo" />
          <div className="name">Nataliia Ve</div>
          <div className="description">
            Fitness and sports enthusiast,
            <br /> join me at OnlyFans
          </div>
          <div className="links">
            <div className="link" onClick={() => setPopup(!popup)}>
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
