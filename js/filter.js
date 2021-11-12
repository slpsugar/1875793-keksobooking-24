const mapFiltersContainer = document.querySelector('.map__filters');
const housingType = mapFiltersContainer.querySelector('#housing-type');
const housingPrice = mapFiltersContainer.querySelector('#housing-price');
const housingRooms = mapFiltersContainer.querySelector('#housing-rooms');
const housingGuests = mapFiltersContainer.querySelector('#housing-guests');
const featuresCheckboxes = mapFiltersContainer.querySelectorAll('.map__checkbox');
const FEATURES_VALUES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

//тип жилья
function chooseHousingType ({offer}) {
  return (housingType.value === offer.type || housingType.value === 'any');
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
    return true;
  }
}

//число комнат
function chooseNumberOfRooms ({offer}) {
  return (housingRooms.value === String(offer.rooms) || housingRooms.value === 'any');
}

//число гостей
function chooseNumberOfGuests ({offer}) {
  return (housingGuests.value === String(offer.guests) || housingGuests.value === 'any');
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

function getTickedBoxes () {
  Array.from(featuresCheckboxes).filter((box) => box.checked).map((box) => box.value);
}

featuresCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', getTickedBoxes);
});

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

export {mapFiltersContainer,compareAds, filterPoints, filterFeatures};
