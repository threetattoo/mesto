export default class Card {
    constructor(item, cardSelector, personalId, { handleCardClick, handleLikeClick, handleDeleteCard }) {
        this._name = item.name;
        this._link = item.link;
        this._cardId = item._id;
        this._likes = item.likes;
        this._ownerId = item.owner._id;
        this._personalId = personalId;
        this._cardSelector = cardSelector;

        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteCard = handleDeleteCard;
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

    //удаление карточки
    deleteCard() {
        this._deleteButton.closest('.elements__item').remove();
    }

    //выводим лайки у карточки
    showLikesCounter() {
        this._likesCounter.textContent = this._likes.length;
    }

    //устанавливаем актуальное количество лайков после клика
    setActualLikes(likes) {
        this._likes = likes;
    }

    //получаем cardId
    getCardId() {
        return this._cardId;
    }

    //определяем, лайкал ли карточку пользователь
    didUserLikedCard() {
        if (this._likes.some(like => { return like._id === this._personalId; })) {
            //console.log('yes');
            return true;
        } else {
            //console.log('no');
            return false;
        }
    }

    //делаем лайк активным
    setLikeStatus() {
        const likeIconStatus = this.didUserLikedCard();
        if (likeIconStatus) {
            //console.log('Надо ставить лайк');
            this._likeButton.classList.add('elements__like-button_active');
        } else {
            this._likeButton.classList.remove('elements__like-button_active');
        }
    }

    //создаем, заполняем контентом и возвращаем карточку
    renderItem() {
        this._galleryItem = this._createCard();
        this._cardTitle = this._galleryItem.querySelector('.elements__title');
        this._deleteButton = this._galleryItem.querySelector('.elements__delete-button');
        this._likeButton = this._galleryItem.querySelector('.elements__like-button');
        this._cardImage = this._galleryItem.querySelector('.elements__image');
        this._likesCounter = this._galleryItem.querySelector('.elements__like-counter');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

        this.showLikesCounter();
        this.setLikeStatus();

        //устанавливаем слушатели
        this._deleteButton.addEventListener('click', () => this._handleDeleteCard());
        this._likeButton.addEventListener('click', () => this._handleLikeClick());
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));

        //если карточка не принадлежит пользователю, удаляем иконку корзины
        if (this._ownerId !== this._personalId) {
            this._deleteButton.remove();
        }

        return this._galleryItem;
    }
}