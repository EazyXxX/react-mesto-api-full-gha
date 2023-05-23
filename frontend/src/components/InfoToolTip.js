import React from "react";
import { useEffect } from "react";
import Union from "../images/Union.svg";
import AntiUnion from "../images/AntiUnion.svg";

function InfoToolTip({
  isOpen,
  onClose,
  overlayClick,
  onEscPress,
  requestStatus,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleESC(e) {
      if (e.key === "Escape") {
        onEscPress();
      }
    }
    document.addEventListener("keydown", handleESC);
    return () => document.removeEventListener("keydown", handleESC);
  }, [isOpen]);

  return (
    <div
      className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={overlayClick}
    >
      <div className="popup__window">
        <div className="popup__union-wrapper">
          <img
            className="popup__union"
            src={requestStatus ? Union : AntiUnion}
            alt="Большая галочка"
          />
          <h2 className="popup__header popup__union-header">
            {requestStatus
              ? `Вы успешно зарегистрировались!`
              : `Что-то пошло не так! Попробуйте ещё раз.`}
          </h2>
        </div>
        <button
          className="popup__cross-button popup__cross-button_type_edit"
          type="button"
          aria-label="close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;
