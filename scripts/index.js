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
const popupOpenButtonElement = document.querySelector('.profile__edit-button')
const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = popupElement.querySelector('.popup__close')
const profileTitleElement = document.querySelector('.profile__title')
const profileSubtitleElement = document.querySelector('.profile__subtitle')
const popupNameInputElement = popupElement.querySelector('.popup__input_field_name')
const popupTextInputElement = popupElement.querySelector('.popup__input_field_text')
const popupFormElement = popupElement.querySelector('.popup__form')

function main() {
	initialCards.forEach((element) => {
		renderCard(element.name, element.link);
	})

	popupOpenButtonElement.addEventListener('click', openPopup)
  popupCloseButtonElement.addEventListener('click', closePopup)
  popupElement.addEventListener('click', closePopupByClickOnOverlay)
  popupFormElement.addEventListener('submit', formSubmitHandler)
}

function renderCard(name, link) {

	const htmlElement = cardTemplate.content.cloneNode(true);

	htmlElement.querySelector('.card__text').innerText = name;
  htmlElement.querySelector('.card__image').src = link;
  htmlElement.querySelector('.card__image').alt = name;

	cardsList.appendChild(htmlElement);

}

const openPopup = function() {
  popupNameInputElement.value = profileTitleElement.textContent
  popupTextInputElement.value = profileSubtitleElement.textContent
  popupElement.classList.add('popup_opened')
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened')
}

const closePopupByClickOnOverlay = function(event) {
  if (event.target === event.currentTarget) {
    closePopup()
  }
}

const formSubmitHandler = function(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = popupNameInputElement.value
  profileSubtitleElement.textContent = popupTextInputElement.value
  closePopup()
}

main();
