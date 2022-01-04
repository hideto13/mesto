import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { params, initialCards } from "../utils/constants.js";

const popupProfileOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupCardOpenButtonElement = document.querySelector(
  ".profile__add-button"
);
const popupProfileElement = document.querySelector(".popup_profile");
const popupCardElement = document.querySelector(".popup_card");
const popupNameInputElement = popupProfileElement.querySelector(
  ".popup__input_field_name"
);
const popupTextInputElement = popupProfileElement.querySelector(
  ".popup__input_field_text"
);
const popupProfileFormElement =
  popupProfileElement.querySelector(".popup__form");
const popupCardFormElement = popupCardElement.querySelector(".popup__form");
const cardTemplate = document.querySelector(".card_template").content;
const cardContainer = document.querySelector(".cards__list");

const profileFormValidator = new FormValidator(params, popupProfileFormElement);
const cardFormValidator = new FormValidator(params, popupCardFormElement);

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
  api: api,
});

const profilePopup = new PopupWithForm({
  handleFormSubmit: (inputs) => {
    userInfo.setUserInfo(inputs);
    profilePopup.close();
  },
  popupSelector: ".popup_profile",
});

const cardPopup = new PopupWithForm({
  handleFormSubmit: ({ title, link }) => {
    const card = createCard(title, link);
    cardsList.addItem(card, "prepend");
    cardPopup.close();
  },
  popupSelector: ".popup_card",
});

const photoPopup = new PopupWithImage(".popup_photo");

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item.name, item.link);
      cardsList.addItem(card, "append");
    },
  },
  cardContainer
);

function openProfilePopup() {
  userInfo.getUserInfo(popupNameInputElement, popupTextInputElement);
  // const { name, text } = userInfo.getUserInfo();
  // popupNameInputElement.value = name;
  // popupTextInputElement.value = text;
  profileFormValidator.resetValidation();
  profilePopup.open();
}

function openCardPopup() {
  cardFormValidator.resetValidation();
  cardPopup.open();
}

function createCard(name, link) {
  return new Card(name, link, cardTemplate, {
    handleCardClick: (name, link) => {
      photoPopup.open(name, link);
    },
  }).createCard();
}

popupProfileOpenButtonElement.addEventListener("click", openProfilePopup);
popupCardOpenButtonElement.addEventListener("click", openCardPopup);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

profilePopup.setEventListeners();
photoPopup.setEventListeners();
cardPopup.setEventListeners();

cardsList.renderItems();
userInfo.gettUserInfo();
