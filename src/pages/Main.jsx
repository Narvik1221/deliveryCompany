import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import search from "../images/search.svg";
import "swiper/css";
import Card from "../components/Card";
export const Main = observer(() => {
  const options = [];
  return (
    <main className="main">
      <section className="top">
        <div className="container">
          <div className="top__inner">
            <div className="top__order">
              <h3 className="title">УЗНАТЬ НОМЕР ЗАКАЗА</h3>
              <div className="top__order-wrapper">
                <input
                  className="input-number"
                  placeholder="Введите номер"
                  type="text"
                />
                <button className="search">
                  <img src={search} alt="" />
                </button>
              </div>
            </div>

            <div className="top__calc">
              <h3 className="title">РАСЧИТАТЬ СТОИМОСТЬ ЗАКАЗА</h3>
              <div className="top__order-wrapper calc-wrapper">
                <div class="select">
                  <select>
                    <option value="DEFAULT" disabled selected hidden>
                      Откуда
                    </option>
                    <option value="2">Благовещенск</option>
                    <option value="3">Белогорск</option>
                    <option value="4">Свободный</option>
                    <option value="3">Завитинск</option>
                    <option value="5">Благовещенск</option>
                    <option value="6">Улан-Удэ</option>
                  </select>
                </div>
                <div class="select">
                  <select>
                    <option value="DEFAULT" disabled selected hidden>
                      Куда
                    </option>
                    <option value="2">Благовещенск</option>
                    <option value="3">Белогорск</option>
                    <option value="4">Свободный</option>
                    <option value="3">Завитинск</option>
                    <option value="5">Благовещенск</option>
                    <option value="6">Улан-Удэ</option>
                  </select>
                </div>
                <input
                  className="input-calc"
                  placeholder="Вес груза (кг)"
                  type="text"
                />
                <input
                  className="input-calc"
                  placeholder="Длина груза (м)"
                  type="text"
                />
                <div className="comment">
                  от 674 ₽, скорейшее прибытие — через 4 дня
                </div>
                <button className="my-btn">Расчитать</button>
              </div>
            </div>
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
