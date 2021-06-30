const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupFormConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//попап редактирования профиля пользователя
const popupProfile = document.querySelector('.popup_type_profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__subtitle');
const editProfileForm = document.querySelector('.popup__form_profile');
const nameInput = editProfileForm.querySelector('#personname');
const jobInput = editProfileForm.querySelector('#personjob');
//попап добавления фотографий
const popupAddContent = document.querySelector('.popup_type_add-content');
const pictureAddButton = document.querySelector('.profile__add-button');
const pictureAddForm = document.querySelector('.popup__form_place');
//галерея
const galleryList = document.querySelector('.elements__list');
//попапы
const popups = document.querySelectorAll('.popup');


export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', handleEscapeClose);
}


function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', handleEscapeClose);
}

function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupProfile);
}

function handleSubmitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

function addPictureHandler(evt) {
    evt.preventDefault();
    const addPictureCaption = popupAddContent.querySelector('#placename');
    const addPictureUrl = popupAddContent.querySelector('#picturelink');
    const submitButton = pictureAddForm.querySelector('.popup__button');

    const item = { name: addPictureCaption.value, link: addPictureUrl.value };
    const card = new Card(item, '#gallery-item');
    addCard(card.renderItem());
    pictureAddForm.reset();
    closePopup(popupAddContent);
    popupAddContentValidator._hideAllInputErrors();
};

//закрытие попапа при нажатии кнопки escape
function handleEscapeClose(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//добавление карточки в DOM
function addCard(galleryItem) {
    galleryList.prepend(galleryItem);
}

//добавляем карточки из initialCards
initialCards.forEach((item) => {
    const card = new Card(item, '#gallery-item');
    addCard(card.renderItem());
});

editProfileButton.addEventListener('click', () => {
    openProfilePopup();
    popupProfileValidator._hideAllInputErrors();
});

editProfileForm.addEventListener('submit', handleSubmitProfile);
pictureAddForm.addEventListener('submit', addPictureHandler);
pictureAddButton.addEventListener('click', function() {
    openPopup(popupAddContent);
});

//обработка закрытия попапов при клике по оверлею и кнопке закрытия
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
})

//валидация форм попапов
const popupProfileValidator = new FormValidator(popupFormConfig, popupProfile);
const popupAddContentValidator = new FormValidator(popupFormConfig, popupAddContent);

popupProfileValidator.enableValidation();
popupAddContentValidator.enableValidation();

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';