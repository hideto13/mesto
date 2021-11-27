import { openPopup } from "./index.js";

export class Card {
  static _template = document.querySelector(".card_template").content;
  static _photoPopup = document.querySelector(".popup_photo");
  static _container = document.querySelector(".cards__list");

  constructor(name, link, method) {
    this._name = name;
    this._link = link;
    this._method = method;
  }

  _handleLike() {
    this._like = this._card.querySelector(".card__like-button");
    this._like.classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    this._card.remove();
  }

  _renderPhoto() {
    this._image = this._card.querySelector(".card__image");
    Card._photoPopup.querySelector(".popup__description").textContent = this._image.alt;
    Card._photoPopup.querySelector(".popup__image").src = this._image.src;
    Card._photoPopup.querySelector(".popup__image").alt = this._image.alt;

    openPopup(Card._photoPopup);
  }

  _setListeners(element) {
    element.querySelector(".card__like-button").addEventListener("click", () => {
      this._handleLike();
    });
    element.querySelector(".card__delete-button").addEventListener("click", () => {
      this._handleDelete();
    });
    element.querySelector(".card__image").addEventListener("click", () => {
      this._renderPhoto();
    });
  }

  _createCard() {
    this._htmlElement = Card._template.cloneNode(true).children[0];

    this._htmlElement.querySelector(".card__text").textContent = this._name;
    this._htmlElement.querySelector(".card__image").src = this._link;
    this._htmlElement.querySelector(".card__image").alt = this._name;
    this._setListeners(this._htmlElement);

    return this._htmlElement;
  }

  renderCard() {
    this._card = this._createCard();
    if (this._method === "append") {
      Card._container.append(this._card);
    } else {
      Card._container.prepend(this._card);
    }
  }
}
