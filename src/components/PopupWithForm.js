import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._formInputs = Array.from(this._form.querySelectorAll('.popup__input'));
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._formValues = {};
        this._formInputs.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        console.log(this._formValues);
        return this._formValues;
    }

    _formSumbit = (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._formSumbit);
    }

    removeEventListeners() {
        super.removeEventListeners();
        this._form.removeEventListener('submit', this._formSumbit);
    }

    close() {
        super.close();
        this._form.reset();
    }
}