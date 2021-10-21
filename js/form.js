const formTitleInput = document.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const formPriceInput = document.querySelector('#price');
const formRoomNumberInput = document.querySelector('#room_number');
const formGuestNumber = document.querySelector('#capacity').querySelectorAll('option');

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


formRoomNumberInput.addEventListener('input', () => {
  const roomNumberValue = formRoomNumberInput.value;
  formGuestNumber.forEach((number) => {number.setAttribute('disabled','');});

  if (roomNumberValue === '1') {
    formGuestNumber[2].removeAttribute('disabled','');
    //formRoomNumberInput.setCustomValidity('Для 1 гостя');
  } else if (roomNumberValue === '100') {
    formGuestNumber[3].removeAttribute('disabled','');
    //formRoomNumberInput.setCustomValidity('Не для гостей');
  } else if (roomNumberValue === '2') {
    formGuestNumber[1].removeAttribute('disabled','');
    formGuestNumber[2].removeAttribute('disabled','');
    //formRoomNumberInput.setCustomValidity('Для 1 или 2 гостей');
  } else if (roomNumberValue === '3') {
    formGuestNumber[0].removeAttribute('disabled','');
    formGuestNumber[1].removeAttribute('disabled','');
    formGuestNumber[2].removeAttribute('disabled','');
    //formRoomNumberInput.setCustomValidity('От 1 до 3 гостей');
  }
  formRoomNumberInput.reportValidity();
});

