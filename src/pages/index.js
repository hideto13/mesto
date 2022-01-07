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
  api: api,
});

const profilePopup = new PopupWithForm({
  handleFormSubmit: (inputs) => {
    userInfo.setUserInfo(inputs);
    profilePopup.close();
    popupProfileSubmitButton.textContent = "Сохранить";
  },
  popupSelector: ".popup_profile",
});

const avatarPopup = new PopupWithForm({
  handleFormSubmit: (input) => {
    userInfo.setAvatar(input.avatar);
    avatarPopup.close();
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
        popupCardSubmitButton.textContent = "Создать";
      })
      .catch((err) => console.log(err));
  },
  popupSelector: ".popup_card",
  api: api,
});

const photoPopup = new PopupWithImage(".popup_photo");

const deletePopup = new PopupWithConfirmation(".popup_delete");

const cardsList = new Section(
  {
    items: api.getInitialCards(),
    renderer: (name, link, likes, id, owner) => {
      const card = createCard(name, link, likes, id, owner);
      cardsList.addItem(card, "append");
    },
  },
  cardContainer,
  api
);

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
  return new Card(
    name,
    link,
    likes,
    id,
    owner,
    cardTemplate,
    deletePopup,
    api,
    {
      handleCardClick: (name, link) => {
        photoPopup.open(name, link);
      },
    }
  ).createCard();
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

cardsList.renderItems();
userInfo.getUserInfo();
