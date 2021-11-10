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

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {makePageInactive, makePageActive, debounce};
