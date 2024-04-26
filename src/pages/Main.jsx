import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import search from "../images/search.svg";
import "swiper/css";
import Card from "../components/Card";
export const Main = observer(() => {
  return (
    <main className="main">
      <section className="top">
        <div className="container">
          <div className="top__inner">
            <div className="top__order">
              <h3 className="title">УЗНАТЬ НОМЕР ЗАКАЗА</h3>
              <div className="top__order-wrapper">
                <input placeholder="Введите номер" type="text" />
                <button className="search">
                  <img src={search} alt="" />
                </button>
              </div>
            </div>
            <div className="top__calc"></div>
            <button className="top__order"></button>
          </div>
        </div>
      </section>
      <section className="card">
        <Card></Card>
      </section>
    </main>
  );
});
export default Main;
