import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArray} from './utils.js';

const AVATARS = [];
const avatarImage = 'img/avatars/user{{xx}}.png';
for (let index = 1; index < 10; index++) {
  const newAvatarImage = avatarImage.replace('{{xx}}', `0${  index}` );
  AVATARS.push(newAvatarImage);
}
const lastAvatarImage = avatarImage.replace('{{xx}}', '10');
AVATARS.push(lastAvatarImage);

const TITLES = [
  'Home Sweet Home',
  'Be My Guest',
  'Sleep Over',
  'Better place',
  'A Place To Go',
];

const PRICES = {
  minPrice: 0,
  maxPrice: 1000000,
};

const accomodationTypes = [
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало',
  'Отель',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

for (let i=0; i<TYPES.length; i++) {
  TYPES[i] = accomodationTypes[i];}

const ROOMS = {
  minRoomsNumber: 1,
  maxRoomsNumber: 3,
};

const GUESTS = {
  minGuestsNumber: 0,
  maxGuestsNumber: 2,
};

const CHECKIN_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTIONS = [
  'Situated in a popular vibrant area. With our prime location, you are never more than a few munites walk from popular destinations.',
  'Decorated to a high standard with newly refurbished ensuite bathrooms.',
  'We are one of the places which boasts being sei-rural whilst being extremely close to all surrounding areas. Dogs are welcome at the property.',
  'Place for a perfect short break! Pool passes are not included in the price, but can be purchased on arrival (passes are subject to availability).',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_AD_COUNT = 1;

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

const createSimilarAds = () => Array.from({length: SIMILAR_AD_COUNT}, createAdDescription);

export {createSimilarAds};
