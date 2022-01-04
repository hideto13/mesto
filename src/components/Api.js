export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Произошла ошибка");
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Произошла ошибка");
    });
  }

  setUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Произошла ошибка");
    });
  }


  // getInitialCards() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: 'GET',
  //     headers: this._headers
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => console.log(err));
  // }
}
