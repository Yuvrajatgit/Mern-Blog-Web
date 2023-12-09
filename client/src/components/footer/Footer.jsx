import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./style.css";
import ContentWrapper from "../contentWrapper/ContentWrapper";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="footer-div">
        <ul className="footer-menuItems">
          <li className="footer-menuItem">Terms Of Use</li>
          <li className="footer-menuItem">Privacy-Policy</li>
          <li className="footer-menuItem">About</li>
          <li className="footer-menuItem">Blog</li>
          <li className="footer-menuItem">FAQ</li>
        </ul>
        <div className="footer-infoText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <div className="socialIcons">
          <span className="footer-icon">
            <FaFacebook />
          </span>
          <span className="footer-icon">
            <FaInstagram />
          </span>
          <span className="footer-icon">
            <FaTwitter />
          </span>
          <span className="footer-icon">
            <FaLinkedin />
          </span>
        </div>
        <div className="footer-infoText footer-bottom">
        <p>&copy; 2023 LOOK Blog. All rights reserved.</p>
      </div>
      <div className="footer-infoText">
        <p>Created By Yuvraj</p>
      </div>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
