import React from "react";

const OnlyFans = ({ yes, no, btnName }) => {
  return (
    <div>
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
        <a href="#" onClick={yes}>
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
