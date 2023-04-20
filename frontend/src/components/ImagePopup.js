function ImagePopup({ card, isOpen, onClose, overlayClick, onEscPress }) {
  return (
    <div
      className={`popup popup_type_picture ${isOpen ? "popup_opened" : ""}`}
      onClick={overlayClick}
      onKeyPress={onEscPress}
    >
      <div className="popup__picture-box">
        <img className="popup__picture" alt={card.name} src={`${card.link}`} />
        <h3 className="popup__pic-moniker">{card.name}</h3>
        <button
          className="popup__cross-button popup__cross-button_type_picture"
          type="button"
          aria-label="close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
