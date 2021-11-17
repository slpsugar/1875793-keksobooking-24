import {map, mainMarker, CITY_CENTRE_TOKYO, formAddressInput, initialCoords} from './pins.js';
import {resetAvatar, resetPhoto} from './preview.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const DEFAULT_PLACEHOLDER = 1000;
const minPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const formContainer = document.querySelector('.ad-form');
const title = document.querySelector('#title');
const price= document.querySelector('#price');
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');
const checkinHours = document.querySelector('#timein');
const checkoutHours = document.querySelector('#timeout');
const accomodationType = document.querySelector('#type');

const resetButton = formContainer.querySelector('.ad-form__reset');
const messageSuccess = document.querySelector('#success').content.querySelector('.success');
const messageError = document.querySelector('#error').content.querySelector('.error');
const errorButton = messageError.querySelector('.error__button');

//поля для заполнения
title.addEventListener('input', () => {
  const titleLength = title.value.length;
  if (titleLength<MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Осталось ${MIN_TITLE_LENGTH - titleLength } симв.`);
  }
  else if (titleLength>MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Удалите ${titleLength - MAX_TITLE_LENGTH} симв.`);
  }
  else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});

price.addEventListener('input', () => {
  if (price.validity.rangeOverflow) {
    price.setCustomValidity(`Максимальное значение - ${MAX_PRICE_VALUE}`);
  }
  else {
    price.setCustomValidity('');
  }
  price.reportValidity();
});

// Стоимость жилья
const onTypeInput = () => {
  const typeValue = accomodationType.value;
  for (let type = 0; type <accomodationType.length; type++){
    price.setAttribute('min', minPrices[typeValue]);
    price.placeholder = minPrices[typeValue];
  }
  price.reportValidity();
};
const resetPlaceholder = () => price.setAttribute('placeholder', DEFAULT_PLACEHOLDER);

// Количество гостей
const compareGuestNumber = () => {
  const roomNumberValue = roomNumber.value;
  const guestNumberValue = guestNumber.value;
  const ratios = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };
  return ratios[roomNumberValue].includes(guestNumberValue);
};

const onGuestNumberInput = () => {
  if (!compareGuestNumber()) {
    guestNumber.setCustomValidity('Неверное число гостей');
  } else {
    guestNumber.setCustomValidity('');
  }
  guestNumber.reportValidity();
};
onGuestNumberInput();

// Время заезда и выезда
const onTimeChange = (evt) => {
  checkinHours.value = evt.target.value;
  checkoutHours.value = evt.target.value;
};

// Отправка формы
formContainer.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error (`${response.status} ${response.statusText}`);
    })
    .then (() => {document.body.appendChild(messageSuccess);})
    .catch(() => {
      document.body.appendChild(messageError);
    });
});

const resetMap = () => {
  map.closePopup();
  map.setView(CITY_CENTRE_TOKYO, 12);
  mainMarker.setLatLng(CITY_CENTRE_TOKYO);
};

const onSuccessClick = () => {
  messageSuccess.remove();
  formContainer.reset();
  resetAvatar();
  resetPhoto();
  resetPlaceholder();
  formAddressInput.value = initialCoords;
  resetMap();
};

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  resetAvatar();
  resetPhoto();
  resetPlaceholder();
  onSuccessClick();
};

const onErrorButtonClick = () => messageError.remove();

document.addEventListener('keydown', (evt) => {
  if (document.body.contains(messageSuccess)) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onSuccessClick();
    }
  }
  if (document.body.contains(messageError)) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onErrorButtonClick();
    }
  }
});

accomodationType.addEventListener('input', onTypeInput);
roomNumber.addEventListener('change', onGuestNumberInput);
guestNumber.addEventListener('change', onGuestNumberInput);
checkinHours.addEventListener('change', onTimeChange);
checkoutHours.addEventListener('change', onTimeChange);

messageSuccess.addEventListener('click', onSuccessClick);
messageError.addEventListener('click', onErrorButtonClick);
errorButton.addEventListener('click', onErrorButtonClick);
resetButton.addEventListener('click', onResetButtonClick);

