import {firstLayerPoints} from './pins.js';

const mapFiltersContainer = document.querySelector('.map__filters');
const housingType = mapFiltersContainer.querySelector('#housing-type');
const housingPrice = mapFiltersContainer.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = mapFiltersContainer.querySelector('#housing-guests');
const housingFeatures = mapFiltersContainer.querySelector('#housing-features');

//тип жилья
function chooseHousingType ({offer}) {
  if (housingType.value === offer.type) {
    return true;
  }
  if (housingType.value === 'any') {
    return firstLayerPoints;
  }
}

//цена
function chooseHousingPriceRange ({offer}) {
  if (housingPrice.value === 'low') {
    return offer.price < 10000;
  }
  if (housingPrice.value === 'middle') {
    return offer.price >= 10000 && offer.price < 50000;
  }
  if (housingPrice.value === 'high') {
    return offer.price >= 50000;
  }
  if (housingPrice.value === 'any') {
    return firstLayerPoints;
  }
}

//число комнат
function chooseNumberOfRooms ({offer}) {
  if (housingRooms.value === String(offer.rooms)) {
    return true;
  }
  if (housingRooms.value === 'any') {
    return offer.rooms > 3;
  }
}

//число гостей
function chooseNumberOfGuests ({offer}) {
  if (housingGuests.value === String(offer.guests)) {
    return true;
  }
  if (housingGuests.value === 'any') {
    return offer.guests > 2;
  }
}

export {mapFiltersContainer,
  housingType, chooseHousingType,
  housingPrice, chooseHousingPriceRange,
  housingRooms, chooseNumberOfRooms,
  housingGuests, chooseNumberOfGuests
};
