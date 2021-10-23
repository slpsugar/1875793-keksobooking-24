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
  } else {
    formPriceInput.setCustomValidity('');
  }
  formPriceInput.reportValidity();
});

function compareValues () {
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

function validateFileds () {
  if (!compareValues()) {
    formGuestNumberInput.setCustomValidity('Неверное число гостей');
    formGuestNumberInput.reportValidity();
    return false;
  } else {
    formGuestNumberInput.setCustomValidity('');
    formGuestNumberInput.reportValidity();
    return true;
  }
}

formRoomNumberInput.addEventListener('input', validateFileds);
formGuestNumberInput.addEventListener('input', validateFileds);

// Время заезда и выезда

function compareHours () {
  const checkinHourValue = formCheckinHours.value;
  const checkoutHourValue = formCheckoutHours.value;
  const inOutRatio = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00',
  };
  return inOutRatio[checkinHourValue].includes(checkoutHourValue);
}

function validateTimeIn () {
  if (!compareHours()) {
    for (let option = 0; option < formCheckoutHours.length; option++) {
      if (formCheckoutHours[option].value === formCheckinHours.value) {
        formCheckoutHours[option].selected = true;}
    }
    formCheckoutHours.setCustomValidity('');
  } else {
    formCheckoutHours.setCustomValidity('');
  }
  formCheckoutHours.reportValidity();
}

function validateTimeOut () {
  if (!compareHours()) {
    for (let option = 0; option < formCheckinHours.length; option++) {
      if (formCheckinHours[option].value === formCheckoutHours.value) {
        formCheckinHours[option].selected = true;}
    }
    formCheckoutHours.setCustomValidity('');
  } else {
    formCheckoutHours.setCustomValidity('');
  }
  formCheckoutHours.reportValidity();
}

formCheckinHours.addEventListener('input', validateTimeIn);
formCheckoutHours.addEventListener('input', validateTimeOut);


formContainer.addEventListener('submit', (evt) => {
  if (!validateFileds) {
    evt.preventDefault();
  }
});


