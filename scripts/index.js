import {
    initialCards,
    popupFormConfig,
    popupProfile,
    editProfileButton,
    profileName,
    profileJob,
    editProfileForm,
    nameInput,
    jobInput,
    popupAddContent,
    pictureAddButton,
    pictureAddForm,
    galleryList,
    popups
} from '../constants/constants.js'

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

//информация о пользователе
const user = new UserInfo({
    'userName': profileName,
    'userJob': profileJob
});


const profilePopup = new PopupWithForm('.popup_type_profile', {
    'handleFormSubmit': (info) => {
        //console.log(info);
        user.setUserInfo(info.personname, info.personjob);
    }
});
profilePopup.setEventListeners();


editProfileButton.addEventListener('click', () => {
    const currentUserInfo = user.getUserInfo();
    nameInput.value = currentUserInfo.name;
    jobInput.value = currentUserInfo.job;
    profilePopup.open();
})

/*
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
    const item = { name: addPictureCaption.value, link: addPictureUrl.value };
    const card = new Card(item, '#gallery-item');
    addCard(card.renderItem());
    pictureAddForm.reset();
    closePopup(popupAddContent);
    popupAddContentValidator.enableValidation();
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
    popupProfileValidator.enableValidation();
});

editProfileForm.addEventListener('submit', handleSubmitProfile);
pictureAddForm.addEventListener('submit', addPictureHandler);

pictureAddButton.addEventListener('click', function() {
    openPopup(popupAddContent);
    popupAddContentValidator.enableValidation();
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
*/