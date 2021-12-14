export class UserInfo {
  constructor({ name, text }) {
    this._name = document.querySelector(name);
    this._text = document.querySelector(text);
  }

  getUserInfo() {
    const info = { name: this._name.textContent, text: this._text.textContent };
    return info;
  }

  setUserInfo({ name, text }) {
    this._name.textContent = name;
    this._text.textContent = text;
  }
}
