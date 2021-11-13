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
const photoTemplate = document.querySelector('.photo_template');
const pageElement = document.querySelector('.page');

function renderInitialCards() {
  initialCards.forEach((element) => {
    renderCard(element.name, element.link);
  });
}

function renderCard(name, link) {
  const htmlElement = createCard(name, link);
  cardsList.prepend(htmlElement);
}

function createCard(name, link) {
  const htmlElement = cardTemplate.content.cloneNode(true);

  htmlElement.querySelector('.card__text').innerText = name;
  htmlElement.querySelector('.card__image').src = link;
  htmlElement.querySelector('.card__image').alt = name;
  setListeners(htmlElement);

  return htmlElement;
}

function renderPhoto(event) {
  popupPhotoElement.querySelector('.popup__description').innerText = event.target.alt;
  popupPhotoElement.querySelector('.popup__image').src = event.target.src;
  popupPhotoElement.querySelector('.popup__image').alt = event.target.alt;

  openPopup(popupPhotoElement);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('keydown', closePopupByEscape)
}

function openProfilePopup() {
  popupNameInputElement.value = profileTitleElement.textContent;
  popupTextInputElement.value = profileSubtitleElement.textContent;
  openPopup(popupProfileElement);
}

function openCardPopup() {
  popupTitleInputElement.value = null;
  popupLinkInputElement.value = null;
  openPopup(popupCardElement);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', closePopupByEscape)
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

const closePopupByClickOnOverlay = function (event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
};

const closePopupByEscape = function (event) {
  const popup = document.querySelector('.popup_opened')
  if (event.key === 'Escape') {
    closePopup(popup)
  }
};

const formProfileSubmitHandler = function (evt) {
  evt.preventDefault();
  profileTitleElement.textContent = popupNameInputElement.value;
  profileSubtitleElement.textContent = popupTextInputElement.value;
  closePopup(popupProfileElement);
};

const formCardSubmitHandler = function (event) {
  event.preventDefault();
  renderCard(popupTitleInputElement.value, popupLinkInputElement.value);
  closePopup(popupCardElement);
};

const setListeners = function (element) {
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

function handleLike(event) {
  event.target.classList.toggle('card__like-button_active');
}

function handleDelete(event) {
  event.target.closest('.card').remove();
}

popupProfileOpenButtonElement.addEventListener('click', openProfilePopup);
popupCardOpenButtonElement.addEventListener('click', openCardPopup);
popupProfileCloseButtonElement.addEventListener('click', closeProfilePopup);
popupCardCloseButtonElement.addEventListener('click', closeCardPopup);
popupPhotoCloseButtonElement.addEventListener('click', closePhotoPopup);
popupPhotoElement.addEventListener('click', closePopupByClickOnOverlay);
popupProfileElement.addEventListener('click', closePopupByClickOnOverlay);
popupCardElement.addEventListener('click', closePopupByClickOnOverlay);
popupProfileFormElement.addEventListener('submit', formProfileSubmitHandler);
popupCardFormElement.addEventListener('submit', formCardSubmitHandler);

renderInitialCards();
