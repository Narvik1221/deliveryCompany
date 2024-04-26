import React, { useEffect, useRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpeg";
import { observer } from "mobx-react-lite";
import { AUTH_ROUTE, MAIN_ROUTE } from "../utils/consts";
export const Header = observer(() => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <Link to={MAIN_ROUTE} className="header__logo--link">
              <img src={logo} className="header__logo" />
            </Link>
            <Link to={AUTH_ROUTE} className="header__person">
              <div className="header__person-text">Личный кабинет</div>
              <div className="header__person--logo"></div>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
});
export default Header;
