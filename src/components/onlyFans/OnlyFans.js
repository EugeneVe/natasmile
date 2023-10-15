import React from "react";
import { useModal } from "../../Contexts/ModalContext";

const OnlyFans = () => {
  const { popupFans, setPopupFans } = useModal();
  return (
    <div>
      <>
        <div className="close-wrapper">
          <div
            className="close"
            onClick={() => {
              setPopupFans(!popupFans);
            }}
          ></div>
        </div>
        <div className="description">
          <div className="bold">
            <p className="bold">OnlyFans 😋</p> <br />
            Sensative Content
          </div>
          <br /> This link contains OnlyFans content, a platform limited
          <br /> to users and visitors of 18 and over
        </div>
        <a
          href="https://onlyfans.com/nat_smile"
          target="blank"
          onClick={() => {
            setPopupFans(!popupFans);
          }}
        >
          <div className="link invert">
            <div className="icon">
              <p>➜</p>
            </div>
            <div className="link-name">Continue</div>
          </div>
        </a>
      </>
    </div>
  );
};

export default OnlyFans;
