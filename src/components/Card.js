export class Card {
  constructor(
    name,
    link,
    likes,
    id,
    owner,
    templateSelector,
    deletePopup,
    api,
    { handleCardClick }
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = id;
    this._owner = owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deletePopup = deletePopup;
    this._api = api;
    this._submitDeletePopup = document.querySelector(".popup_delete");
    this._submitDeleteButton = this._submitDeletePopup.querySelector(
      ".popup__submit-button"
    );
  }

  _handleLike() {
    if (this._likeButton.classList.contains("card__like-button_active")) {
      this._api
        .deleteLike(this._id)
        .then((info) => {
          this._likeButton.classList.remove("card__like-button_active");
          this._likes = info.likes;
          this._likeText.textContent = this._likes.length;
        })
        .catch((err) => console.log(err));
    } else {
      this._api
        .addLike(this._id)
        .then((info) => {
          this._likeButton.classList.add("card__like-button_active");
          this._likes = info.likes;
          this._likeText.textContent = this._likes.length;
        })
        .catch((err) => console.log(err));
    }
  }

  _handleDelete() {
    this._api
      .deleteCard(this._id)
      .then(() => {
        this._card.remove();
        this._deletePopup.close();
      })
      .catch((err) => console.log(err));
  }

  _submitDelete() {
    this._deletePopup.open();
    this._submitDeleteButton.addEventListener("click", () => {
      this._handleDelete();
    });
  }

  _setListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });
    this._deleteButton.addEventListener("click", () => {
      this._submitDelete();
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
    this._likeText = this._card.querySelector(".card__like-text");
    this._deleteButton = this._card.querySelector(".card__delete-button");

    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeText.textContent = this._likes.length;

    this._api
      .getUserInfo()
      .then((info) => {
        if (info._id === this._owner) {
          this._deleteButton.classList.add("card__delete-button_active");
        }
      })
      .catch((err) => console.log(err));

    this._setListeners();

    return this._card;
  }
}
