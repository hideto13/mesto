export class Card {
  constructor(
    name,
    link,
    likes,
    id,
    owner,
    templateSelector,
    deletePopup,
    {
      handleCardClick,
      handleLike,
      handleDislike,
      handleDelete,
      addDeleteButton,
      getIsLikedByUser,
    }
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = id;
    this._owner = owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    this._handleDelete = handleDelete;
    this._addDeleteButton = addDeleteButton;
    this._getIsLikedByUser = getIsLikedByUser;
    this._deletePopup = deletePopup;
    this._submitDeletePopup = document.querySelector(".popup_delete");
    this._submitDeleteButton = this._submitDeletePopup.querySelector(
      ".popup__submit-button"
    );
  }

  _toggleLike() {
    if (this._likeButton.classList.contains("card__like-button_active")) {
      this._handleDislike(this._id);
    } else {
      this._handleLike(this._id);
    }
  }

  _switchLike(info) {
    this._likeButton.classList.add("card__like-button_active");
    this._likes = info.likes;
    this._likeText.textContent = this._likes.length;
  }

  _switchDislike(info) {
    this._likeButton.classList.remove("card__like-button_active");
    this._likes = info.likes;
    this._likeText.textContent = this._likes.length;
  }

  _setInitialLike(info) {
    this._user = info._id;
    if (this._likes.map((like) => like._id).includes(this._user)) {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  _submitDelete() {
    this._deletePopup.open();
    this._submitDeleteButton.addEventListener("click", () => {
      this._handleDelete(this._id);
    });
  }

  _setListeners() {
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
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

    // if (this._likes.map((like) => like._id).includes(this._owner)) {
    //   this._likeButton.classList.add("card__like-button_active");
    // }

    // console.log(this._likes.map((like) => like._id));
    // this._ownId =

    this._addDeleteButton();
    this._getIsLikedByUser();
    this._setListeners();

    return this._card;
  }
}
