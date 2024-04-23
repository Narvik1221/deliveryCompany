import React, { useEffect, useRef, useContext, useState } from "react";
import logo from "../images/logo.jpeg";
import { observer } from "mobx-react-lite";
export const Header = observer(() => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <a href="" className="header__logo--link">
              <img src={logo} className="header__logo" />
            </a>
            <a className="header__person">
              <div className="header__person-text">Личный кабинет</div>
              <div className="header__person--logo"></div>
            </a>
          </div>
        </div>
      </header>
    </>
  );
});
export default Header;
