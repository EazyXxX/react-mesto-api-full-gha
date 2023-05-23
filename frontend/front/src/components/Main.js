import React from "react";
import {useEffect, useState, useContext} from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Header from "./Header";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
    <main>
      <section className="profile">
        <button
          className="profile__avatar-button"
          type="button"
          aria-label="avatar-button"
          onClick={onEditAvatar}
        ></button>
        <img
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        />
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="open"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__plus-button"
          aria-label="add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list" id="list">
          {cards.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              card={card}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
    </>
  );
}

export default Main;
