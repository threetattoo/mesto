let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close-button');

openPopup.addEventListener('click', togglePopupClass);

closePopup.addEventListener('click', togglePopupClass);

function togglePopupClass() {
    popup.classList.toggle('popup_opened')
}

const likeButtons = document.querySelectorAll('.elements__like-button');

for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener('click', function() {
        if (likeButtons[i].classList.contains('elements__like-button_active')) {
            likeButtons[i].classList.remove('elements__like-button_active');
        } else {
            likeButtons[i].classList.add('elements__like-button_active');
        }
    });
}

//получаем имя и профессию пользователя из dom
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__subtitle');
//получаем форму, затем ее элементы input для имени и профессии
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#personname');
let jobInput = formElement.querySelector('#personjob');
//присваиваем атрибутам value элементов input значения имя и профессии, полученные из dom
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    // Вставьте новые значения с помощью textContent
    popup.classList.remove('popup_opened');

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);