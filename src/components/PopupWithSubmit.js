import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popup.querySelector('.popup__button');
        this._submitButtonDefaultText = this._submitButton.textContent;
    }

    setNewButtonText(newButtonText) {
        this._submitButton.textContent = newButtonText;
    }

    returnDefaultButtonText() {
        this._submitButton.value = this._submitButtonDefaultText;
    }

    _formSumbit = (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._card);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._formSumbit);
    }

    removeEventListeners() {
        super.removeEventListeners();
        this._form.removeEventListener('submit', this._formSumbit);
    }

    //при открытии попапа принимаем объект текущей карточки
    open(card) {
        this._card = card;
        super.open();
    }
}