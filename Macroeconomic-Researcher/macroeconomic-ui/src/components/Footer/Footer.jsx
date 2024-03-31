import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>
          © {new Date().getFullYear()} Macroeconomic Research Dashboard. All
          rights reserved.
        </span>
        <div className="developer-info">
          <span>Developed by:</span>
          <ul className="developer-list">
            <li>Devarsh Thaker</li>
            <li>Yashvi Desai</li>
            <li>Priyanka Shah</li>
            <li>Piyush Gade</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
