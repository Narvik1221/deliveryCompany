import React from "react";

export const Card = () => {
  return (
    <>
      <div style={{ position: "relative", overflow: " hidden" }}>
        <a
          href="https://yandex.ru/maps/77/blagoveshchensk/?utm_medium=mapframe&utm_source=maps"
          style={{
            color: "eee",
            fontSize: "12px",
            position: "absolute",
            top: "0px",
          }}
        >
          Благовещенск
        </a>
        <a
          href="https://yandex.ru/maps/77/blagoveshchensk/house/novotroitskoye_shosse_23b/ZUsBaAJjS0wCXEJvY2JycXpiYAo=/?ll=127.533010%2C50.306389&utm_medium=mapframe&utm_source=maps&z=19"
          style={{
            color: "#eee",
            fontSize: "12px",
            position: "absolute",
            top: "14px",
          }}
        >
          Новотроицкое шоссе, 23Б — Яндекс Карты
        </a>
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=127.533010%2C50.306389&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoyNDc0MDk0NDE4EnLQoNC-0YHRgdC40Y8sINCQ0LzRg9GA0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsINCR0LvQsNCz0L7QstC10YnQtdC90YHQuiwg0J3QvtCy0L7RgtGA0L7QuNGG0LrQvtC1INGI0L7RgdGB0LUsIDIz0JEiCg3fEP9CFX05SUI%2C&z=19&scroll=false"
          width="100%"
          height="800"
          frameborder="1"
          allowfullscreen="true"
          style={{ position: "relative" }}
        ></iframe>
      </div>
    </>
  );
};
export default Card