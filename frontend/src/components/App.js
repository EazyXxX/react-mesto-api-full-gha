import React, { useEffect, useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import { auth } from "../utils/Auth.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarProfile from "./EditAvatarProfile.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoToolTip from "./InfoToolTip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import PageNotFound from "./PageNotFound.js";

function App() {
  const navigate = useNavigate();

  //Стэйты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  //Стэйты данных карточек
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  //Стэйт loggedIn
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  //Стэйт запроса к API
  const [requestStatus, setRequestStatus] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  function handleCardClick(data) {
    setImagePopupOpen(true);
    setSelectedCard(data);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleOverlayClose(e) {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains("popup__cross-button")
    ) {
      closeAllPopups();
    }
  }

  function handleEscClose({ key }) {
    switch (key) {
      case "Escape":
        closeAllPopups();
        break;
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.likeCard(card._id).then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err))
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .patchUserInfo(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .patchAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAddCard(data) {
    api
      .addCard(data.name, data.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegistration(data) {
    auth
      .register(data.email, data.password)
      .then(() => {
        setRequestStatus(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setRequestStatus(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleAuthorization(data) {
    auth
      .authorize(data.email, data.password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("email", data.email);
        setEmail(data.email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
      });
  }

  function tokenCheck() {
    //Токен действующий?
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      //проверка токена
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            //авторизация пользователя
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/sign-in"
            element={<Login onUpdateAuthorization={handleAuthorization} />}
          />
          <Route
            path="/sign-up"
            element={<Register onRegistration={handleRegistration} />}
          />
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route
              path="/"
              element={
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
          </Route>
        </Routes>
        <Footer />
        <InfoToolTip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          onEscPress={closeAllPopups}
          overlayClick={handleOverlayClose}
          requestStatus={requestStatus}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          overlayClick={handleOverlayClose}
          onEscPress={handleEscClose}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleUpdateAddCard}
          overlayClick={handleOverlayClose}
          onEscPress={handleEscClose}
        />

        <EditAvatarProfile
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          overlayClick={handleOverlayClose}
          onEscPress={handleEscClose}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={imagePopupOpen}
          onClose={closeAllPopups}
          overlayClick={handleOverlayClose}
          onEscPress={handleEscClose}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
