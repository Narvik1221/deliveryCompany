import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import search from "../images/search.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Footer from "../components/Footer";
import Card from "../components/Card";
import avatar from "../images/avatar.svg";
export const Main = observer(() => {
  const options = [];
  const [countFeedback, setCountFeedback] = useState(
    document.body.clientWidth / 440
  );
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
          <div className="top-sky"></div>
          <div className="bottom-sky"></div>
          <div className="container">
            <div className="top__inner">
              <div className="top__calc">
                <h3 className="title">РАСЧИТАТЬ СТОИМОСТЬ ЗАКАЗА</h3>
                <div className="top__order-wrapper calc-wrapper">
                  <div className="top__order-inner">
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
