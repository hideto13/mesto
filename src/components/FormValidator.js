export class FormValidator {
  constructor(params, form) {
    this._params = params;
    this._form = form;
    this._button = this._form.querySelector(this._params.submitButtonSelector);
    this._inputs = Array.from(this._form.querySelectorAll(this._params.inputSelector));
  }

  _toggleButton() {
    this._isFormInvalid = !this._form.checkValidity();
    this._button.disabled = this._isFormInvalid;
    this._button.classList.toggle(this._params.inactiveButtonClass, this._isFormInvalid);
  }

  _handleFieldValidation(evt) {
    this._element = evt.target;
    this._errorContainer = this._form.querySelector(`#${this._element.id}-error`);
    this._element.classList.toggle(
      this._params.inputErrorClass,
      !this._element.validity.valid
    );
    this._errorContainer.textContent = this._element.validationMessage;
  }

  _addListenersToInput(input) {
    input.addEventListener("input", (evt) => this._handleFieldValidation(evt));
  }

  _hideError(input) {
    input.classList.remove(this._params.inputErrorClass);
    this._errorContainer = this._form.querySelector(`#${input.id}-error`);
    this._errorContainer.textContent = null;
  }

  enableValidation = () => {
    this._inputs.forEach((input) => this._addListenersToInput(input));
    this._form.addEventListener("input", () => this._toggleButton());
    this._toggleButton();
  };

  resetValidation() {
    this._toggleButton();
    this._inputs.forEach((input) => this._hideError(input));
  }
}
