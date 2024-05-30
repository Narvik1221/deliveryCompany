import React, { useEffect, useRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpeg";
import what from "../images/what.svg";
import mail from "../images/mail.svg";
import { observer } from "mobx-react-lite";
import { AUTH_ROUTE, MAIN_ROUTE } from "../utils/consts";
import { useLocation } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__inner">
          <Link to={MAIN_ROUTE} className="header__logo--link footer-link">
            <img src={logo} className="header__logo" />
          </Link>
        <div className="footer__right">
          <a target="blank" href="whatsapp://send?phone=+73812000000" className="header__link">
            <img src={what} alt="" />
            +7 (3812) 000-000
          </a>
          <a target="blank" href="https://mail.ru" className="header__link">
            <img src={mail} alt="" /> gruz_service@mail.ru
          </a></div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
