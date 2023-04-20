import React from "react";
import { useEffect } from "react";

function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  overlayClick,
  onEscPress,
}) {
  useEffect(() => {
    document.addEventListener("keydown", onEscPress);
    return () => document.removeEventListener("keydown", onEscPress);
  }, [isOpen]);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={overlayClick}
      onKeyPress={onEscPress}
    >
      <div className="popup__window">
        <button
          className="popup__cross-button popup__cross-button_type_edit"
          type="button"
          aria-label="close"
          onClick={onClose}
        ></button>
        <h2 className="popup__header">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          id={`${name}"Form"`}
          name="popupFormEdit"
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__save-button" id="submitEdit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
