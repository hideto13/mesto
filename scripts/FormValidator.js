export class FormValidator {
  constructor(params, form) {
    this._params = params;
    this._form = form;
  }

  _toggleButton(form, params) {
    this._button = form.querySelector(params.submitButtonSelector);
    this._isFormInvalid = !form.checkValidity();
    this._button.disabled = this._isFormInvalid;
    this._button.classList.toggle(params.inactiveButtonClass, this._isFormInvalid);
  }

  _handleFieldValidation(evt, params) {
    this._element = evt.target;
    this._errorContainer = document.querySelector(`#${this._element.id}-error`);
    this._element.classList.toggle(params.inputErrorClass, !this._element.validity.valid);
    this._errorContainer.textContent = this._element.validationMessage;
  }

  _handleFormInput(evt, params) {
    this._toggleButton(evt.currentTarget, params);
  }

  _addListenersToInput(input, params) {
    input.addEventListener("input", (evt) => this._handleFieldValidation(evt, params));
  }

  enableValidation = () => {
    this._inputs = Array.from(this._form.querySelectorAll(this._params.inputSelector));
    this._inputs.forEach((input) => this._addListenersToInput(input, this._params));
    this._form.addEventListener("input", (evt) => this._handleFormInput(evt, this._params));
    this._toggleButton(this._form, this._params);
  };
}
