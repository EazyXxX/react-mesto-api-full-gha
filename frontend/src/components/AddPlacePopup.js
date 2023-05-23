import React from "react";
import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  overlayClick,
  onEscPress,
}) {
  const [cardData, setCardData] = useState({
    name: "",
    link: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardData.name,
      link: cardData.link,
    });
  }

  useEffect(() => {
    setCardData({
      name: "",
      link: "",
    })
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"card"}
      title={"Добавьте место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Добавить"}
      overlayClick={overlayClick}
      onEscPress={onEscPress}
    >
      <input
        className="popup__input popup__input_type_card-name"
        type="text"
        name="name"
        placeholder="Название"
        value={cardData.name}
        required
        minLength="2"
        maxLength="30"
        id="inputCard"
        onChange={handleChange}
      />
      <span
        id="inputCard-error"
        className="input-error input-error_type_card"
      ></span>
      <input
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        value={cardData.link}
        placeholder="Ссылка на картинку"
        required
        id="inputLink"
        onChange={handleChange}
      />
      <span
        id="inputLink-error"
        className="input-error input-error_type_link"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
