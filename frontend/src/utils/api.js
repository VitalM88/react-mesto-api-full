import { apiSettings } from "./utils.js";

class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }


  // получение карточек с сервера

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res));
  }


  // добавление карточки

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._checkResponse(res));
  }


  // удаление карточки
  
  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }


  changeLikeCardStatus(cardId, likeStatus) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: (likeStatus ? "PUT": "DELETE"),
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }
  

  // получение информации о пользователе

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkResponse(res));
  }


  // редактирование информации о пользователе

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._checkResponse(res));
  }


  // редактирование аватара пользователя 

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => this._checkResponse(res));
  }
}

const api = new Api(apiSettings);
export default api;