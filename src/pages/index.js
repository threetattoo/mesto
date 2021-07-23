import '../pages/index.css';

import {
    personalId,
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
    gallery,
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
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

//информация о пользователе
const user = new UserInfo({
    'userName': profileName,
    'userJob': profileJob
});

//создаем попап профайла
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

//создаем попап редактирования аватара
const editAvatarPopup = new PopupWithForm('.popup_type_edit-avatar', {
    'handleFormSubmit': (data) => {
        profileAvatar.src = data.avatarLink;
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

//создаем попап просмотра полноразмерного фото
const popupWithImage = new PopupWithImage('.popup_type_view-image');

popupWithImage.setEventListeners();

//создаем попап добавления фото
const popupAddContent = new PopupWithForm('.popup_type_add-content', {
    handleFormSubmit: (item) => {
        popupAddContent.setNewButtonText('Сохранение...');
        api.addNewCard(item.name, item.link)
            .then((item) => {
                const card = new Card(item, '#gallery-item', personalId, {
                    'handleCardClick': () => {
                        popupWithImage.open(item.name, item.link);
                    },
                    'handleLikeClick': () => {
                        const likeStatus = card.didUserLikedCard();
                        const apiRequest = likeStatus ? api.dislikeCard(card.getCardId()) : api.likeCard(card.getCardId());
                        apiRequest.then((data) => {
                            card.setActualLikes(data.likes);
                            card.showLikesCounter();
                            card.setLikeStatus();
                        })
                    },
                    'handleDeleteCard': () => {
                        //передаем в попап подверждения удаления объект карточки
                        popupWithSubmit.open(card);
                    }
                });
                const renderedCard = card.renderItem();
                gallery.prepend(renderedCard);
                popupAddContent.close();
                popupAddContent.returnDefaultButtonText();
            });
    }
});

popupAddContent.setEventListeners();

pictureAddButton.addEventListener('click', () => {
    popupAddContentValidator.hideAllInputErrors();
    popupAddContent.open();
});

//создаем попап подтверждения удаления карточки
const popupWithSubmit = new PopupWithSubmit('.popup_type_card-delete-confirm', {
    'handleFormSubmit': (card) => {
        popupWithSubmit.setNewButtonText('Удаление...');
        api.deleteCard(card.getCardId())
            .then(res => {
                card.deleteCard();
            }).finally(() => {
                popupWithSubmit.close();
                popupWithSubmit.returnDefaultButtonText();
            });
    }
});

popupWithSubmit.setEventListeners();

//валидация форм попапов
const popupProfileValidator = new FormValidator(popupFormConfig, popupProfileElement);
popupProfileValidator.enableValidation();
const popupAddContentValidator = new FormValidator(popupFormConfig, popupAddContentElement);
popupAddContentValidator.enableValidation();
const editAvatarPopupValidator = new FormValidator(popupFormConfig, popupEditAvatarElement);
editAvatarPopupValidator.enableValidation();

//создаем объект api класса
const api = new Api({
    baseUrl,
    token
});

//Получаем информацию о пользователе
api.getUserInfo().then((data => {
    profileName.textContent = data.name;
    profileJob.textContent = data.about;
    profileAvatar.src = data.avatar;
}));

//Получаем карточки с сервера
api.getInitialCards().then((initialCards) => {
    //console.log(initialCards);
    renderInitialCards(initialCards);
});

//функция рендеринга карточек с сервера
function renderInitialCards(initialCards) {
    const galleryCardsList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, '#gallery-item', personalId, {
                'handleCardClick': () => {
                    popupWithImage.open(item.name, item.link);
                },
                'handleLikeClick': () => {
                    const likeStatus = card.didUserLikedCard();
                    const apiRequest = likeStatus ? api.dislikeCard(card.getCardId()) : api.likeCard(card.getCardId());
                    apiRequest.then((data) => {
                        card.setActualLikes(data.likes);
                        card.showLikesCounter();
                        card.setLikeStatus();
                    })
                },
                'handleDeleteCard': () => {
                    popupWithSubmit.open(card);
                }
            });
            const renderedCard = card.renderItem();
            galleryCardsList.addItem(renderedCard);
        }
    }, galleryList);
    galleryCardsList.renderItems();
}

//api.deleteCard('60f94b29f093050054c1dd9a');