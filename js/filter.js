const mapFiltersContainer = document.querySelector('.map__filters');
const housingType = mapFiltersContainer.querySelector('#housing-type');
const housingPrice = mapFiltersContainer.querySelector('#housing-price');
const housingRooms = mapFiltersContainer.querySelector('#housing-rooms');
const housingGuests = mapFiltersContainer.querySelector('#housing-guests');
const featuresCheckboxes = document.querySelectorAll('.map__checkbox');

//тип жилья
function chooseHousingType ({offer}) {
  if (housingType.value === offer.type || housingType.value === 'any') {
    return true;
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
    return true;
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

//удобства - сортировка
function rankFeatures ({offer}) {
  let rank = 0;
  if (!offer.features) {
    return 0;
  }
  if (offer.features.includes('wifi')) {
    rank +=1;
  }
  if (offer.features.includes('dishwasher')) {
    rank +=1;
  }
  if (offer.features.includes('parking')) {
    rank +=1;
  }
  if (offer.features.includes('washer')) {
    rank +=1;
  }
  if (offer.features.includes('elevator')) {
    rank +=1;
  }
  if (offer.features.includes('conditioner')) {
    rank +=1;
  }
  return rank;
}

const compareAds = (descriptionA, descriptionB) => {
  const rankA = rankFeatures(descriptionA);
  const rankB = rankFeatures(descriptionB);
  return rankB - rankA;
};


let checkboxes = [];
featuresCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    checkboxes =
      Array.from(featuresCheckboxes)
        .filter((box) => box.checked)
        .map((box) => box.value);
    return checkboxes;
  });
});

function filterFeatures ({offer}) {
  if (!offer.features) {
    return false;
  }
  if (checkboxes.every((box) => offer.features.includes(box))) {
    return true;
  }
}

function filteredPoints ({offer}) {
  if (chooseHousingType({offer}) && chooseHousingPriceRange ({offer}) && chooseNumberOfRooms ({offer}) && chooseNumberOfGuests ({offer}) && filterFeatures({offer})) {
    return true;
  }
}

export {mapFiltersContainer,compareAds, filteredPoints, filterFeatures};
