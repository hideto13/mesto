export class UserInfo {
  constructor({ name, text, api }) {
    this._name = document.querySelector(name);
    this._text = document.querySelector(text);
    this._api = api;
  }

  gettUserInfo() {
    this._api
      .getUserInfo()
      .then((info) => {
        console.log(info);
        this._name.textContent = info.name;
        this._text.textContent = info.about;
      })
      .catch((err) => console.log(err));
  }


  getUserInfo(nameInputElement, textInputElement) {
    this._api
      .getUserInfo()
      .then((info) => {
        console.log(info);
        nameInputElement.value = info.name;
        textInputElement.value = info.about;
      })
      .catch((err) => console.log(err));
  }

  // getUserInfo() {
  //   const info = { name: this._name.textContent, text: this._text.textContent };
  //   return info;
  // }

  setUserInfo({ name, text }) {
    this._name.textContent = name;
    this._text.textContent = text;
  }
}
