import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import "./style/main.css";
import "./style/reset.css";
const App = observer(() => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <AppRouter />
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
});

export default App;
