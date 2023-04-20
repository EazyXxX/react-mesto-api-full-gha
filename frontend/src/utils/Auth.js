class Auth {
  constructor(config) {
    this._config = config;
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const auth = new Auth({
  url: "https://auth.nomoreparties.co",
  headers: {
    "Content-type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export { auth };
