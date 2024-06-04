import React, { useEffect, useRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpeg";
import what from "../images/what.svg";
import mail from "../images/mail.svg";
import { observer } from "mobx-react-lite";
import { AUTH_ROUTE, MAIN_ROUTE } from "../utils/consts";
import { useLocation } from "react-router-dom";
export const Footer = () => {


  const whatsapp=()=>{
      const phoneNumber = "+79143809996"; // Замените на необходимый номер
      const appLink = `whatsapp://send?phone=${phoneNumber}`;
      const webLink = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
      const timeout = 1500;
      const start = Date.now();
    
      // Try to open WhatsApp
      window.location = appLink;
    
      // If WhatsApp is not opened in the given time, redirect to the web version
      setTimeout(function () {
        if (Date.now() - start < timeout + 100) {
          window.open(webLink, "_blank");
        }
      }, timeout);
  }
  const mailSend=()=>{
    const recipient = 'gruz_service@mail.ru'; // Replace with the actual recipient email
    const subject = encodeURIComponent('');
    const body = encodeURIComponent('');
    const mailtoLink = `https://e.mail.ru/compose/?to=${recipient}&subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  }
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__inner">
          <Link to={MAIN_ROUTE} className="header__logo--link footer-link">
            <img src={logo} className="header__logo" />
          </Link>
        <div className="footer__right">
          <a onClick={whatsapp} className="header__link btn-footer" >
            <img src={what} alt="" />
            +7 (914) 380 99-96
          </a>
          <a onClick={mailSend}  className="header__link btn-footer">
            <img src={mail} alt="" /> gruz_service@mail.ru
          </a></div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
