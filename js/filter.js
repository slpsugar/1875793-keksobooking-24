const mapFiltersContainer = document.querySelector('.map__filters');
const housingTypeElement = mapFiltersContainer.querySelector('#housing-type');
const housingPriceElement = mapFiltersContainer.querySelector('#housing-price');
const housingRoomsElement = mapFiltersContainer.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersContainer.querySelector('#housing-guests');
const featuresCheckboxes = mapFiltersContainer.querySelectorAll('.map__checkbox');
const FEATURES_VALUES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

//тип жилья
function chooseHousingType ({offer}) {
  return (housingTypeElement.value === offer.type || housingTypeElement.value === 'any');
}

//цена
function chooseHousingPriceRange ({offer}) {
  if (housingPriceElement.value === 'low') {
    return offer.price < 10000;
  }
  if (housingPriceElement.value === 'middle') {
    return offer.price >= 10000 && offer.price < 50000;
  }
  if (housingPriceElement.value === 'high') {
    return offer.price >= 50000;
  }
  if (housingPriceElement.value === 'any') {
    return true;
  }
}

//число комнат
function chooseNumberOfRooms ({offer}) {
  return (housingRoomsElement.value === String(offer.rooms) || housingRoomsElement.value === 'any');
}

//число гостей
function chooseNumberOfGuests ({offer}) {
  return (housingGuestsElement.value === String(offer.guests) || housingGuestsElement.value === 'any');
}

//удобства - сортировка
function rankFeatures ({offer}) {
  let rank = 0;
  if (!offer.features) {
    return 0;
  }
  if (FEATURES_VALUES.some((feature) => offer.features.includes(feature))) {
    rank +=1;
  }
  return rank;
}

const compareAds = (descriptionA, descriptionB) => {
  const rankA = rankFeatures(descriptionA);
  const rankB = rankFeatures(descriptionB);
  return rankB - rankA;
};

function filterFeatures ({offer}) {
  const checkboxes =  Array.from(featuresCheckboxes)
    .filter((box) => box.checked)
    .map((box) => box.value);
  if (!offer.features) {
    return false;
  }
  return (checkboxes.every((box) => offer.features.includes(box)));
}

function filterPoints ({offer}) {
  return chooseHousingType({offer}) && chooseHousingPriceRange ({offer})
   && chooseNumberOfRooms ({offer}) && chooseNumberOfGuests ({offer})
   && filterFeatures({offer});
}

export {mapFiltersContainer, compareAds, filterPoints};
