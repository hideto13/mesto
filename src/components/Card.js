export class Card {

  constructor(name, link, templateSelector, { handleCardClick }) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    this._card.remove();
  }

  _setListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  createCard() {
    this._card = this._templateSelector.cloneNode(true).children[0];


    this._cardImage = this._card.querySelector(".card__image");
    this._cardText = this._card.querySelector(".card__text");
    this._likeButton = this._card.querySelector(".card__like-button");
    this._deleteButton = this._card.querySelector(".card__delete-button");


    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setListeners();

    return this._card;
  }

}
