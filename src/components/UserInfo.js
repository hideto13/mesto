export class UserInfo {
  constructor({
    name,
    text,
    avatar,
    getUserInfo,
    setPopupUserInfo,
    setUserInfo,
    setAvatar,
  }) {
    this._name = document.querySelector(name);
    this._text = document.querySelector(text);
    this._avatar = document.querySelector(avatar);
    this.getUserInfo = getUserInfo;
    this.setPopupUserInfo = setPopupUserInfo;
    this.setUserInfo = setUserInfo;
    this.setAvatar = setAvatar;
  }

  _handleUserInfo(info) {
    this._name.textContent = info.name;
    this._text.textContent = info.about;
  }

  _handleAvatar(info) {
    this._avatar.src = info.avatar;
  }

  _handlePopupUserInfo(info, nameInputElement, textInputElement) {
    nameInputElement.value = info.name;
    textInputElement.value = info.about;
  }
}
