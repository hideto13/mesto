import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, popupSelector, api }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._api = api;
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    this._submitButton = this._form.querySelector(".popup__submit-button");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submitButton.textContent = "Сохранение...";
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit.bind(this));
  }

  close() {
    super.close();
    this._form.reset();
  }
}
