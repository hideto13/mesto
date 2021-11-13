function enableValidation (params){
  const forms = Array.from(document.querySelectorAll(params.formSelector));
  forms.forEach(form => addListenersToForm(form, params));
}


function addListenersToForm(form, params) {
	const inputs = Array.from(form.querySelectorAll(params.inputSelector));

	inputs.forEach(input => addListenersToInput(input, params));

	form.addEventListener('submit', handleFormSubmit);

    form.addEventListener('input', handleFormInput);
    toggleButton(form);

}


function addListenersToInput(input, params) {
	input.addEventListener('input', handleFieldValidation);
}

function handleFieldValidation(evt) {
	const element = evt.target;
	const errorContainer = document.querySelector(`#${element.id}-error`);
	element.setCustomValidity('');

	element.classList.toggle(
		'popup__input_state_invalid',
		!element.validity.valid
	);


	errorContainer.textContent = element.validationMessage;
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
