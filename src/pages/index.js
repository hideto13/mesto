import './index.css';
import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'

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
const popupNameInputElement = popupProfileElement.querySelector('.popup__input_field_name');
const popupTextInputElement = popupProfileElement.querySelector('.popup__input_field_text');
const popupProfileFormElement = popupProfileElement.querySelector('.popup__form');
const popupCardFormElement = popupCardElement.querySelector('.popup__form');
const cardTemplate = document.querySelector(".card_template").content;
const cardContainer = document.querySelector(".cards__list");

const profileFormValidator = new FormValidator(params, popupProfileFormElement);
const cardFormValidator = new FormValidator(params, popupCardFormElement);

const userInfo = new UserInfo({ name: popupNameInputElement.value, text: popupTextInputElement.value });

const profilePopup = new PopupWithForm({
  handleFormSubmit: (inputs) => {
    userInfo.setUserInfo(inputs);
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
  const {name, text} = userInfo.getUserInfo();
  popupNameInputElement.value = name;
  popupTextInputElement.value = text;
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
