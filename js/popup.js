import {createSimilarAds} from './data.js';

const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('#map-canvas');

const similarAds = createSimilarAds();

similarAds.forEach(({author, offer}) => {
  const localTypes = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalow': 'Бунгало',
    'hotel': 'Отель',
  };
  const adElements = similarAdTemplate.cloneNode(true);

  if (!offer.title) {
    adElements.querySelector('.popup__title').remove();
  } else {
    adElements.querySelector('.popup__title').textContent = offer.title;
  }

  if (!offer.address) {
    adElements.querySelector('.popup__text--address').remove();
  } else {
    adElements.querySelector('.popup__text--address').textContent = offer.address;
  }

  if (!offer.price) {
    adElements.querySelector('.popup__text--price').remove();
  } else {
    adElements.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  }

  if (!offer.type) {
    adElements.querySelector('.popup__type').remove();
  } else {
    adElements.querySelector('.popup__type').textContent = localTypes[offer.type];
  }

  if (offer.rooms === '' || offer.guests === '') {
    adElements.querySelector('.popup__text--capacity').remove();
  } else {
    adElements.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  if (!offer.checkin && offer.checkout) {
    adElements.querySelector('.popup__text--time').textContent = `Выезд до ${offer.checkout}`;
  } else if (!offer.checkout && offer.checkin) {
    adElements.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}`;
  } else if (offer.checkin && offer.checkout){
    adElements.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    adElements.querySelector('.popup__text--time').remove();
  }

  const featuresList = adElements.querySelector('.popup__features');
  featuresList.innerHTML = '';
  offer.features.forEach((feature)  => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add(`popup__feature--${  feature}`);
    featuresList.appendChild(featureItem);
  });

  if (!offer.description) {
    adElements.querySelector('.popup__description').remove();
  } else {
    adElements.querySelector('.popup__description').textContent = offer.description;
  }

  if (!offer.photos) {
    adElements.querySelector('.popup__photos').remove();
  } else {
    for (let i=0; i < offer.photos.length; i++) {
      const imageSource = adElements.querySelector('.popup__photos').querySelector('img').cloneNode(true);
      imageSource.src = offer.photos[i];
      adElements.querySelector('.popup__photos').appendChild(imageSource);
    }
    adElements.querySelector('.popup__photos').children[0].remove();
  }

  if (!author.avatar) {
    adElements.querySelector('.popup__avatar').remove();
  } else {
    adElements.querySelector('.popup__avatar').src = author.avatar;
  }

  map.appendChild(adElements);
});

