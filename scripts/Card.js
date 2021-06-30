export class Card {
    constructor(item, cardSelector) {
        this._name = item.name;
        this._link = item.link;
        this._cardSelector = cardSelector;
    }

    //генерация карточки
    _createCard() {
        const galleryItem = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__item')
            .cloneNode(true);

        return galleryItem;
    }

    //установка слушателей
    _setEventListeners() {
        this._galleryItem.querySelector('.elements__delete-button')
            .addEventListener('click', () => this._handleDelete());

        this._galleryItem.querySelector('.elements__like-button')
            .addEventListener('click', () => this._handleLike());

        this._galleryItem.querySelector('.elements__image')
            .addEventListener('click', () => this._handleImageClick());
    }

    //слушатели
    _handleDelete() {
        this._galleryItem.remove();
    }

    _handleLike() {
        this._galleryItem.querySelector('.elements__like-button')
            .classList.toggle('elements__like-button_active');
    }

    _handleImageClick() {
        const popupViewImage = document.querySelector('.popup_type_view-image');
        const popupImage = document.querySelector('.popup__image');
        const popupImageCaption = document.querySelector('.popup__image-caption');
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupImageCaption.textContent = this._name;
        openPopup(popupViewImage);
    }

    //создаем, заполняем контентом и возвращаем карточку
    renderItem() {
        const galleryList = document.querySelector('.elements__list');

        this._galleryItem = this._createCard();
        this._setEventListeners();
        this._galleryItem.querySelector('.elements__image').src = this._link;
        this._galleryItem.querySelector('.elements__image').alt = this._name;
        this._galleryItem.querySelector('.elements__title').textContent = this._name;

        return this._galleryItem;
    }
}

import { openPopup } from './index.js';