import "./Navigation.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import account from "../../images/account.svg";
import React from "react";
import useResize from "use-resize";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Navigation() {
  const resize = useResize();
  const location = useLocation();
  const [isBurger, setIsBurger] = React.useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  React.useEffect(() => {
    if (resize.width <= 768) {
      setIsBurger(true);
    } else {
      setIsBurger(false);
    }
  }, [resize]);

  function handlePopupOpen() {
    setPopupOpen(true);
  }

  function handlePopupClose(evt) {
    if (evt.target === evt.currentTarget) {
      setPopupOpen(false);
    }
  }

  return (
    <section className={location.pathname === "/" ? "navigation_main" : "navigation"}>
      <div className="navigation__container">
        <Link to="/" className="navigation__logo">
          <img src={logo} alt="Логотип с буквой «С»" />
        </Link>

        {!isBurger && (
          <>
            <div className="navigation__movies-links">
              <a className="navigation__movies" href="/movies">
                Фильмы
              </a>
              <a className="navigation__saved-movies" href="/saved-movies">
                Сохранённые фильмы
              </a>
            </div>
            <div className="navigation__account">
              <a className="navigation__account-link" href="/profile">
                Аккаунт
              </a>
              <div className="navigation__account-image">
                <img
                  className="navigation__account-image_src"
                  src={account}
                  alt="Картинка с головой человечка (или вешалкой)"
                />
              </div>
            </div>
          </>
        )}

        {isBurger && (
          <>
            <div
              className={`${popupOpen ? "navigation__overlay" : ""}`}
              onClick={handlePopupClose}
            >
              {popupOpen && (
                <>
                  <div className="navigation__movies-links-burger">
                    <a className="navigation__movies-burger" href="/">
                      Главная
                    </a>
                    <a className={location.pathname === "/movies" ? "navigation__movies-burger_active" : "navigation__movies-burger"} href="/movies">
                      Фильмы
                    </a>
                    <a
                      className={location.pathname === "/saved-movies" ? "navigation__saved-movies-burger_active" : "navigation__saved-movies-burger"}
                      href="/saved-movies"
                    >
                      Сохранённые фильмы
                    </a>
                  </div>
                  <div className="navigation__account">
                    <a className="navigation__account-link" href="/profile">
                      Аккаунт
                    </a>
                    <div className="navigation__account-image">
                      <img
                        className="navigation__account-image_src"
                        src={account}
                        alt="Картинка с головой человечка (или вешалкой)"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <button className="navigation__burger" onClick={handlePopupOpen} />
          </>
        )}
      </div>
    </section>
  );
}

export default Navigation;
