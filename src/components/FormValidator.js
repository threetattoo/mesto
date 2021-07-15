export default class FormValidator {
    constructor(config, currentPopup) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._popup = currentPopup;
        this._form = this._popup.querySelector(this._formSelector);
        this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    }

    _handleFormInput(event) {
        const input = event.target;
        this._checkInputValidity(input);
        this._toggleSubmitButtonClass();
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
        } else {
            this._hideInputError(input);
        }
    }

    _toggleSubmitButtonClass() {
        const submitButton = this._form.querySelector(this._submitButtonSelector);
        const isFormValid = this._form.checkValidity();
        if (isFormValid) {
            submitButton.classList.remove(this._inactiveButtonClass);
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.classList.add(this._inactiveButtonClass);
            submitButton.setAttribute('disabled', 'disabled');
        }
    }

    _showInputError(input, inputErrorMessage) {
        const showErrorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.add(this._inputErrorClass);
        showErrorElement.classList.add(this._errorClass);
        showErrorElement.textContent = inputErrorMessage;
    }

    _hideInputError(input) {
        const showErrorElement = this._form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._inputErrorClass);
        showErrorElement.classList.remove(this._errorClass);
        showErrorElement.textContent = "";
    }

    _setEventListeners() {
        this._inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleSubmitButtonClass();
            });
        });
    }

    //проходим по всем инпутам и сбрасываем ошибки
    hideAllInputErrors() {
        this._inputs.forEach((input) => {
            this._hideInputError(input);
        });
        this._toggleSubmitButtonClass();
    }

    enableValidation() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
        });

        this._setEventListeners();
    }
}