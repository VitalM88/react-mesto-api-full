import { apiSettings } from "./utils.js";

class Auth {
    constructor(options) {
      this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }

    register({email, password}) {
        return fetch(`${this._baseUrl}/signup`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "password": password,
            "email": email
          }),
        }).then(res => this._checkResponse(res));
      }
    
      login({email, password}) {
        return fetch(`${this._baseUrl}/signin`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "password": password,
            "email": email
          }),
        }).then(res => this._checkResponse(res));
      }
    
      checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }).then(res => this._checkResponse(res));
      }

}

const auth = new Auth(apiSettings);
export default auth;