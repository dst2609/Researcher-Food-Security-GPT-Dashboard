import React from "react";
import "./Header.css";
import agricultureLogo from "../../img/agriculture.jpeg";

const Header = () => {
  return (
    <div className="header">
      <div className="img-class">
        <img
          src={agricultureLogo}
          width="100"
          height="100"
          alt="Agriculture Logo"
        />
      </div>
      <div className="header-elements">
        <span>Macroeconomic Food Security Chat GPT Dashboard</span>
      </div>
      <div className="img-class">
        <img
          src={agricultureLogo}
          width="100"
          height="100"
          alt="Agriculture Logo"
        />
      </div>
    </div>
  );
};

export default Header;
