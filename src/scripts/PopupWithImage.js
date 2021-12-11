import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(name, link) {
    this._popup.querySelector(".popup__description").textContent = name;
    this._popup.querySelector(".popup__image").src = link;
    this._popup.querySelector(".popup__image").alt = name;
    super.open();
  };
}
