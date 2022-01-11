import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { params } from "../utils/constants.js";

const popupProfileOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupCardOpenButtonElement = document.querySelector(
  ".profile__add-button"
);
const popupAvatarOpenButtonElement = document.querySelector(
  ".profile__avatar-button"
);
const popupProfileElement = document.querySelector(".popup_profile");
const popupCardElement = document.querySelector(".popup_card");
const popupAvatarElement = document.querySelector(".popup_avatar");
const popupNameInputElement = popupProfileElement.querySelector(
  ".popup__input_field_name"
);
const popupTextInputElement = popupProfileElement.querySelector(
  ".popup__input_field_text"
);
const popupProfileFormElement =
  popupProfileElement.querySelector(".popup__form");
const popupCardFormElement = popupCardElement.querySelector(".popup__form");
const popupAvatarFormElement = popupAvatarElement.querySelector(".popup__form");
const popupProfileSubmitButton = popupProfileElement.querySelector(
  ".popup__submit-button"
);
const popupCardSubmitButton = popupCardElement.querySelector(
  ".popup__submit-button"
);
const popupAvatarSubmitButton = popupAvatarElement.querySelector(
  ".popup__submit-button"
);
const cardTemplate = document.querySelector(".card_template").content;
const cardContainer = document.querySelector(".cards__list");

const profileFormValidator = new FormValidator(params, popupProfileFormElement);
const cardFormValidator = new FormValidator(params, popupCardFormElement);
const avatarFormValidator = new FormValidator(params, popupAvatarFormElement);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-33",
  headers: {
    authorization: "f7bab5a6-9ad0-4af8-99cf-913958ad451d",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  name: ".profile__title",
  text: ".profile__subtitle",
  avatar: ".profile__image",
  getUserInfo: getUserInfo,
  setPopupUserInfo: setPopupUserInfo,
  setUserInfo: setUserInfo,
  setAvatar: setAvatar,
});

const profilePopup = new PopupWithForm({
  handleFormSubmit: (inputs) => {
    userInfo.setUserInfo(inputs);
    popupProfileSubmitButton.textContent = "Сохранить";
  },
  popupSelector: ".popup_profile",
});

const avatarPopup = new PopupWithForm({
  handleFormSubmit: (input) => {
    userInfo.setAvatar(input.avatar);
    popupAvatarSubmitButton.textContent = "Сохранить";
  },
  popupSelector: ".popup_avatar",
});

const cardPopup = new PopupWithForm({
  handleFormSubmit: ({ title, link }) => {
    api
      .addCard(title, link)
      .then((item) => {
        const card = createCard(
          item.name,
          item.link,
          item.likes,
          item._id,
          item.owner
        );
        cardsList.addItem(card, "prepend");
        cardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupCardSubmitButton.textContent = "Создать";
      });
  },
  popupSelector: ".popup_card",
});

const photoPopup = new PopupWithImage(".popup_photo");

const deletePopup = new PopupWithConfirmation(".popup_delete");

const cardsList = new Section(
  {
    getInitialCards: getInitialCards,
    renderer: (name, link, likes, id, owner) => {
      const card = createCard(name, link, likes, id, owner);
      cardsList.addItem(card, "append");
    },
  },
  cardContainer
);

function getInitialCards() {
  api
    .getInitialCards()
    .then((items) => this.renderItems(items))
    .catch((err) => console.log(err));
}

function handleLike(id) {
  api
    .addLike(id)
    .then((info) => this.switchLike(info))
    .catch((err) => console.log(err));
}

function handleDislike(id) {
  api
    .deleteLike(id)
    .then((info) => this.switchDislike(info))
    .catch((err) => console.log(err));
}

function handleDelete(id) {
  api
    .deleteCard(id)
    .then(() => this.deleteCard())
    .catch((err) => console.log(err));
}

function addDeleteButton() {
  api
    .getUserInfo()
    .then((info) => this.setDeleteButton(info))
    .catch((err) => console.log(err));
}

function getIsLikedByUser() {
  api
    .getUserInfo()
    .then((info) => this.setInitialLike(info))
    .catch((err) => console.log(err));
}

function getUserInfo() {
  api
    .getUserInfo()
    .then((info) => {
      this.handleUserInfo(info);
      this.handleAvatar(info);
    })
    .catch((err) => console.log(err));
}

function setPopupUserInfo(nameInputElement, textInputElement) {
  api
    .getUserInfo()
    .then((info) =>
      this.handlePopupUserInfo(info, nameInputElement, textInputElement)
    )
    .catch((err) => console.log(err));
}

function setUserInfo({ name, text }) {
  api
    .setUserInfo(name, text)
    .then((info) => {
      this.handleUserInfo(info);
      profilePopup.close();
    })
    .catch((err) => console.log(err));
}

function setAvatar(avatar) {
  api
    .setAvatar(avatar)
    .then((info) => {
      this.handleAvatar(info);
      avatarPopup.close();
    })
    .catch((err) => console.log(err));
}

function openProfilePopup() {
  userInfo.setPopupUserInfo(popupNameInputElement, popupTextInputElement);
  profileFormValidator.resetValidation();
  profilePopup.open();
}

function openCardPopup() {
  cardFormValidator.resetValidation();
  cardPopup.open();
}

function openAvatarPopup() {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
}

function createCard(name, link, likes, id, owner) {
  return new Card(name, link, likes, id, owner, cardTemplate, deletePopup, {
    handleCardClick: (name, link) => {
      photoPopup.open(name, link);
    },
    handleLike: handleLike,
    handleDislike: handleDislike,
    handleDelete: handleDelete,
    addDeleteButton: addDeleteButton,
    getIsLikedByUser: getIsLikedByUser,
  }).createCard();
}

popupProfileOpenButtonElement.addEventListener("click", openProfilePopup);
popupCardOpenButtonElement.addEventListener("click", openCardPopup);
popupAvatarOpenButtonElement.addEventListener("click", openAvatarPopup);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

profilePopup.setEventListeners();
photoPopup.setEventListeners();
cardPopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

Promise.all([userInfo.getUserInfo(), cardsList.getInitialCards()]);
