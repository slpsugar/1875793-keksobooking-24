/*function getRandomfromRange (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (max<min || max <0 || min <0) ? 0 : Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomfromRange (13, 32);

function getRandomFloating (min, max, decimal) {
  const result = (max < min || max <0 || min <0) ? 0 : (Math.random() * (max - min + 1)) + min;
  return result.toFixed(decimal);
}
getRandomFloating (5.754, 60.5, 4);*/

const AVATARS = [];

const avatarImage = 'img/avatars/user{{xx}}.png';
for (let i = 1; i < 10; i++) {
  const newAvatarImage = avatarImage.replace('{{xx}}', `0${  i}`);
  AVATARS.push(newAvatarImage);
}
const lastAvatarImage = avatarImage.replace('{{xx}}', 10);
AVATARS.push(lastAvatarImage);

const TITLES = [
  'Home Sweet Home',
  'Be My Guest',
  'Sleep Over',
  'Better place',
  'A Place To Go',
];

const PRICES = {
  minPrice: 15,
  maxPrice: 4000,
};

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const ROOMS = {
  minRoomsNumber: 1,
  maxRoomsNumber: 100,
};

const GUESTS = {
  minGuestsNumber: 1,
  maxGuestsNumber: 100,
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
  'Sutuated in a popular vibrant area. With our prime location, you are never more than a few munites walk from popular destinations.',
  'Decorated to a high standard with newly refurbished ensuite bathrooms.',
  'We are one of the places which boasts being sei-rural whilst being extremely close to all surrounding areas. Dogs are welcome at the property.',
  'Place for a perfect short break! Pool passes are not included in the price, but can be purchased on arrival (passes are subject to availability).',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg,',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return parseFloat(result.toFixed(digits));
};

const getRandomArrayLength = ([...array], length) =>
  Array.from({length: Math.min(array.length, Math.floor(Math.random() * length + 1))},
    () => array.splice(Math.random() * array.length, 1).join(),
  );

const SIMILAR_AD_COUNT = 10;

const createAdDescription = () => ({
  author: {
    avatar: AVATARS[getRandomPositiveInteger(0, AVATARS.length-1)],
  },
  offer: {
    title: TITLES[getRandomPositiveInteger(0, TITLES.length-1)],

    address: location.lat + ',' + location.lng,

    price: getRandomPositiveInteger(PRICES.minPrice, PRICES.maxPrice),
    type: TYPES[getRandomPositiveInteger(0, TYPES.length-1)],
    rooms: getRandomPositiveInteger(ROOMS.minRoomsNumber, ROOMS.maxRoomsNumber),
    guests: getRandomPositiveInteger(GUESTS.minGuestsNumber, GUESTS.maxGuestsNumber ),
    checkin: CHECKIN_HOURS[getRandomPositiveInteger(0, CHECKIN_HOURS.length-1)],
    checkout: CHECKOUT_HOURS[getRandomPositiveInteger(0, CHECKOUT_HOURS.length-1)],
    features: getRandomArrayLength(FEATURES, FEATURES.length),
    description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length-1)],
    photos: getRandomArrayLength(PHOTOS, PHOTOS.length),
  },
  location: {
    lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
    lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
  },
});

const similarAds = Array.from({length: SIMILAR_AD_COUNT}, createAdDescription);
