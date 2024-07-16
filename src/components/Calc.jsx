import React, { useContext, useEffect, useRef, useState } from "react";
import "swiper/css";
import Loader from "../components/Loader/Loader";
import { getCities, createOrder, getOrders } from "../http/orderAPI";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";
export const Calc = ({ isModal, setOrders, setPopupAdmin }) => {
  const { user } = useContext(Context);
  const [countFeedback, setCountFeedback] = useState(
    document.body.clientWidth / 440
  );
  const history = useNavigate();
  const [myMap, setMyMap] = useState({});
  const [cities, setCities] = useState([]);
  const [distance, setDistance] = useState("");
  const [calc, setCalc] = useState(null);
  const [load, setLoad] = useState(false);
  const [day, setDay] = useState(1);
  const [price, setPrice] = useState("500");
  const [myForm, setMyForm] = useState({
    city1: "",
    city2: "",
    weight: "",
    size: "",
  });
  useEffect(() => {
    console.log(day);
  }, [day]);
  useEffect(() => {
    console.log(price);
  }, [price]);
  const completeOrder = (e) => {
    e.preventDefault();
    var data1 = new Date();
    var futureDay = data1.getDate() + day;
    var data2 = data1;
    var dd = String(data1.getDate()).padStart(2, "0");
    var mm = String(data1.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = data1.getFullYear();
    data1 = dd + "-" + mm + "-" + yyyy;

    data2.setDate(futureDay);
    dd = String(data2.getDate()).padStart(2, "0");
    mm = String(data2.getMonth() + 1).padStart(2, "0"); //January is 0!
    yyyy = data2.getFullYear();
    data2 = dd + "-" + mm + "-" + yyyy;

    let myUser = JSON.parse(localStorage.getItem("user"));
    createOrder({
      userId: myUser.token.id,
      city1: myForm.city1,
      city2: myForm.city2,
      weight: myForm.weight,
      size: myForm.size,
      price: price,
      date1: data1,
      date2: data2,
      email: myUser.token.email,
    }).then((data) => {
      setOrders((current) => [...current, data]);
      setPopupAdmin(false);
      setPrice("500");
      setDay(1);
      setMyForm({
        city1: "",
        city2: "",
        weight: "",
        size: "",
      });
    });
  };
  useEffect(() => {
    let order = toJS(user.order);
    if (!!order) {
      console.log(order);
      setCalc(order.calc);
      setMyForm({
        city1: order.city1,
        city2: order.city2,
        weight: order.weight > 0 ? order.weight : 0,
        size: order.size > 0 ? order.size : 0,
      });
      setDay(order.day);
      setPrice(Math.round(order.price));
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const setMyOrder = (e) => {
    e.preventDefault();
    history(user.path);
    user.setPopupAdmin(true);
  };
  useEffect(() => {
    getCities().then((data) => setCities(data));
    window.ymaps.ready(() => {
      setMyMap(
        new window.ymaps.Map(
          "map",
          {
            center: [55.751574, 37.573856],
            zoom: 9,
          },
          {
            searchControlProvider: "yandex#search",
          }
        )
      );
    });
  }, []);
  const getDistance = (city1, city2) => {
    const multiRoute = new window.ymaps.multiRouter.MultiRoute(
      {
        // Описание опорных точек мультимаршрута.
        referencePoints: [city1, city2],
        // Параметры маршрутизации.
        params: {
          // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
          results: 1,
        },
      },
      {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        boundsAutoApply: true,
      }
    );

    myMap.geoObjects.add(multiRoute);

    multiRoute.model.events.add("requestsuccess", function (event) {
      let d = multiRoute.getRoutes().get(0).properties.get("distance").text;

      setDistance(d);
      setCalc(!calc);
      multiRoute.destroy();
    });
  };

  const calculateOrder = (e) => {
    e.preventDefault();
    if (myForm.city1.length > 0 && myForm.city2.length > 0) {
      setLoad(true);
      window.ymaps.ready(() => getDistance(myForm.city1, myForm.city2));
    } else {
      alert("Выберите город");
    }
  };

  useEffect(() => {
    if (calc !== null) {
      let tmp = distance.substring(0, distance.length - 2).replace(/\s/g, "");
      console.log(tmp);

      if (tmp > 500) {
        setDay(Math.round(tmp / 500));
      }
      let d;
      if (tmp == "0") {
        d = 500 + (((200  * myForm.weight) / 30) * myForm.size) / 25;
      } else {
        d = 500 + (((+tmp * myForm.weight) / 30) * myForm.size) / 25;
      }

      console.log(d);
      if (d > 500) {
        user.setOrder({
          calc: calc,
          price: d,
          day: Math.round(tmp / 500),
          ...myForm,
        });
        setPrice(Math.round(d));
      }
      setLoad(false);
    }
  }, [calc]);
  useEffect(() => {
    window.addEventListener("resize", handleResize, true);
    return () => {
      window.removeEventListener("resize", handleResize, true);
    };
  }, []);

  const handleResize = (event) => {
    setCountFeedback(document.body.clientWidth / 440);
  };
  return (
    <>
      <div id="map" className="map"></div>
    
      <form
        onSubmit={(e) => calculateOrder(e)}
        className="top__order-inner calc-inner"
      >
        <div className="select">
          <select
            required
            value={myForm.city1}
            name="city1"
            onChange={(e) => handleChange(e)}
            defaultValue={null}
          >
            <option value={null} hidden>
              Откуда
            </option>
            {cities &&
              cities.map((i, index) => {
                {
                  return (
                    <option value={i.name} key={index}>
                      {i.name}
                    </option>
                  );
                }
              })}
          </select>
        </div>
        <div className="select">
          <select
            required
            value={myForm.city2}
            name="city2"
            onChange={(e) => handleChange(e)}
            defaultValue={null}
          >
            <option value={null} hidden>
              Куда
            </option>
            {cities &&
              cities.map((i, index) => {
                {
                  return (
                    <option value={i.name} key={index}>
                      {i.name}
                    </option>
                  );
                }
              })}
          </select>
        </div>
        <h1>m</h1>
        <input
          min={0}
          max={20000}
          required
          value={myForm.weight}
          name="weight"
          onChange={(e) => handleChange(e)}
          className="input-calc"
          placeholder="Вес груза (кг)"
          type="number"
        />
        <input
          min={0}
          max={90}
          required
          value={myForm.size}
          name="size"
          onChange={(e) => handleChange(e)}
          className="input-calc"
          placeholder="Объем груза (м&#179;)"
          type="number"
        />
         <input
          min={0}
          max={90}
          required
          value={myForm.size}
          name="size"
          onChange={(e) => handleChange(e)}
          className="input-calc"
          placeholder="Объем груза (м&#179;)"
          type="number"
        />
        <div className="comment">
          от <span className="bold">{price} ₽</span> , время ожидания -{" "}
          <span className="bold">{day}</span> день
        </div>
        <div className="calc-inner__bottom">
          <button type="submit" className="my-btn count-btn">
            {load ? <Loader></Loader> : "Рассчитать"}
          </button>
          {isModal
            ? calc !== null && (
                <button
                  type="button"
                  onClick={(e) => completeOrder(e)}
                  className="my-btn"
                >
                  Создать заказ
                </button>
              )
            : calc !== null && (
                <button
                  type="button"
                  onClick={(e) => setMyOrder(e)}
                  className="my-btn"
                >
                  Перейти к заказу Перейти к заказу
                </button>
              )}
        </div>
      </form>
    </>
  );
};
export default Calc;
