import React, { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import {
  LOGIN_ROUTE,
  AUTH_ROUTE,
  MAIN_ROUTE,
  CABINET_ROUTE,
  ADMIN_ROUTE,
} from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Loader from "../components/Loader/Loader";
const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.stopPropagation();
    }

    setValidated(true);
  };
  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      user.setUser(user);
      user.setIsAuth(true);
      if(data.token.role=="ADMIN"){
        history(ADMIN_ROUTE);
      }
      else{
        history(CABINET_ROUTE);
      }
 
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <main className="main">
      <div className="container">
        <div className="auth-inner">
          <div className="login-inner">
            <h2 className="m-auto">
              {isLogin ? "Авторизация" : "Регистрация"}
            </h2>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="d-flex flex-column gap"
            >
              {/* {!isLogin && (
                  <>
                    <Form.Control
                      required
                      className="mt-3"
                      placeholder="Введите ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control
                      required
                      className="mt-3"
                      placeholder="Введите вашу фамилию"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </>
                )} */}

              <Form.Control
                required
                className="mt-3"
                placeholder="Введите ваш email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                required
                className="mt-3"
                placeholder="Введите ваш пароль..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />

              <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                {isLogin ? (
                  <div className="auth-message">
                    Нет аккаунта?{" "}
                    <NavLink to={AUTH_ROUTE}>Зарегистрируйся!</NavLink>
                  </div>
                ) : (
                  <div className="auth-message">
                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                  </div>
                )}

                <button onClick={click} className="my-btn auth-btn ">
                  {isLogin ? "Войти" : "Регистрация"}
                </button>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
});

export default Auth;
