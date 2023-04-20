import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register({ onRegistration }) {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegistration({
      email: userData.email,
      password: userData.password,
    })
  }

  return (
    <>
      <div className="login">
        <h1 className="login__heading">Регистрация</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            value={
              userData.email === undefined || userData.email === null
                ? ""
                : userData.email
            }
            onChange={handleChange}
            name="email"
            type="email"
            className="login__input"
            placeholder="Email"
          ></input>
          <input
            onChange={handleChange}
            value={
              userData.password === undefined || userData.password === null
                ? ""
                : userData.password
            }
            className="login__input"
            name="password"
            type="password"
            placeholder="Пароль"
          ></input>
          <button className="login__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="login__route">
          <p className="login__route-text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="login__route-link">
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
