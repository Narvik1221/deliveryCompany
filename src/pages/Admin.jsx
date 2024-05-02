import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import Footer from "../components/Footer";
import logout from '../images/logout.svg'
import Table from "react-bootstrap/Table";
export const Cabinet = observer(() => {
    const [orders,setOrders]=useState(null)

  return (
    <>
      <main className="main">
        <section className="cabinet">
          <div className="container">
            <div className="cabinet__inner">
                <div className="cabinet__top">
                    
                    <h3 className="title"> Ваши заказы</h3>
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
                              <td>
                              
                              </td>
                              <td>
                             
                              </td>
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
                <button
              
              className="my-btn"
            >Создать заказ </button>
                <button
              
              className="my-btn"
            >Выйти <img src={logout} alt="" /></button>
                </div>
              
            </div>
          </div>
        </section>

     
      </main>
 
    </>
  );
});
export default Cabinet;
