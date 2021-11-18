const FEATURES_VALUES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PriceRange = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};
const PriceValue = {
  LOW: 10000,
  HIGH: 50000,
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
  if (housingPrice.value === PriceRange.LOW) {
    return offer.price < PriceValue.LOW;
  }
  if (housingPrice.value === PriceRange.MIDDLE) {
    return offer.price >= PriceValue.LOW && offer.price < PriceValue.HIGH;
  }
  if (housingPrice.value === PriceRange.HIGH) {
    return offer.price >= PriceValue.HIGH;
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
