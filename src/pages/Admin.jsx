import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import logout from "../images/logout.svg";
import Table from "react-bootstrap/Table";
import Calc from "../components/Calc";
import { useNavigate, NavLink } from "react-router-dom";
import { Context } from "../index";
import { MAIN_ROUTE } from "../utils/consts";
import { PopupAdmin } from "../components/PopupAdmin";
import { getAllOrders, changeOrder, deleteOrder } from "../http/orderAPI";
import del from "../images/del.svg";
export const Cabinet = observer(() => {
  const { user } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState(null);

  const optionsSelectActive = [true, false];
  const optionsSelect = ["Создан", "Принят", "В пути", "Доставлен"];
  const history = useNavigate();
  useEffect(() => {
    console.log(orders);
  }, [orders]);
  useEffect(() => {
    getAllOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  const delOrder = (id, n) => {
    let confirm = window.confirm(
      `Вы действительно хотите удалить заказ № ${n} ?`
    );
    if (confirm) {
      deleteOrder(id).then((data) => {
        getAllOrders().then((data) => {
          setOrders(data);
        });
      });
    }
  };
  const changeSelect = (row, e, status) => {
    let newRow;
    if (status) {
      newRow = {
        id: row.id,
        status: e.target.value,
        active: row.active,
      };
    } else {
      newRow = {
        id: row.id,
        status: row.status,
        active: e.target.value == "Да",
      };
    }

    changeOrder(newRow).then((data) => {
      getAllOrders().then((data) => {
        setOrders(data);
      });
    });
  };
  const setLogout = () => {
    user.setIsAuth(false);
    localStorage.removeItem("user");
    setEmail(null);
    history(MAIN_ROUTE);
  };

  useEffect(() => {
    console.log(user.order);
    if (user.isAuth) {
      let myUser = localStorage.getItem("user");
      if (!!myUser) myUser = JSON.parse(myUser);
      setEmail(myUser.token.email);
    }
  }, [user.isAuth]);
  return (
    <>
      <PopupAdmin>
        <Calc setOrders={setOrders} isModal={true}></Calc>
      </PopupAdmin>
      <main className="main">
        <section className="cabinet">
          <div className="container">
            <div className="cabinet__inner">
              <NavLink to={MAIN_ROUTE} className="back"></NavLink>
              <div className="cabinet__top">
                <h3 className="title">{"ADMIN"} </h3>
              </div>
              <div className="table-container">
                {orders.length > 0 && (
                  <div className="table-wrap admin">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>№</th>
                          <th>Id</th>
                          <th>Код заказа</th>
                          <th>Масса (кг)</th>
                          <th>Объем (м&#178;)</th>
                          <th>Стоимость ₽</th>
                          <th>Активный</th>
                          <th>Статус</th>
                          <th>Дата создания</th>
                          <th>Дата прибытия</th>
                          <th className="del">
                            <img src={del} alt="" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((i, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{i.userId}</td>
                            <td>{i.code}</td>
                            <td>{i.weight}</td>
                            <td>{i.size}</td>
                            <td>{i.price}</td>
                            <td className="td-select">
                              {" "}
                              <select
                                className="table-select"
                                onChange={(e) => changeSelect(i, e, false)}
                              >
                                {optionsSelectActive.map((option, index) => {
                                  {
                                    return (
                                      <option
                                        selected={i.active == option}
                                        key={index}
                                        name={option}
                                      >
                                        {option == true ? "Да" : "Нет"}
                                      </option>
                                    );
                                  }
                                })}
                              </select>
                            </td>
                            <td className="td-select">
                              {" "}
                              <select
                                className="table-select"
                                onChange={(e) => changeSelect(i, e, true)}
                              >
                                {optionsSelect.map((option, index) => {
                                  {
                                    return (
                                      <option
                                        selected={i.status == option}
                                        key={index}
                                      >
                                        {option}
                                      </option>
                                    );
                                  }
                                })}
                              </select>
                            </td>
                            <td>{i.date1}</td>
                            <td>{i.date2}</td>
                            <td>
                              <div
                                onClick={() => delOrder(i.id, i.code)}
                                className="del-td"
                              ></div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
              <div className="cabinet__bottom">
                <button onClick={setLogout} className="my-btn admin-btn">
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
