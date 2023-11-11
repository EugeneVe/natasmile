import React from "react";

const OnlyFans = ({ yes, no, btnName }) => {
  return (
    <>
      <div className="close-wrapper">
        <div className="close" onClick={no}></div>
      </div>
      <div className="description">
        <div className="bold">
          <p className="bold">{btnName} 😋</p> <br />
          Sensative Content
        </div>
        <br /> This link contains {btnName} content, a platform limited
        <br /> to users and visitors of 18 and over
      </div>
      <div className="button-box" onClick={yes}>
        <div className="link invert">
          <div className="icon">
            <p>➜</p>
          </div>
          <div className="link-name">Continue</div>
        </div>
      </div>
    </>
  );
};

export default OnlyFans;
