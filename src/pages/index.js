import '../pages/index.css';

import {
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
    'userJob': profileJob,
    'userAvatar': profileAvatar
});

//создаем попап профайла
const popupProfile = new PopupWithForm('.popup_type_profile', {
    'handleFormSubmit': (data) => {
        api.changeUserInfo(data.personName, data.personJob)
            .then((data) => {
                const userInfo = user.getUserInfo(data);
                user.setUserInfo(userInfo);
                popupProfile.setNewButtonText('Сохранение...');
                popupProfile.close();
            })
            .catch(error => handleApiError(error))
            .finally(() => {
                popupProfile.returnDefaultButtonText();
            });
    }
});

popupProfile.setEventListeners();

//обработка ошибок апи
function handleApiError(error) {
    console.log(error);
}

//навешиваем слушатель на кнопку редактирования профайла
editProfileButton.addEventListener('click', () => {
    api.getUserInfo()
        .then((data) => {
            const currentUserInfo = user.getUserInfo(data);
            nameInput.value = currentUserInfo.name;
            jobInput.value = currentUserInfo.about;
            popupProfile.open();
        })
        .catch(error => handleApiError(error))
        .finally(() => {
            popupProfileValidator.hideAllInputErrors();
        })
});

//создаем попап редактирования аватара
const editAvatarPopup = new PopupWithForm('.popup_type_edit-avatar', {
    'handleFormSubmit': (data) => {
        api.changeUserAvatar(data.avatarLink)
            .then((data) => {
                const userInfo = user.getUserInfo(data);
                user.setUserInfo(userInfo);
                editAvatarPopup.setNewButtonText('Сохранение...');
                editAvatarPopup.close();
            })
            .catch(error => handleApiError(error))
            .finally(() => {
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
                console.log(item);
                galleryCardsList.renderItem(item, item.owner._id);
                popupAddContent.close();
            })
            .catch(error => handleApiError(error))
            .finally(() => {
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
            .then((res) => {
                card.deleteCard();
                popupWithSubmit.close();
            })
            .catch(error => handleApiError(error))
            .finally(() => {
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

const galleryCardsList = new Section({
    'renderer': (item, personalId) => {
        galleryCardsList.addItem(createCard(item, personalId));
    }
}, galleryList);

function createCard(item, personalId) {
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
    return renderedCard;
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfo, initialCards]) => {
        user.setUserInfo(userInfo);
        const personalId = user.getUserInfo(userInfo).id;
        initialCards.forEach((item) => {
            galleryCardsList.renderItem(item, personalId);
        })
    })
    .catch(error => handleApiError(error));