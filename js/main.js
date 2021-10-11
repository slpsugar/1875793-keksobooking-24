import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArray} from './utils.js';
import {AVATARS, TITLES, PRICES, TYPES, ROOMS, GUESTS, CHECKIN_HOURS, CHECKOUT_HOURS, FEATURES, DESCRIPTIONS, PHOTOS} from './initial-values.js';

const SIMILAR_AD_COUNT = 10;

const createAdDescription = () => {

  const coords = {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  };
  return {
    author: {
      avatar: AVATARS[getRandomPositiveInteger(0, AVATARS.length-1)],
    },
    offer: {
      title: TITLES[getRandomPositiveInteger(0, TITLES.length-1)],
      address: `${coords.lat  },${  coords.lng}`,
      price: getRandomPositiveInteger(PRICES.minPrice, PRICES.maxPrice),
      type: TYPES[getRandomPositiveInteger(0, TYPES.length-1)],
      rooms: getRandomPositiveInteger(ROOMS.minRoomsNumber, ROOMS.maxRoomsNumber),
      guests: getRandomPositiveInteger(GUESTS.minGuestsNumber, GUESTS.maxGuestsNumber ),
      checkin: CHECKIN_HOURS[getRandomPositiveInteger(0, CHECKIN_HOURS.length-1)],
      checkout: CHECKOUT_HOURS[getRandomPositiveInteger(0, CHECKOUT_HOURS.length-1)],
      features: getRandomArray(FEATURES, FEATURES.length),
      description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length-1)],
      photos: getRandomArray(PHOTOS, PHOTOS.length),
    },
    coords: {
      lat: coords.lat,
      lng: coords.lng,
    },
  };};

// eslint-disable-next-line no-unused-vars
const similarAds = Array.from({length: SIMILAR_AD_COUNT}, createAdDescription);
