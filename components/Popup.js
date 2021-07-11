export default class Popup {
    constructor(popup) {
        this._popup = document.querySelector(popup);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this.removeEventListeners();
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _handleClickButtonClose = () => {
        this.close();
    }

    _handleClickOverlay = (event) => {
        if (event.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        document.addEventListener('keyup', this._handleEscClose);
        this._closeButton.addEventListener('click', this._handleClickButtonClose);
        this._popup.addEventListener('click', this._handleClickOverlay);
    }

    removeEventListeners() {
        document.removeEventListener('keyup', this._handleEscClose);
        this._closeButton.removeEventListener('click', this._handleClickButtonClose);
        this._popup.removeEventListener('click', this._handleClickOverlay);
    }
}