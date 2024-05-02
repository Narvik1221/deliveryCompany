import React, { useContext} from "react";

import { observer } from "mobx-react-lite";
import { Context } from "../index";
export const PopupAdmin = observer(({ children }) => {
  const { user } = useContext(Context);

  return (
    <div className={user.popupAdmin ? "popup-admin active" : "popup-admin"}>
      <div className="container-my popup-reg-container">
        <div className="popup-reg__inner">
          <div className="popup-reg__card">
            <div
              className={
                user.popupAdmin
                  ? "popup-admin__card-inner active"
                  : "popup-admin__card-inner"
              }
            >
              <button
                onClick={() => user.setPopupAdmin(false)}
                className="close-card reg-close"
              ></button>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
