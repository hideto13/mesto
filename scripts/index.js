const popupOpenButtonElement = document.querySelector('.profile__edit-button')
const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = popupElement.querySelector('.popup__close')
const profileTitleElement = document.querySelector('.profile__title')
const profileSubtitleElement = document.querySelector('.profile__subtitle')
const popupNameInputElement = popupElement.querySelector('.popup__name-input')
const popupTextInputElement = popupElement.querySelector('.popup__text-input')
const popupSubmitButtonElement = popupElement.querySelector('.popup__submit-button')

const togglePopupVisibility = function() {
  popupElement.classList.toggle('popup_opened')
}

const closePopupByClickOnOverlay = function(event) {
  if (event.target === event.currentTarget) {
    togglePopupVisibility()
  }
}

const formSubmitHandler = function(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = popupNameInputElement.value
  profileSubtitleElement.textContent = popupTextInputElement.value
  togglePopupVisibility()
}

popupOpenButtonElement.addEventListener('click', togglePopupVisibility)
popupCloseButtonElement.addEventListener('click', togglePopupVisibility)
popupElement.addEventListener('click', closePopupByClickOnOverlay)
popupSubmitButtonElement.addEventListener('click', formSubmitHandler)
