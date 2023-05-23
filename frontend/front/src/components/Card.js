import React from "react";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({
  card,
  name,
  link,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  {
    isOwn && (
      <button className="elements__delete-button" onClick={handleDeleteClick} />
    );
  }

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__card">
      <button className="elements__img-button" type="button">
        <img
          className="elements__image"
          style={{ backgroundImage: `url(${link})` }}
          onClick={handleClick}
        />
      </button>
      {isOwn && (
        <button
          type="button"
          className="elements__delete-button elements__delete-button_type_active"
          aria-label="кнопка удаления карточки"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="elements__card-footer">
        <h2 className="elements__name">{name}</h2>
        <div className="elements__like-elements">
          <button
            className={`elements__like ${isLiked && "elements__like_active"}`}
            type="button"
            aria-label="кнопка лайка"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__like-counter">{likes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
