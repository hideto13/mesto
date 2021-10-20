const popupOpenButtonElement = document.querySelector('.profile__edit-button')
const popupElement = document.querySelector('.popup')
const popupCloseButtonElement = popupElement.querySelector('.popup__close')
const profileTitleElement = document.querySelector('.profile__title')
const profileSubtitleElement = document.querySelector('.profile__subtitle')
const popupNameInputElement = popupElement.querySelector('.popup__input_field_name')
const popupTextInputElement = popupElement.querySelector('.popup__input_field_text')
const popupFormElement = popupElement.querySelector('.popup__form')

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

popupOpenButtonElement.addEventListener('click', openPopup)
popupCloseButtonElement.addEventListener('click', closePopup)
popupElement.addEventListener('click', closePopupByClickOnOverlay)
popupFormElement.addEventListener('submit', formSubmitHandler)
