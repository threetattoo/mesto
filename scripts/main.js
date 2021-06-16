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
//попап просмотра фотографии
const popupViewImage = document.querySelector('.popup_type_view-image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');
//галерея и темплейт ее элемента
const galleryList = document.querySelector('.elements__list');
const galleryItemTemplate = document.querySelector('#gallery-item').content;

const popups = document.querySelectorAll('.popup');
const closePopupButtons = document.querySelectorAll('.popup__close-button');

function openPopup(popup) {
    popup.classList.toggle('popup_opened');
    document.addEventListener('keyup', handleEscapeClose);
}

function closePopup(popup) {
    popup.classList.toggle('popup_opened');
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
    renderItem(item);
    pictureAddForm.reset();
    closePopup(popupAddContent);
};

function createCard(item) {
    const galleryItem = galleryItemTemplate.querySelector('.elements__item').cloneNode(true);
    const deleteButton = galleryItem.querySelector('.elements__delete-button');
    const likeButton = galleryItem.querySelector('.elements__like-button');
    const itemImage = galleryItem.querySelector('.elements__image');
    const itemTitle = galleryItem.querySelector('.elements__title');
    itemImage.src = item.link;
    itemImage.alt = item.name;
    itemTitle.textContent = item.name;
    deleteButton.addEventListener('click', handleDelete);
    likeButton.addEventListener('click', handleLike);
    itemImage.addEventListener('click', handleImageClick);
    return galleryItem;
}

function renderItem(item) {
    galleryList.prepend(createCard(item));
}

// обработка закрытия попапов при клике по кнопке
closePopupButtons.forEach((button) => {
    button.addEventListener('click', function() {
        const closestPopup = button.closest('.popup');
        closePopup(closestPopup);
    });
})

// обработка закрытия попапов при клике по оверлею
function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        const closestPopup = event.target.closest('.popup');
        closePopup(closestPopup);
    }
}

//закрытие попапа при нажатии кнопки escape
function handleEscapeClose(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

// обработка нажатия кнопок удаления, лайка
// и просмотра полноразмерного фото в галерее
function handleDelete(evt) {
    evt.target.closest('.elements__item').remove();
}

function handleLike(evt) {
    evt.target.classList.toggle('elements__like-button_active');
}

function handleImageClick(evt) {
    const closestGalleryItem = evt.target.closest('.elements__item');
    popupImage.src = closestGalleryItem.querySelector('.elements__image').src;
    popupImage.alt = closestGalleryItem.querySelector('.elements__title').textContent;
    popupImageCaption.textContent = closestGalleryItem.querySelector('.elements__title').textContent;
    openPopup(popupViewImage);
}

initialCards.forEach(item => renderItem(item));
editProfileButton.addEventListener('click', openProfilePopup);
editProfileForm.addEventListener('submit', handleSubmitProfile);
pictureAddForm.addEventListener('submit', addPictureHandler);
pictureAddButton.addEventListener('click', function() {
    openPopup(popupAddContent);
});
popups.forEach((popup) => {
    popup.addEventListener('click', handleOverlayClick);
})