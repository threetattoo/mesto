export default class Card {
    constructor(item, cardSelector, handleCardClick) {
        this._name = item.name;
        this._link = item.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
            .addEventListener('click', (event) => this._handleLike(event));

        this._galleryItem.querySelector('.elements__image')
            .addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    //слушатели
    _handleDelete() {
        this._galleryItem.remove();
        this._galleryItem = null;
    }

    _handleLike(event) {
        event.target.classList.toggle('elements__like-button_active');
    }

    //создаем, заполняем контентом и возвращаем карточку
    renderItem() {
        this._galleryItem = this._createCard();
        const cardImage = this._galleryItem.querySelector('.elements__image');
        const cardTitle = this._galleryItem.querySelector('.elements__title');
        cardImage.src = this._link;
        cardImage.alt = this._name;
        cardTitle.textContent = this._name;
        this._setEventListeners();

        return this._galleryItem;
    }
}