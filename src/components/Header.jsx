import React, { useEffect, useRef, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../images/logo.jpeg";
import {
  MAIN_ROUTE,
  LOGIN_ROUTE,
  CABINET_ROUTE,
  ADMIN_ROUTE,
} from "../utils/consts";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
export const Header = observer(() => {
  const { user } = useContext(Context);
  const btn = useRef();
  const location = useLocation();
  const [wrp, setWrp] = useState(false);
  const [path, setPath] = useState(LOGIN_ROUTE);
  const click = (e) => {
    setWrp(!wrp);
  };
  const handleResize = () => {
    if (document.body.clientWidth > 748) setWrp(false);
  };
  useEffect(() => {
    user.setPath(LOGIN_ROUTE);
    console.log(user.isAuth);
    if (user.isAuth) {
      let myUser = localStorage.getItem("user");
      console.log(myUser);
      if (!!myUser) {
        myUser = JSON.parse(myUser);
        if (myUser?.token?.role == "ADMIN") {
          setPath(ADMIN_ROUTE);
        } else {
          setPath(CABINET_ROUTE);
          user.setPath(CABINET_ROUTE);
        }
      }
    } else {
      setPath(LOGIN_ROUTE);
    }
  }, [user.isAuth]);
  useEffect(() => {
    window.addEventListener("resize", handleResize, true);
    return () => {
      window.removeEventListener("resize", handleResize, true);
    };
  }, []);
  return (
    <>
      <div className={wrp ? "wrp active" : "wrp"}>
        <div className="container wrp-container">
          <div className="wrp__inner">
            {location.pathname == MAIN_ROUTE ? (
              <a href="#top" className="header__logo--link">
                <img src={logo} className="header__logo" />
              </a>
            ) : (
              <Link to={MAIN_ROUTE} className="header__logo--link">
                <img src={logo} className="header__logo" />
              </Link>
            )}

            <ul className="wrp__navbar">
              {location.pathname == MAIN_ROUTE && (
                <>
                  {" "}
                  <li
                    onClick={() => setWrp(false)}
                    className="wrp__navbar-item"
                  >
                    <a href="#about" className="header__link">
                      Услуги
                    </a>
                  </li>{" "}
                  <li
                    onClick={() => setWrp(false)}
                    className="wrp__navbar-item"
                  >
                    <a href="#feedback" className="header__link">
                      Отзывы
                    </a>
                  </li>{" "}
                  <li
                    onClick={() => setWrp(false)}
                    className="wrp__navbar-item"
                  >
                    <a href="#card" className="header__link">
                      Адрес
                    </a>
                  </li>
                </>
              )}

              <li onClick={() => setWrp(false)} className="wrp__navbar-item">
                <Link to={path} className="header__link">
                  Личный кабинет
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <header  className={wrp ? "header active" : "header"}>
        <div className="container">
          <div className={wrp ? "header__inner active" : "header__inner"}>
            <div className="header__left">
            {location.pathname == MAIN_ROUTE ? (
              <a href="#top" className="header__logo--link">
                <img src={logo} className="header__logo" />
              </a>
            ) : (
              <Link to={MAIN_ROUTE} className="header__logo--link">
                <img src={logo} className="header__logo" />
              </Link>
            )}

              <div className="header__phone header-big">8 800 555-35-35</div>

              {location.pathname == MAIN_ROUTE && (
                <>
                  {" "}
                  <a
                    href="#about"
                    className=" header__link m768-960 header-big"
                  >
                    Услуги
                  </a>
                  <a
                    href="#feedback"
                    className="header__link m768-960 header-big"
                  >
                    Отзывы
                  </a>
                  <a href="#card" className="header__link m768-960 header-big">
                    Адрес
                  </a>
                </>
              )}
            </div>

            <Link to={path} className="my-btn login-btn header-big">
              <div className="header__person-text">Личный кабинет</div>
              <div className="header__person--logo"></div>
            </Link>

            <button
              ref={btn}
              onClick={click}
              className={wrp ? "header__btn active" : "header__btn"}
            ></button>
          </div>
        </div>
      </header>
    </>
  );
});
export default Header;
