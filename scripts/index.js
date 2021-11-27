import { FormValidator } from './FormValidator.js'

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

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.card_template');
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

const profileFormValidator = new FormValidator(params, popupProfileFormElement);
const cardFormValidator = new FormValidator(params, popupCardFormElement);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation()

function handleLike(event) {
  event.target.classList.toggle('card__like-button_active');
}

function handleDelete(event) {
  event.target.closest('.card').remove();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape)
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
};

function closePopupByEscape(popup, event) {
  if (event.key === 'Escape') {
      closePopup(popup)
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (event) => closePopupByEscape(popup, event))
}

function openProfilePopup() {
  popupNameInputElement.value = profileTitleElement.textContent;
  popupTextInputElement.value = profileSubtitleElement.textContent;
  openPopup(popupProfileElement);
}

function openCardPopup() {
  popupCardFormElement.reset();
  cardFormValidator.enableValidation();
  openPopup(popupCardElement);
}

function renderPhoto(event) {
  popupPhotoElement.querySelector('.popup__description').textContent = event.target.alt;
  popupPhotoElement.querySelector('.popup__image').src = event.target.src;
  popupPhotoElement.querySelector('.popup__image').alt = event.target.alt;

  openPopup(popupPhotoElement);
}

function setListeners(element) {
  element
      .querySelector('.card__like-button')
      .addEventListener('click', handleLike);
  element
      .querySelector('.card__delete-button')
      .addEventListener('click', handleDelete);
  element
      .querySelector('.card__image')
      .addEventListener('click', renderPhoto);
};

function createCard(name, link) {
  const htmlElement = cardTemplate.content.cloneNode(true);

  htmlElement.querySelector('.card__text').textContent = name;
  htmlElement.querySelector('.card__image').src = link;
  htmlElement.querySelector('.card__image').alt = name;
  setListeners(htmlElement);

  return htmlElement;
}

function renderCard(name, link, method) {
  const htmlElement = createCard(name, link);
  if (method === 'append') {
    cardsList.append(htmlElement);
  } else {
    cardsList.prepend(htmlElement);
  }
}

function renderInitialCards() {
  initialCards.forEach((element) => {
      renderCard(element.name, element.link, 'append');
  });
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = popupNameInputElement.value;
  profileSubtitleElement.textContent = popupTextInputElement.value;
  closePopup(popupProfileElement);
};

function handleFormCardSubmit(event) {
  event.preventDefault();
  renderCard(popupTitleInputElement.value, popupLinkInputElement.value, 'prepend');
  closePopup(popupCardElement);
};

popupProfileOpenButtonElement.addEventListener('click', openProfilePopup);
popupCardOpenButtonElement.addEventListener('click', openCardPopup);
popupProfileCloseButtonElement.addEventListener('click', closeProfilePopup);
popupCardCloseButtonElement.addEventListener('click', closeCardPopup);
popupPhotoCloseButtonElement.addEventListener('click', closePhotoPopup);
popupPhotoElement.addEventListener('click', closePopupByClickOnOverlay);
popupProfileElement.addEventListener('click', closePopupByClickOnOverlay);
popupCardElement.addEventListener('click', closePopupByClickOnOverlay);
popupProfileFormElement.addEventListener('submit', handleFormProfileSubmit);
popupCardFormElement.addEventListener('submit', handleFormCardSubmit);

renderInitialCards();
