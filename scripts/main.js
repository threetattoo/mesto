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

function togglePopupClass(popup) {
    popup.classList.toggle('popup_opened');
}

function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    togglePopupClass(popupProfile);
}

function handleSubmitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopupClass(popupProfile);
}

function addPictureHandler(evt) {
    evt.preventDefault();
    const addPictureCaption = popupAddContent.querySelector('#placename');
    const addPictureUrl = popupAddContent.querySelector('#picturelink');
    const item = { name: addPictureCaption.value, link: addPictureUrl.value };
    createCard(item);
    pictureAddForm.reset();
    togglePopupClass(popupAddContent);
};

function renderItem(item) {
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

function createCard(item) {
    galleryList.prepend(renderItem(item));
}

// обработка закрытия попапов при клике по кнопке
closePopupButtons.forEach((button) => {
    button.addEventListener('click', function() {
        const closestPopup = button.closest('.popup');
        togglePopupClass(closestPopup);
    });
})

// обработка закрытия попапов при клике по площади вне контента попапа
popups.forEach((popup) => {
    popup.addEventListener('click', function(evt) {
        if (evt.target === evt.currentTarget) {
            const closestPopup = evt.target.closest('.popup');
            togglePopupClass(closestPopup);
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
    closestGalleryItem = evt.target.closest('.elements__item');
    popupImage.src = closestGalleryItem.querySelector('.elements__image').src;
    popupImage.alt = closestGalleryItem.querySelector('.elements__title').textContent;
    popupImageCaption.textContent = closestGalleryItem.querySelector('.elements__title').textContent;
    togglePopupClass(popupViewImage);
}

initialCards.forEach(item => createCard(item));
editProfileButton.addEventListener('click', openProfilePopup);
editProfileForm.addEventListener('submit', handleSubmitProfile);
pictureAddForm.addEventListener('submit', addPictureHandler);
pictureAddButton.addEventListener('click', function() {
    togglePopupClass(popupAddContent);
});