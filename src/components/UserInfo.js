export class UserInfo {
  constructor({ name, text, avatar, api }) {
    this._name = document.querySelector(name);
    this._text = document.querySelector(text);
    this._avatar = document.querySelector(avatar);
    this._api = api;
  }

  gettUserInfo() {
    this._api
      .getUserInfo()
      .then((info) => {
        this._name.textContent = info.name;
        this._text.textContent = info.about;
        this._avatar.src = info.avatar
      })
      .catch((err) => console.log(err));
  }

  getUserInfo(nameInputElement, textInputElement) {
    this._api
      .getUserInfo()
      .then((info) => {
        nameInputElement.value = info.name;
        textInputElement.value = info.about;
      })
      .catch((err) => console.log(err));
  }

  // getUserInfo() {
  //   const info = { name: this._name.textContent, text: this._text.textContent };
  //   return info;
  // }

  // setUserInfo({ name, text }) {
  //   this._name.textContent = name;
  //   this._text.textContent = text;
  // }

  setUserInfo({ name, text }) {
    this._api
      .setUserInfo(name, text)
      .then((info) => {
        this._name.textContent = info.name;
        this._text.textContent = info.about;
      })
      .catch((err) => console.log(err));
  }
}
