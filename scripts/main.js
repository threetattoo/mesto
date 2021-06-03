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

//попап редактирования профиля пользователя
const popupProfile = document.querySelector('.popup_profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__subtitle');
const editProfileForm = document.querySelector('.popup__form-profile');
const nameInput = editProfileForm.querySelector('#personname');
const jobInput = editProfileForm.querySelector('#personjob');

editProfileButton.addEventListener('click', openProfilePopup);
editProfileForm.addEventListener('submit', handleSubmitProfile);

function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupProfile.classList.toggle('popup_opened');
}

function handleSubmitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    evt.target.closest('.popup').classList.toggle('popup_opened');
}

//попап добавления фотографий
const pictureAddButton = document.querySelector('.profile__add-button');
const popupAddContent = document.querySelector('.popup_add-content');

pictureAddButton.addEventListener('click', function() {
    popupAddContent.classList.toggle('popup_opened');
});

function addPictureHandler(evt) {
    evt.preventDefault();
    const addPictureCaption = popupAddContent.querySelector('#placename');
    const addPictureUrl = popupAddContent.querySelector('#picturelink');
    let item = { name: addPictureCaption.value, link: addPictureUrl.value };
    renderItem(item);
    addPictureCaption.value = "";
    addPictureUrl.value = "";
    popupAddContent.classList.toggle('popup_opened');
};

const popupFormPlace = document.querySelector('.popup__form-place');
popupFormPlace.addEventListener('submit', addPictureHandler);

// обработка закрытия попапов при клике по кнопке
const closePopupButtons = document.querySelectorAll('.popup__close-button');
closePopupButtons.forEach((button) => {
    button.addEventListener('click', function() {
        button.closest('.popup').classList.toggle('popup_opened');
    });
})

// обработка закрытия попапов при клике по площади вне контента попапа
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.addEventListener('click', function(evt) {
        if (evt.target === evt.currentTarget) {
            evt.target.closest('.popup').classList.toggle('popup_opened');
        }
    });
})


// обработка нажатия кнопок удаления, лайка
// и просмотра полноразмерного фото в галерее
function handleDelete(evt) {
    evt.target.closest('.elements__item').remove();
}

function handleLike(evt) {
    evt.target.classList.toggle('elements__like-button_active');
}

function handleImageClick(evt) {
    const popupViewImage = document.querySelector('.popup_view-image');
    const popupImage = document.querySelector('.popup__image');
    const popupImageCaption = document.querySelector('.popup__image-caption');
    popupImage.src = evt.target.src;
    popupImageCaption.textContent = evt.target.nextElementSibling.textContent;
    popupViewImage.classList.toggle('popup_opened');
}

//добавление фото в галерею
function renderItem(item) {
    const galleryList = document.querySelector('.elements__list');
    const galleryItemTemplate = document.querySelector('#gallery-item').content;
    const galleryItem = galleryItemTemplate.querySelector('.elements__item').cloneNode(true);
    galleryItem.querySelector('.elements__image').src = item.link;
    galleryItem.querySelector('.elements__title').textContent = item.name;
    galleryList.append(galleryItem);
    const deleteButton = galleryItem.querySelector('.elements__delete-button');
    const likeButton = galleryItem.querySelector('.elements__like-button');
    deleteButton.addEventListener('click', handleDelete);
    likeButton.addEventListener('click', handleLike);
    const itemImage = galleryItem.querySelector('.elements__image');
    itemImage.addEventListener('click', handleImageClick);
}

initialCards.forEach(item => renderItem(item));