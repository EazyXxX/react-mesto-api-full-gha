import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Vector from "../images/Vector.svg";

function Header({ email }) {
  const navigate = useNavigate();
  const [isHeaderOpen, setHeaderOpen] = useState(false);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    email = "";
    navigate("/sign-in");
    setHeaderOpen(false);
  }

  function revealHeaderMobile() {
    setHeaderOpen(!isHeaderOpen);
  }

  return (
    <>
      <div
        className={`header__mobile ${
          isHeaderOpen ? "header__mobile_active" : ""
        }`}
      >
        <span className="header__email-mobile">
          {email || localStorage.getItem("email")}
        </span>
        <Link className="header__link-mobile" to="/sign-in" onClick={signOut}>
          Выйти
        </Link>
      </div>
      <header className="header">
        <img className="header__logo" src={Vector} alt="Место" />
        <Routes>
          <Route
            path="/"
            element={
              <div className="header__auth">
                <span className="header__email">
                  {email || localStorage.getItem("email")}
                </span>
                <Link className="header__link" to="/sign-in" onClick={signOut}>
                  Выйти
                </Link>
                <button
                  className={
                    isHeaderOpen ? "header__stripes_close" : "header__stripes"
                  }
                  aria-label="кнопка для отображения электронной почты"
                  onClick={revealHeaderMobile}
                />
              </div>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__mob-link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__mob-link">
                Войти
              </Link>
            }
          />
        </Routes>
      </header>
    </>
  );
}

export default Header;
