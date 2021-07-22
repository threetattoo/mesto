import '../pages/index.css';

import {
    initialCards,
    popupFormConfig,
    editProfileButton,
    profileName,
    profileJob,
    profileAvatar,
    popupEditAvatarElement,
    editAvatarButton,
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
        popupProfile.setNewButtonText('Сохранение...');
        api.changeUserInfo(data.personName, data.personJob)
            .finally(() => {
                popupProfile.close();
                popupProfile.returnDefaultButtonText();
            });
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

const editAvatarPopup = new PopupWithForm('.popup_type_edit-avatar', {
    'handleFormSubmit': (data) => {
        editAvatarPopup.setNewButtonText('Сохранение...');
        api.changeUserAvatar(data.avatarLink)
            .finally(() => {
                editAvatarPopup.close();
                editAvatarPopup.returnDefaultButtonText();
            });
    }
});

editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener('click', () => {
    editAvatarPopupValidator.hideAllInputErrors();
    editAvatarPopup.open();
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
        popupAddContent.close();
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
const editAvatarPopupValidator = new FormValidator(popupFormConfig, popupEditAvatarElement);
editAvatarPopupValidator.enableValidation();

const api = new Api({
    baseUrl,
    token
});

//const cards = api.getInitialCards();

//Получаем информацию о пользователе
api.getUserInfo().then((data => {
    profileName.textContent = data.name;
    profileJob.textContent = data.about;
    profileAvatar.src = data.avatar;
}));

//Получаем карточки с сервера
api.getInitialCards().then((cards) => {
    console.log(cards);
});