export const initialCards = [{
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

export const popupFormConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//попап редактирования профиля пользователя
export const popupProfileElement = document.querySelector('.popup_type_profile');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__subtitle');
export const editProfileForm = document.querySelector('.popup__form_profile');
export const nameInput = editProfileForm.querySelector('#personname');
export const jobInput = editProfileForm.querySelector('#personjob');
//попап добавления фотографий
export const popupAddContentElement = document.querySelector('.popup_type_add-content');
export const pictureAddButton = document.querySelector('.profile__add-button');
export const pictureAddForm = document.querySelector('.popup__form_place');
//галерея
export const galleryList = '.elements__list';
//попапы
export const popups = document.querySelectorAll('.popup');