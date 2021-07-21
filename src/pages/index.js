import '../pages/index.css';

import {
    initialCards,
    popupFormConfig,
    editProfileButton,
    profileName,
    profileJob,
    nameInput,
    jobInput,
    pictureAddButton,
    galleryList,
    popupProfileElement,
    popupAddContentElement,
    baseUrl,
    token
} from '../constants/constants.js'

import Api from '../components/Api.js';
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

//создаем попап профайла, передаем коллбэк handleFormSubmit
const popupProfile = new PopupWithForm('.popup_type_profile', {
    'handleFormSubmit': (data) => {
        user.setUserInfo(data.personName, data.personJob);
    }
});

popupProfile.setEventListeners();

editProfileButton.addEventListener('click', () => {
    const currentUserInfo = user.getUserInfo();
    nameInput.value = currentUserInfo.name;
    jobInput.value = currentUserInfo.job;
    popupProfileValidator.hideAllInputErrors();
    popupProfile.open();
});

const popupWithImage = new PopupWithImage('.popup_type_view-image');

popupWithImage.setEventListeners();

function createCard(item) {
    const card = new Card(item, '#gallery-item', () => popupWithImage.open(item.name, item.link));
    const renderedCard = card.renderItem();
    galleryCardsList.addItem(renderedCard);
}

const galleryCardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        createCard(item);
    }
}, galleryList);

galleryCardsList.renderItems();

const popupAddContent = new PopupWithForm('.popup_type_add-content', {
    handleFormSubmit: (item) => {
        createCard(item);
    }
});

popupAddContent.setEventListeners();

pictureAddButton.addEventListener('click', () => {
    popupAddContentValidator.hideAllInputErrors();
    popupAddContent.open();
});

//валидация форм попапов
const popupProfileValidator = new FormValidator(popupFormConfig, popupProfileElement);
popupProfileValidator.enableValidation();
const popupAddContentValidator = new FormValidator(popupFormConfig, popupAddContentElement);
popupAddContentValidator.enableValidation();

const api = new Api({
    baseUrl,
    token
});

api.getInitialCards();
/*
fetch('https://mesto.nomoreparties.co/v1/cohort-26/cards', {
        headers: {
            authorization: '6e25370a-d860-45cc-8100-dac5b577cde2'
        }
    })
    .then(res => res.json())
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(`Ошибка - ${err.status}`);
    });
*/