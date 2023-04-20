import React from "react";
import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="null-page">
      <h3 className="null-page__header">
        <span>Ошибка 404</span>
      </h3>
      <p className="null-page__text">Здесь ничего нет</p>
      <Link className="null-page__link" to="/">Назад</Link>
    </div>
  );
}

export default PageNotFound;
