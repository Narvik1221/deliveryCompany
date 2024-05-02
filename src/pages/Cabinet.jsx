import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import logout from "../images/logout.svg";
import Table from "react-bootstrap/Table";
import {  useNavigate } from "react-router-dom";import { Context } from "../index";
import { MAIN_ROUTE } from "../utils/consts";
export const Cabinet = observer(() => {
  const { user } = useContext(Context);
  const [orders, setOrders] = useState(null);
  const [email, setEmail] = useState(null);
  const history = useNavigate();
  const setLogout = () => {
    user.setIsAuth(false);
    localStorage.removeItem("user");
    setEmail(null);
    history(MAIN_ROUTE);
  };
  useEffect(() => {
    if (user.isAuth) {
      let myUser = localStorage.getItem("user");
      if (!!myUser) myUser = JSON.parse(myUser);
      setEmail(myUser.token.email);
    }
  }, [user.isAuth]);
  return (
    <>
      <main className="main">
        <section className="cabinet">
          <div className="container">
            <div className="cabinet__inner">
              <div className="cabinet__top">
                <h3 className="title">{email && "Пользователь:" + email} </h3>
                <h3 className="subtitle"> Ваши заказы</h3>
              </div>
              <div className="table-container">
                <div className="table-wrap">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>№</th>
                        <th>Id</th>
                        <th>Код заказа</th>
                        <th>Масса</th>
                        <th>Длина</th>
                        <th>Стоимость</th>
                        <th>Статус</th>
                        <th>Дата создания</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!!orders &&
                        orders.map((i, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{i.id}</td>
                            <td>{i.userId}</td>
                            <td></td>
                            <td></td>
                            <td>{i.count}</td>
                            <td>{i.price}</td>
                            <td>{i.date}</td>
                            <td>{i.time}</td>
                            <td>{i.deliveryCourier ? "Да" : "Нет"}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
              <div className="cabinet__bottom">
                <button className="my-btn">Создать заказ </button>
                <button onClick={setLogout} className="my-btn">
                  Выйти <img src={logout} alt="" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
});
export default Cabinet;
