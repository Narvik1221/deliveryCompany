import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import {check} from "./http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import "./style/main.css";
import "./style/reset.css";
const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      check().then(data => {
          user.setUser(true)
          user.setIsAuth(true)
      }).finally(() => setLoading(false))
  }, [])
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <AppRouter />
 
      </div>
    </BrowserRouter>
  );
});

export default App;
