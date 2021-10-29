const getRandomPositiveInteger = (num1, num2) => {
  const lower = Math.ceil(Math.min(Math.abs(num1), Math.abs(num2)));
  const upper = Math.floor(Math.max(Math.abs(num1), Math.abs(num2)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (num1, num2, digits) => {
  const lower = Math.min(Math.abs(num1), Math.abs(num2));
  const upper = Math.max(Math.abs(num1), Math.abs(num2));
  const result = Math.random() * (upper - lower) + lower;
  return parseFloat(result.toFixed(digits));
};

const getRandomArray = ([...array], length) =>
  Array.from({length: Math.min(array.length, Math.floor(Math.random() * length + 1))},
    () => array.splice(Math.random() * array.length, 1).join(),
  );

// для карты

const mapFormContainer = document.querySelector('.ad-form');
const interactiveAdElements = mapFormContainer.querySelectorAll('fieldset');

const mapFiltersForm = document.querySelector('.map__filters');
const interactiveFilterElements = mapFiltersForm.querySelectorAll('select, fieldset');

function makePageInactive () {
  mapFormContainer.classList.add('ad-form--disabled');
  interactiveAdElements.forEach((fieldset) => {
    fieldset.setAttribute('disabled', '');
  });

  mapFiltersForm.classList.add('map__filters--disabled');
  interactiveFilterElements.forEach((element) => {
    element.setAttribute('disabled', '');
  });
}

function makePageActive () {
  mapFormContainer.classList.remove('ad-form--disabled');
  interactiveAdElements.forEach((fieldset) => {
    fieldset.removeAttribute('disabled', '');
  });
  mapFiltersForm.classList.remove('map__filters--disabled');
  interactiveFilterElements.forEach((element) => {
    element.removeAttribute('disabled', '');
  });
}

makePageInactive();

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArray, makePageInactive, makePageActive};
