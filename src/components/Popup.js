export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }
    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _handleClickOverlay = (event) => {
        if (event.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('click', this._handleClickOverlay);
    }
}