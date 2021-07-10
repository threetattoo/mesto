import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
    }

    open(item) {
        super.open();
        this._popupImage.src = item.link;
        this._popupImage.alt = item.name;
        this._popupImageCaption.textContent = item.name;
    }
}