import React from "react";
import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  overlayClick,
  onEscPress,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [userData, setUserData] = useState({
    name: "",
    about: "",
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
    onUpdateUser({
      name: userData.name,
      about: userData.about,
    });
  }

  useEffect(() => {
    setUserData({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактируйте профиль"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
      overlayClick={overlayClick}
      onEscPress={onEscPress}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        placeholder="Имя"
        value={
          userData.name === undefined || userData.name === null
            ? ""
            : userData.name
        }
        required
        minLength="2"
        maxLength="40"
        id="inputName"
        onChange={handleChange}
      />
      <input
        className="popup__input popup__input_type_subname"
        type="text"
        name="about"
        value={
          userData.about === undefined || userData.about === null
            ? ""
            : userData.about
        }
        placeholder="Предназначение"
        required
        minLength="2"
        maxLength="200"
        id="inputSubname"
        onChange={handleChange}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
