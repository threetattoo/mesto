export const popupFormConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const personalId = '5d507baa9cf66b222da492d9';
//попап редактирования профиля пользователя
export const popupProfileElement = document.querySelector('.popup_type_profile');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');
export const editAvatarButton = document.querySelector('.profile__button-edit-avatar');
export const popupEditAvatarElement = document.querySelector('.popup_type_edit-avatar');
export const editProfileForm = document.querySelector('.popup__form_profile');
export const nameInput = editProfileForm.querySelector('#person-name');
export const jobInput = editProfileForm.querySelector('#person-job');
//попап добавления фотографий
export const popupAddContentElement = document.querySelector('.popup_type_add-content');
export const pictureAddButton = document.querySelector('.profile__add-button');
export const pictureAddForm = document.querySelector('.popup__form_place');
//галерея
export const galleryList = '.elements__list';
export const gallery = document.querySelector('.elements__list');
//попапы
export const popups = document.querySelectorAll('.popup');
export const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-26';
export const token = '6e25370a-d860-45cc-8100-dac5b577cde2';