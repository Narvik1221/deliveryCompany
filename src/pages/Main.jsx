import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import search from "../images/search.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { PopupAdmin } from "../components/PopupAdmin";
import Footer from "../components/Footer";
import Calc from "../components/Calc";
import Card from "../components/Card";
import avatar from "../images/avatar.svg";
import Loader from "../components/Loader/Loader";
import { getCities, getFeedbacks } from "../http/orderAPI";
import { size } from "@cloudinary/url-gen/qualifiers/textFit";
import { Context } from "../index";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
export const Main = observer(() => {
  const { user } = useContext(Context);
  const [feedbacks, setFeedbakcs] = useState([]);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [popupFeedback, setPopupFeedback] = useState(false);
  const [countFeedback, setCountFeedback] = useState(
    document.body.clientWidth / 440
  );

  const openFeedback = (i) => {
    setCurrentFeedback(i);
    setPopupFeedback(true);
  };
  useEffect(() => {
    getFeedbacks().then((data) => setFeedbakcs(data));
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
      <PopupAdmin isActive={popupFeedback} setIsActive={setPopupFeedback}>
        {!!currentFeedback && (
          <div className="feedback__card modal-card">
            <div className="feedback__card-top">
              <img src={avatar} className="feedback__card-avatar" />
              <div className="feedback__card-info">
                <div className="feedback__card-name">
                  {currentFeedback.email}
                </div>
                {/* <div className="feedback__card-comment">8 отзывов</div> */}
              </div>
            </div>
            <div className="feedback__card-bottom">
              <div
                className={
                  "star-wrapper small-stars st" + currentFeedback.raiting
                }
              >
                <p name="5" className="fas fa-star s1 "></p>
                <p name="4" className="fas fa-star s2"></p>
                <p name="3" className="fas fa-star s3 "></p>
                <p name="2" className="fas fa-star s4"></p>
                <p name="1" className="fas fa-star s5"></p>
              </div>
              <div className="feedback__card-text modal-text">
                {currentFeedback.name}
              </div>
            </div>
          </div>
        )}
      </PopupAdmin>
      <main className="main">
        <section className="top">
          <div className="top-sky"></div>
          <div className="bottom-sky"></div>
          <div className="container">
            <div className="top__inner">
              <div className="top__calc">
                <h3 className="title">РАСЧИТАТЬ СТОИМОСТЬ ЗАКАЗА</h3>
                <div className="top__order-wrapper calc-wrapper">
                  <Calc isModal={false}></Calc>
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
                      <button className="search search-btn">
                        <div className="search-img"></div>
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
                {feedbacks.length > 0 &&
                  feedbacks.map((i,index) => (
                    <SwiperSlide key={index}>
                      {" "}
                      <div className="feedback__card">
                        <div className="feedback__card-top">
                          <img src={avatar} className="feedback__card-avatar" />
                          <div className="feedback__card-info">
                            <div className="feedback__card-name">{i.email}</div>
                            {/* <div className="feedback__card-comment">8 отзывов</div> */}
                          </div>
                        </div>
                        <div className="feedback__card-bottom">
                          <div
                            className={
                              "star-wrapper small-stars st" + i.raiting
                            }
                          >
                            <p name="5" className="fas fa-star s1 "></p>
                            <p name="4" className="fas fa-star s2"></p>
                            <p name="3" className="fas fa-star s3 "></p>
                            <p name="2" className="fas fa-star s4"></p>
                            <p name="1" className="fas fa-star s5"></p>
                          </div>
                          <div
                            className={
                              i.name.length > 120
                                ? "feedback__card-text dotes"
                                : "feedback__card-text"
                            }
                          >
                            {i.name}
                          </div>
                          {i.name.length > 120 && (
                            <button
                              onClick={() => openFeedback(i)}
                              className="feedback__card-more"
                            >
                              Читать дальше
                            </button>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
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
                  <div className="subtitle about-card">Выгодные условия</div>
                  <div className="about__text">
                    Умеем входить в положение заказчика и готовы пойти на
                    уступки в цене и условиях оплаты. Всегда предлагаем
                    множество вариантов для выбора оптимального.
                  </div>
                </li>
                <li className="about__card">
                  <div className="subtitle about-card">Выгодные условия</div>
                  <div className="about__text">
                    Умеем входить в положение заказчика и готовы пойти на
                    уступки в цене и условиях оплаты. Всегда предлагаем
                    множество вариантов для выбора оптимального.
                  </div>
                </li>
                <li className="about__card">
                  <div className="subtitle about-card">Выгодные условия</div>
                  <div className="about__text">
                    Умеем входить в положение заказчика и готовы пойти на
                    уступки в цене и условиях оплаты. Всегда предлагаем
                    множество вариантов для выбора оптимального.
                  </div>
                </li>
                <li className="about__card">
                  <div className="subtitle about-card">Выгодные условия</div>
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
