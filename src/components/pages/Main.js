import React from "react";
import OnlyFansLogo from "../../assests/icons/onlyfans.png";
import FacebookLogo from "../../assests/icons/facebook.png";
import InstagramLogo from "../../assests/icons/instagram.png";
import TwitterLogo from "../../assests/icons/twitter.png";
import "./Main.scss";

const Main = () => {
  return (
    <div className="main-wrapper">
      <div className="content-wrapper">
        <div className="logo" />
        <div className="name">Nataliia Ve</div>
        <div className="description">
          Fitness and sports enthusiast,
          <br /> join me at OnlyFans
        </div>
        <div className="links">
          <a href="https://onlyfans.com/nat_smile" target="blank">
            <div className="link">
              <div className="icon">
                <img src={OnlyFansLogo} alt="" />
              </div>
              <div className="link-name">OnlyFans</div>
            </div>
          </a>
          <a href="https://www.instagram.com/nat_smile2023/" target="blank">
            <div className="link">
              <div className="icon">
                <img src={InstagramLogo} alt="" />
              </div>
              <div className="link-name">Instagram</div>
            </div>
          </a>
          <a href="https://www.facebook.com/veprickaya" target="blank">
            <div className="link">
              <div className="icon">
                <img src={FacebookLogo} alt="" />
              </div>
              <div className="link-name">Facebook</div>
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
        <div className="des-link">
          <a href="https://eugeneve.github.io/" target="blank">
            Designed by EV
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
