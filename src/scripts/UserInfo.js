export class UserInfo {
  constructor({ name, text }) {
    this._name = name;
    this._text = text;
    this._profileTitle = document.querySelector('.profile__title');
    this._profileSubtitle = document.querySelector('.profile__subtitle');
  }

  getUserInfo() {
    const info = { name: this._name, text: this._text };
    return info;
  }

  setUserInfo({ name, text }) {
    this._name = name;
    this._text = text;
    this._profileTitle.textContent = this._name;
    this._profileSubtitle.textContent = this._text;
  }
}
