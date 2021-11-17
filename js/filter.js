const FEATURES_VALUES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PRICE_RANGE = {
  low: 'low',
  middle: 'middle',
  high: 'high',
};
const PRICE_VALUES = {
  low: 10000,
  high: 50000,
};

const mapFiltersContainer = document.querySelector('.map__filters');
const housingType = mapFiltersContainer.querySelector('#housing-type');
const housingPrice = mapFiltersContainer.querySelector('#housing-price');
const housingRooms = mapFiltersContainer.querySelector('#housing-rooms');
const housingGuests = mapFiltersContainer.querySelector('#housing-guests');
const features = mapFiltersContainer.querySelectorAll('.map__checkbox');

//тип жилья
const chooseType = ({offer}) => housingType.value === offer.type || housingType.value === 'any';

//цена
const choosePrice = ({offer}) => {
  if (housingPrice.value === PRICE_RANGE.low) {
    return offer.price < PRICE_VALUES.low;
  }
  if (housingPrice.value === PRICE_RANGE.middle) {
    return offer.price >= PRICE_VALUES.low && offer.price < PRICE_VALUES.high;
  }
  if (housingPrice.value === PRICE_RANGE.high) {
    return offer.price >= PRICE_VALUES.high;
  }
  if (housingPrice.value === 'any') {
    return true;
  }
};

//число комнат
const chooseNumberOfRooms = ({offer}) => housingRooms.value === String(offer.rooms) || housingRooms.value === 'any';

//число гостей
const chooseNumberOfGuests = ({offer}) => housingGuests.value === String(offer.guests) || housingGuests.value === 'any';

//удобства - сортировка
const rankFeatures = ({offer}) => {
  let rank = 0;
  if (!offer.features) {
    return 0;
  }
  if (FEATURES_VALUES.some((feature) => offer.features.includes(feature))) {
    rank +=1;
  }
  return rank;
};

const compareAds = (descriptionA, descriptionB) => {
  const rankA = rankFeatures(descriptionA);
  const rankB = rankFeatures(descriptionB);
  return rankB - rankA;
};

const filterFeatures = ({offer}) => {
  const checkboxes =  Array.from(features)
    .filter((box) => box.checked)
    .map((box) => box.value);
  if (!offer.features) {
    return false;
  }
  return (checkboxes.every((box) => offer.features.includes(box)));
};

const filterPoints = ({offer}) => chooseType({offer}) && choosePrice ({offer})
  && chooseNumberOfRooms ({offer}) && chooseNumberOfGuests ({offer}) && filterFeatures({offer});

export {mapFiltersContainer, compareAds, filterPoints};
