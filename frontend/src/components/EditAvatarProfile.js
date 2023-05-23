import React from "react";
import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarProfile({
  isOpen,
  onClose,
  onUpdateAvatar,
  overlayClick,
  onEscPress,
}) {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setAvatar("");
  }, [isOpen]);

  function handleAvatarProfile(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar,
    });
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Редактируйте аватар"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
      overlayClick={overlayClick}
      onEscPress={onEscPress}
    >
      <input
        className="popup__input popup__input_type_avatar-link"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        value={avatar}
        required
        id="inputAvatar"
        onChange={handleAvatarProfile}
      />
      <span
        id="inputAvatar-error"
        className="input-error input-error_type_avatar"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarProfile;
