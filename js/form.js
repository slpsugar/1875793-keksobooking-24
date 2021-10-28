const formContainer = document.querySelector('.ad-form');

const formTitleInput = document.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const formPriceInput = document.querySelector('#price');
const formRoomNumberInput = document.querySelector('#room_number');
const formGuestNumberInput = document.querySelector('#capacity');

const formCheckinHours = document.querySelector('#timein');
const formCheckoutHours = document.querySelector('#timeout');

const formAccomodationType = document.querySelector('#type');

formTitleInput.addEventListener('input', () => {
  const titleLength = formTitleInput.value.length;
  if (titleLength<MIN_TITLE_LENGTH) {
    formTitleInput.setCustomValidity(`Осталось ${MIN_TITLE_LENGTH - titleLength } симв.`);
  }
  else if (titleLength>MAX_TITLE_LENGTH) {
    formTitleInput.setCustomValidity(`Удалите ${titleLength - MAX_TITLE_LENGTH} симв.`);
  }
  else {
    formTitleInput.setCustomValidity('');
  }
  formTitleInput.reportValidity();
});

formPriceInput.addEventListener('input', () => {
  if (formPriceInput.validity.rangeOverflow) {
    formPriceInput.setCustomValidity(`Максимальное значение - ${MAX_PRICE_VALUE}`);
  }
  else {
    formPriceInput.setCustomValidity('');
  }
  formPriceInput.reportValidity();
});

// Стоимость жилья

const newComparePrices = () => {
  const accomodationType = formAccomodationType.value;
  const minPrices = {
    'bungalow': 0,
    'flat': 1000,
    'hotel': 3000,
    'house': 5000,
    'palace': 10000,
  };
  for (let type = 0; type <formAccomodationType.length; type++){
    formPriceInput.setAttribute('min', minPrices[accomodationType]);
    formPriceInput.placeholder = minPrices[accomodationType];
  }
  formPriceInput.reportValidity();
};

formAccomodationType.addEventListener('input', newComparePrices);

// Количество гостей

function compareGuests () {
  const roomNumberValue = formRoomNumberInput.value;
  const guestNumberValue = formGuestNumberInput.value;
  const ratio = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };
  return ratio[roomNumberValue].includes(guestNumberValue);
}

function validateGuestNumberFiled () {
  if (!compareGuests()) {
    formGuestNumberInput.setCustomValidity('Неверное число гостей');
    formGuestNumberInput.reportValidity();
    return false;
  } else {
    formGuestNumberInput.setCustomValidity('');
    formGuestNumberInput.reportValidity();
    return true;
  }
}

formRoomNumberInput.addEventListener('input', validateGuestNumberFiled);
formGuestNumberInput.addEventListener('input', validateGuestNumberFiled);

// Время заезда и выезда

function validateTime () {
  const checkinHourValue = formCheckinHours.value;
  const checkoutHourValue = formCheckoutHours.value;
  const inOutRatio = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00',
  };

  for (let timeOption = 0; timeOption < formCheckinHours.length; timeOption++){
    const newOut = formCheckoutHours[timeOption];
    newOut.value = checkinHourValue;
    //newOut.selected = true;
  }
  //return inOutRatio[checkinHourValue].includes(checkoutHourValue);
  if (inOutRatio[checkinHourValue].includes(checkoutHourValue)) {
    formCheckoutHours.setCustomValidity('');
  } else {
    formCheckoutHours.setCustomValidity('Неверно');
  }
  formCheckoutHours.reportValidity();
}

// function validateTime () {
//   if (!compareHours()) {
//     for (let option = 0; option < formCheckoutHours.length; option++) {
//       if (formCheckoutHours[option].value === formCheckinHours.value) {
//         formCheckoutHours[option].selected = true;}
//       else if (formCheckinHours[option].value === formCheckoutHours.value) {
//         formCheckinHours[option].selected = true;}
//     }
//     formCheckoutHours.setCustomValidity('');
//   } else {
//     formCheckoutHours.setCustomValidity('');
//   }
//   formCheckoutHours.reportValidity();
// }

formCheckinHours.addEventListener('input', validateTime);
formCheckoutHours.addEventListener('input', validateTime);

formContainer.addEventListener('submit', (evt) => {
  if (!validateGuestNumberFiled) {
    evt.preventDefault();
  }
});


