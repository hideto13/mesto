function enableValidation(params) {
  const forms = Array.from(document.querySelectorAll(params.formSelector));
  forms.forEach(form => addListenersToForm(form, params));
}

function addListenersToForm(form, params) {
  const inputs = Array.from(form.querySelectorAll(params.inputSelector));
  inputs.forEach(input => addListenersToInput(input, params));
  form.addEventListener('input', (evt) => handleFormInput(evt, params));
  toggleButton(form, params);
}

function addListenersToInput(input, params) {
  input.addEventListener('input', (evt) => handleFieldValidation(evt, params));
}

function handleFieldValidation(evt, params) {
  const element = evt.target;
  const errorContainer = document.querySelector(`#${element.id}-error`);
  element.classList.toggle(
      params.inputErrorClass,
      !element.validity.valid
  );

  errorContainer.textContent = element.validationMessage;
}


function toggleButton(form, params) {
  const button = form.querySelector(params.submitButtonSelector);
  const isFormInvalid = !form.checkValidity();
  button.disabled = isFormInvalid;
  button.classList.toggle(params.inactiveButtonClass, isFormInvalid);
}

function handleFormInput(evt, params) {
  toggleButton(evt.currentTarget, params);
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
});
