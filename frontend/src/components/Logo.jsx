import React from "react";
import ZunoLogo from "../assets/Zuno.png";

const Logo = ({ className }) => {
  return (
    <div className={`${className}`}>
      <img className="w-full" src={ZunoLogo} alt="zuno logo" />
    </div>
  );
};

export default Logo;
