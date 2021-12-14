import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._name = this._popup.querySelector(".popup__description");
    this._image = this._popup.querySelector(".popup__image");
  }

  open(name, link) {
    this._name.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  };
}
