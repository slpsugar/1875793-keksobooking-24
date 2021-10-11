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
  minGuestsNumber: 0,
  maxGuestsNumber: 3,
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

export {AVATARS, TITLES, PRICES, TYPES, ROOMS, GUESTS, CHECKIN_HOURS, CHECKOUT_HOURS, FEATURES, DESCRIPTIONS, PHOTOS};
