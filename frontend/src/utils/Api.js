export class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    //проверить ответ с сервера на валидность
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, options) {
    //унифицированный запрос на сервер
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo() {
    //получить данные пользователя (GET)
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  patchAvatar(avatar) {
    //заменить аватар (PATCH)
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }

  patchUserInfo(name, about) {
    //заменить данные пользователя (PATCH)
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  getInitialCards() {
    //получить список всех карточек в виде массива GET
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  addCard(name, link) {
    //добавить карточку (POST)
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteLike(_id) {
    //удалить лайк карточки (DELETE)
    return this._request(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(_id) {
    //лайкнуть карточку (PUT)
    return this._request(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteCard(_id) {
    //удалить карточку (DELETE)
    return this._request(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-55", {
  authorization: "853d6c1d-e77b-4d27-90f9-bed9b171c7fd",
  "Content-Type": "application/json",
});

export default api;
