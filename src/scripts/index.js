import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'
import { Section } from './Section.js'

const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupProfileOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCardOpenButtonElement = document.querySelector('.profile__add-button');
const popupProfileElement = document.querySelector('.popup_profile');
const popupCardElement = document.querySelector('.popup_card');
const popupPhotoElement = document.querySelector('.popup_photo');
const popupProfileCloseButtonElement = popupProfileElement.querySelector('.popup__close');
const popupCardCloseButtonElement = popupCardElement.querySelector('.popup__close');
const popupPhotoCloseButtonElement = popupPhotoElement.querySelector('.popup__close');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
const popupNameInputElement = popupProfileElement.querySelector('.popup__input_field_name');
const popupTextInputElement = popupProfileElement.querySelector('.popup__input_field_text');
const popupTitleInputElement = popupCardElement.querySelector('.popup__input_field_title');
const popupLinkInputElement = popupCardElement.querySelector('.popup__input_field_link');
const popupProfileFormElement = popupProfileElement.querySelector('.popup__form');
const popupCardFormElement = popupCardElement.querySelector('.popup__form');
const photoPopup = document.querySelector(".popup_photo");
const cardTemplate = document.querySelector(".card_template").content;
const cardContainer = document.querySelector(".cards__list");

const profileFormValidator = new FormValidator(params, popupProfileFormElement);
const cardFormValidator = new FormValidator(params, popupCardFormElement);

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
}

function closeProfilePopup() {
  closePopup(popupProfileElement);
}

function closeCardPopup() {
  closePopup(popupCardElement);
}

function closePhotoPopup() {
  closePopup(popupPhotoElement);
}

function closePopupByClickOnOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

function closePopupByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
}

function openProfilePopup() {
  popupNameInputElement.value = profileTitleElement.textContent;
  popupTextInputElement.value = profileSubtitleElement.textContent;
  profileFormValidator.resetValidation();
  openPopup(popupProfileElement);
}

function openCardPopup() {
  popupCardFormElement.reset();
  cardFormValidator.resetValidation();
  openPopup(popupCardElement);
}

function createCard(name, link) {
  return new Card(name, link, cardTemplate, handleCardClick).createCard()
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
      const card = createCard(item.name, item.link);
      cardsList.addItem(card, 'append');
    },
  },
  cardContainer
);

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = popupNameInputElement.value;
  profileSubtitleElement.textContent = popupTextInputElement.value;
  closePopup(popupProfileElement);
}

function handleFormCardSubmit(event) {
  event.preventDefault();
  const card = createCard(popupTitleInputElement.value, popupLinkInputElement.value);
  cardsList.addItem(card, 'prepend')
  closePopup(popupCardElement);
}

function handleCardClick(name, link) {
  photoPopup.querySelector(".popup__description").textContent = name;
  photoPopup.querySelector(".popup__image").src = link;
  photoPopup.querySelector(".popup__image").alt = name;

  openPopup(photoPopup);
}

popupProfileOpenButtonElement.addEventListener("click", openProfilePopup);
popupCardOpenButtonElement.addEventListener("click", openCardPopup);
popupProfileCloseButtonElement.addEventListener("click", closeProfilePopup);
popupCardCloseButtonElement.addEventListener("click", closeCardPopup);
popupPhotoCloseButtonElement.addEventListener("click", closePhotoPopup);
popupPhotoElement.addEventListener("click", closePopupByClickOnOverlay);
popupProfileElement.addEventListener("click", closePopupByClickOnOverlay);
popupCardElement.addEventListener("click", closePopupByClickOnOverlay);
popupProfileFormElement.addEventListener("submit", handleFormProfileSubmit);
popupCardFormElement.addEventListener("submit", handleFormCardSubmit);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

cardsList.renderItems();
