function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach((form) => {
        toggleSubmitButtonClass(form, config);
        form.addEventListener('input', (event) => handleFormInput(event, config));
    });
}

function handleFormInput(event, config) {
    const input = event.target;
    const form = event.currentTarget;
    checkInputValidity(input, form, config);
    toggleSubmitButtonClass(form, config);
}

function checkInputValidity(input, form, config) {
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, config);
    } else {
        hideInputError(form, input, config);
    }
}

function toggleSubmitButtonClass(form, config) {
    const submitButton = form.querySelector(config.submitButtonSelector);
    const isFormValid = form.checkValidity();
    if (isFormValid) {
        submitButton.classList.remove(config.inactiveButtonClass);
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.classList.add(config.inactiveButtonClass);
        submitButton.setAttribute('disabled', 'disabled');
    }
}

function showInputError(form, input, inputErrorMessage, config) {
    const showErrorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    showErrorElement.classList.add(config.errorClass);
    showErrorElement.textContent = inputErrorMessage;
}

function hideInputError(form, input, config) {
    const showErrorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    showErrorElement.classList.remove(config.errorClass);
    showErrorElement.textContent = "";
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});