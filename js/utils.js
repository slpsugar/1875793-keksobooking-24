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

export {makePageInactive, makePageActive};
