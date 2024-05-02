import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import search from "../images/search.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Footer from "../components/Footer";
import Card from "../components/Card";
import avatar from "../images/avatar.svg";
import Loader from "../components/Loader/Loader";
import { getCities } from "../http/orderAPI";
import { size } from "@cloudinary/url-gen/qualifiers/textFit";
export const Main = observer(() => {
  const options = [];
  const [countFeedback, setCountFeedback] = useState(
    document.body.clientWidth / 440
  );
  const [myMap, setMyMap] = useState({});
  const [cities, setCities] = useState([]);
  const [distance, setDistance] = useState("");
  const [calc,setCalc]= useState(null);
  const [load,setLoad]=useState(false)
  const [price, setPrice] = useState("674");
  const [myForm, setMyForm] = useState({
    city1: "",
    city2: "",
    weight: "",
    size: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setMyForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log(myForm.city1);
  }, [myForm.city1]);
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
    console.log(myMap);
    myMap.geoObjects.add(multiRoute);
    console.log(multiRoute);
    multiRoute.model.events.add("requestsuccess", function (event) {
      let d = multiRoute.getRoutes().get(0).properties.get("distance").text;
      console.log(d);
      setDistance(d);
      setCalc(!calc)
      multiRoute.destroy();
    });
  };

  const calculateOrder = () => {
    if (myForm.city1.length > 0 && myForm.city2.length > 0) {
      setLoad(true)
      window.ymaps.ready(() => getDistance(myForm.city1, myForm.city2));
    }
  };

  useEffect(() => {
    if (calc!==null) {
      let tmp = distance.substring(0, distance.length - 2).replace(/\s/g, "");
      let d
      if (tmp == '0') {
        d = (((100 * 25 * myForm.weight) / 10) * myForm.size) / 10;
      } else {
        d = (((+tmp * 25 * myForm.weight) / 10) * myForm.size) / 10;
      }

      console.log(d);
      setLoad(false)
      setPrice(d);
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
      <main className="main">
        <section className="top">
          <div id="map" className="map"></div>
          <div className="top-sky"></div>
          <div className="bottom-sky"></div>
          <div className="container">
            <div className="top__inner">
              <div className="top__calc">
                <h3 className="title">РАСЧИТАТЬ СТОИМОСТЬ ЗАКАЗА</h3>
                <div className="top__order-wrapper calc-wrapper">
                  <div className="top__order-inner calc-inner">
                    <div className="select">
                      <select
                        value={myForm.city1}
                        name="city1"
                        onChange={(e) => handleChange(e)}
                        defaultValue={"DEFAULT"}
                      >
                        <option value="DEFAULT" hidden>
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
                        value={myForm.city2}
                        name="city2"
                        onChange={(e) => handleChange(e)}
                        defaultValue={"DEFAULT"}
                      >
                        <option value="DEFAULT" hidden>
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
                    <input
                      value={myForm.weight}
                      name="weight"
                      onChange={(e) => handleChange(e)}
                      className="input-calc"
                      placeholder="Вес груза (кг)"
                      type="text"
                    />
                    <input
                      value={myForm.size}
                      name="size"
                      onChange={(e) => handleChange(e)}
                      className="input-calc"
                      placeholder="Длина груза (м)"
                      type="text"
                    />
                    <div className="comment">
                      от {price} ₽, скорейшее прибытие — через 4 дня
                    </div>
                    <button onClick={() => calculateOrder()} className="my-btn count-btn">
                    {load?<Loader></Loader>:"Расчитать"}  
                    </button>
                  </div>
                </div>
              </div>
              <div className="top__order">
                <h3 className="title">УЗНАТЬ НОМЕР ЗАКАЗА</h3>
                <div className="top__order-wrapper">
                  <div className="top__order-inner">
                    <div className="wrap-input">
                      {" "}
                      <input
                        className="input-number"
                        placeholder="Введите номер"
                        type="text"
                      />
                      <button className="search">
                        <img src={search} alt="" />
                      </button>
                    </div>
                    <div className="comment">
                      Номер заказа находится в личном кабинете
                    </div>
                  </div>
                </div>
              </div>
              <button className="top__order"></button>
            </div>
          </div>
        </section>

        <section id="feedback" className="feedback">
          <div className="feedback__slider">
            <div className="row">
              <div className="container">
                {" "}
                <h3 className="title">ОТЗЫВЫ</h3>
                <div className="subtitle">
                  Ваши отзывы и благодарности для нас очень важны!
                </div>
              </div>

              <Swiper
                spaceBetween={20}
                slidesPerView={countFeedback}
                loop={true}
              >
                <SwiperSlide>
                  {" "}
                  <div className="feedback__card">
                    <div className="feedback__card-top">
                      <img src={avatar} className="feedback__card-avatar" />
                      <div className="feedback__card-info">
                        <div className="feedback__card-name">
                          Роман Константинов
                        </div>
                        <div className="feedback__card-comment">8 отзывов</div>
                      </div>
                    </div>
                    <div className="feedback__card-bottom">
                      <div className="feedback__card-stars">
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                      </div>
                      <div className="feedback__card-text">
                        Мои,самые любимые эклеры маковый и сникерс. Покупаю
                        и кушаю с удовольствием.
                      </div>
                      <div className="feedback__card-more">Читать дальше</div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="feedback__card">
                    <div className="feedback__card-top">
                      <img src={avatar} className="feedback__card-avatar" />
                      <div className="feedback__card-info">
                        <div className="feedback__card-name">
                          Валерия Ковалёва
                        </div>
                        <div className="feedback__card-comment">12 отзывов</div>
                      </div>
                    </div>
                    <div className="feedback__card-bottom">
                      <div className="feedback__card-stars">
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="gray" className="feedback__card-star"></div>
                      </div>
                      <div className="feedback__card-text">
                        Отличная компания. Груз пришел быстро.
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="feedback__card">
                    <div className="feedback__card-top">
                      <img src={avatar} className="feedback__card-avatar" />
                      <div className="feedback__card-info">
                        <div className="feedback__card-name">
                          Роман Задонский
                        </div>
                        <div className="feedback__card-comment">12 отзывов</div>
                      </div>
                    </div>
                    <div className="feedback__card-bottom">
                      <div className="feedback__card-stars">
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                      </div>
                      <div className="feedback__card-text">
                        Отличия транспортная компания приветливый и отзывчивый
                        персонал. Все более доступно и понятно...
                      </div>
                      <div className="feedback__card-more">Читать дальше</div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="feedback__card">
                    <div className="feedback__card-top">
                      <img src={avatar} className="feedback__card-avatar" />
                      <div className="feedback__card-info">
                        <div className="feedback__card-name">
                          Аркадий Куйбыв
                        </div>
                        <div className="feedback__card-comment">10 отзывов</div>
                      </div>
                    </div>
                    <div className="feedback__card-bottom">
                      <div className="feedback__card-stars">
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                      </div>
                      <div className="feedback__card-text">
                        Отличная компания. На днях забирал груз. Все очень
                        быстро и без проблем.
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="feedback__card">
                    <div className="feedback__card-top">
                      <img src={avatar} className="feedback__card-avatar" />
                      <div className="feedback__card-info">
                        <div className="feedback__card-name">
                          Аркадий Куйбыв
                        </div>
                        <div className="feedback__card-comment">10 отзывов</div>
                      </div>
                    </div>
                    <div className="feedback__card-bottom">
                      <div className="feedback__card-stars">
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                      </div>
                      <div className="feedback__card-text">
                        Все прошло успешно!
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="feedback__card">
                    <div className="feedback__card-top">
                      <img src={avatar} className="feedback__card-avatar" />
                      <div className="feedback__card-info">
                        <div className="feedback__card-name">
                          Роман Задонский
                        </div>
                        <div className="feedback__card-comment">12 отзывов</div>
                      </div>
                    </div>
                    <div className="feedback__card-bottom">
                      <div className="feedback__card-stars">
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                      </div>
                      <div className="feedback__card-text">
                        Отличия транспортная компания приветливый и отзывчивый
                        персонал. Все более доступно и понятно...
                      </div>
                      <div className="feedback__card-more">Читать дальше</div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <div className="feedback__card">
                    <div className="feedback__card-top">
                      <img src={avatar} className="feedback__card-avatar" />
                      <div className="feedback__card-info">
                        <div className="feedback__card-name">
                          Роман Константинов
                        </div>
                        <div className="feedback__card-comment">8 отзывов</div>
                      </div>
                    </div>
                    <div className="feedback__card-bottom">
                      <div className="feedback__card-stars">
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                        <div id="yellow" className="feedback__card-star"></div>
                      </div>
                      <div className="feedback__card-text">
                        Очень достойная компания. Срок доставки был гораздо
                        быстрей заявленного...
                      </div>
                      <div className="feedback__card-more">Читать дальше</div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
        <section id="about" className="about">
          <div className="top-sky"></div>
          <div className="bottom-sky"></div>
          <div className="container">
            <div className="about__inner">
              <h3 className="title">
                УСЛУГИ КОМПАНИИ <span className="green">ГРУЗ СЕРВИС</span>
              </h3>
              <div className="subtitle">
                Ежедневно оказываем полный комплекс разнообразных услуг для
                скорости, безопасности и удобства.
              </div>

              <ul className="about__cards">
                <li className="about__card">
                  <div className="subtitle">Выгодные условия</div>
                  <div className="about__text">
                    Умеем входить в положение заказчика и готовы пойти на
                    уступки в цене и условиях оплаты. Всегда предлагаем
                    множество вариантов для выбора оптимального.
                  </div>
                </li>
                <li className="about__card">
                  <div className="subtitle">Выгодные условия</div>
                  <div className="about__text">
                    Умеем входить в положение заказчика и готовы пойти на
                    уступки в цене и условиях оплаты. Всегда предлагаем
                    множество вариантов для выбора оптимального.
                  </div>
                </li>
                <li className="about__card">
                  <div className="subtitle">Выгодные условия</div>
                  <div className="about__text">
                    Умеем входить в положение заказчика и готовы пойти на
                    уступки в цене и условиях оплаты. Всегда предлагаем
                    множество вариантов для выбора оптимального.
                  </div>
                </li>
                <li className="about__card">
                  <div className="subtitle">Выгодные условия</div>
                  <div className="about__text">
                    Умеем входить в положение заказчика и готовы пойти на
                    уступки в цене и условиях оплаты. Всегда предлагаем
                    множество вариантов для выбора оптимального.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="card" className="my-card">
          <div className="container">
            <div className="my-card__inner">
              <h3 className="title">КАК НАС НАЙТИ</h3>
              <div className="subtitle">
                Мы находимся по адресу:{" "}
                <span className="green">Новотроицкое шоссе, 23Б</span>{" "}
              </div>
            </div>
          </div>
          <Card></Card>
        </section>
      </main>
      <Footer></Footer>
    </>
  );
});
export default Main;
