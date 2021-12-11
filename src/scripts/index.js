import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'
import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'

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
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
const popupNameInputElement = popupProfileElement.querySelector('.popup__input_field_name');
const popupTextInputElement = popupProfileElement.querySelector('.popup__input_field_text');
const popupProfileFormElement = popupProfileElement.querySelector('.popup__form');
const popupCardFormElement = popupCardElement.querySelector('.popup__form');
const cardTemplate = document.querySelector(".card_template").content;
const cardContainer = document.querySelector(".cards__list");

const profileFormValidator = new FormValidator(params, popupProfileFormElement);
const cardFormValidator = new FormValidator(params, popupCardFormElement);

const profilePopup = new PopupWithForm({
  handleFormSubmit: ({ name, text }) => {
    profileTitleElement.textContent = name;
    profileSubtitleElement.textContent = text;
    profilePopup.close();
  },
  selector: popupProfileElement
});

const cardPopup = new PopupWithForm( {
  handleFormSubmit: ({ title, link }) => {
    const card = createCard(title, link);
    cardsList.addItem(card, 'prepend')
    cardPopup.close();
  },
  selector: popupCardElement
} );

const photoPopup = new PopupWithImage(popupPhotoElement);

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
      const card = createCard(item.name, item.link);
      cardsList.addItem(card, 'append');
    },
  },
  cardContainer
);

function openProfilePopup() {
  popupNameInputElement.value = profileTitleElement.textContent;
  popupTextInputElement.value = profileSubtitleElement.textContent;
  profileFormValidator.resetValidation();
  profilePopup.open();
}

function openCardPopup() {
  popupCardFormElement.reset();
  cardFormValidator.resetValidation();
  cardPopup.open();
}

function createCard(name, link) {
  return new Card(name, link, cardTemplate, handleCardClick).createCard()
}

function handleCardClick(name, link) {
  photoPopup.open(name, link);
}

popupProfileOpenButtonElement.addEventListener("click", openProfilePopup);
popupCardOpenButtonElement.addEventListener("click", openCardPopup);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

profilePopup.setEventListeners();
photoPopup.setEventListeners();
cardPopup.setEventListeners();

cardsList.renderItems();
