import React, { useState } from "react";

function Login({ onUpdateAuthorization }) {
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
    onUpdateAuthorization({
      email: userData.email,
      password: userData.password,
    });
  }

  return (
    <>
      <div className="login">
        <h1 className="login__heading">Вход</h1>
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
            id="email"
            className="login__input"
            placeholder="Email"
            minLength="2"
            required
          ></input>
          <input
            value={
              userData.password === undefined || userData.password === null
                ? ""
                : userData.password
            }
            onChange={handleChange}
            className="login__input"
            name="password"
            type="password"
            id="password"
            placeholder="Пароль"
            minLength="6"
            required
          ></input>
          <button
            className="login__button"
            type="submit"
            aria-label="Кнопка сохранения"
          >
            Войти
          </button>
        </form>
        <div className="login__route"></div>
      </div>
    </>
  );
}

export default Login;
