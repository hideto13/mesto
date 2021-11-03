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
const popupProfileOpenButtonElement = document.querySelector('.profile__edit-button')
const popupCardOpenButtonElement = document.querySelector('.profile__add-button')
const popupProfileElement = document.querySelector('.popup_profile')
const popupCardElement = document.querySelector('.popup_card')
const popupProfileCloseButtonElement = popupProfileElement.querySelector('.popup__close')
const popupCardCloseButtonElement = popupCardElement.querySelector('.popup__close')
const profileTitleElement = document.querySelector('.profile__title')
const profileSubtitleElement = document.querySelector('.profile__subtitle')
const popupNameInputElement = popupProfileElement.querySelector('.popup__input_field_name')
const popupTextInputElement = popupProfileElement.querySelector('.popup__input_field_text')
const popupTitleInputElement = popupCardElement.querySelector('.popup__input_field_title')
const popupLinkInputElement = popupCardElement.querySelector('.popup__input_field_link')
const popupProfileFormElement = popupProfileElement.querySelector('.popup__form')
const popupCardFormElement = popupCardElement.querySelector('.popup__form')
const photoTemplate = document.querySelector('.photo_template');
const pageElement = document.querySelector('.page');

function main() {
	initialCards.forEach((element) => {
		renderCard(element.name, element.link);
	})

	popupProfileOpenButtonElement.addEventListener('click', openPopup)
  popupCardOpenButtonElement.addEventListener('click', openPopup)
  popupProfileCloseButtonElement.addEventListener('click', closePopup)
  popupCardCloseButtonElement.addEventListener('click', closePopup)
  popupProfileElement.addEventListener('click', closePopupByClickOnOverlay)
  popupCardElement.addEventListener('click', closePopupByClickOnOverlay)
  popupProfileFormElement.addEventListener('submit', formProfileSubmitHandler)
  popupCardFormElement.addEventListener('submit', formCardSubmitHandler)
}

function renderCard(name, link) {

	const htmlElement = cardTemplate.content.cloneNode(true);

	htmlElement.querySelector('.card__text').innerText = name;
  htmlElement.querySelector('.card__image').src = link;
  htmlElement.querySelector('.card__image').alt = name;

  setListener(htmlElement);

	cardsList.insertBefore(htmlElement, cardsList.firstChild);

}

function renderPhoto(name, link) {

	const htmlElement = photoTemplate.content.cloneNode(true);

	htmlElement.querySelector('.popup__description').innerText = name;
  htmlElement.querySelector('.popup__image').src = link;
  htmlElement.querySelector('.popup__image').alt = name;

  htmlElement.querySelector('.popup__close').addEventListener('click', function(event) {
    event.target.closest('.popup').classList.remove('popup_opened')
  })

	htmlElement.querySelector('.popup').classList.add('popup_opened')
  pageElement.appendChild(htmlElement);
}

const openPopup = function(event) {
  if (event.target === popupProfileOpenButtonElement) {
    popupNameInputElement.value = profileTitleElement.textContent
    popupTextInputElement.value = profileSubtitleElement.textContent
    popupProfileElement.classList.add('popup_opened')
  };
  if (event.target === popupCardOpenButtonElement) {
    popupTitleInputElement.value = null
    popupLinkInputElement.value = null
    popupCardElement.classList.add('popup_opened')
  };
}

const closePopup = function(event) {
  popupProfileElement.classList.remove('popup_opened')
  popupCardElement.classList.remove('popup_opened')
}

const closePopupByClickOnOverlay = function(event) {
  if (event.target === event.currentTarget) {
    closePopup()
  }
}

const formProfileSubmitHandler = function(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = popupNameInputElement.value
  profileSubtitleElement.textContent = popupTextInputElement.value
  closePopup()
}

const formCardSubmitHandler = function(evt) {
  evt.preventDefault();
  renderCard(popupTitleInputElement.value, popupLinkInputElement.value)
  closePopup()
}

const setListener = function(element) {
  element.querySelector('.card__like-button').addEventListener('click', handleLike);
  element.querySelector('.card__delete-button').addEventListener('click', handleDelete);
  element.querySelector('.card__image').addEventListener('click', photoHandler);
}

function handleLike(event) {
	event.target.classList.toggle('card__like-button_active');
}


function handleDelete(event) {
	event.target.closest('.card').remove();
}

const photoHandler = function(evt) {
  renderPhoto(evt.target.alt, evt.target.src)
}

main();
