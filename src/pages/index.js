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
    popupAddContentElement
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

//создаем попап профайла, передаем коллбэк handleFormSubmit
const popupProfile = new PopupWithForm('.popup_type_profile', {
    'handleFormSubmit': (data) => {
        //сonsole.log(data);
        user.setUserInfo(data.personname, data.personjob);
    }
});

editProfileButton.addEventListener('click', () => {
    const currentUserInfo = user.getUserInfo();
    nameInput.value = currentUserInfo.name;
    jobInput.value = currentUserInfo.job;
    popupProfile.open();
    popupProfile.setEventListeners();
    popupProfileValidator.enableValidation();
});

const popupWithImage = new PopupWithImage('.popup_type_view-image');

const galleryCardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#gallery-item', {
            handleCardClick: (name, link) => {
                popupWithImage.open(name, link);
            }
        });
        const renderedCard = card.renderItem();
        galleryCardsList.addItem(renderedCard);
    }
}, galleryList);

//console.log(galleryCardsList);
galleryCardsList.renderItems();

const popupAddContent = new PopupWithForm('.popup_type_add-content', {
    'handleFormSubmit': (item) => {
        const card = new Card(item, '#gallery-item', {
            handleCardClick: (name, link) => {
                popupWithImage.open(name, link);
            }
        });
        const renderedCard = card.renderItem();
        galleryCardsList.addItem(renderedCard);
    }
});

pictureAddButton.addEventListener('click', () => {
    popupAddContent.open();
    popupAddContent.setEventListeners();
    popupAddContentValidator.enableValidation();
});

//валидация форм попапов
const popupProfileValidator = new FormValidator(popupFormConfig, popupProfileElement);
const popupAddContentValidator = new FormValidator(popupFormConfig, popupAddContentElement);