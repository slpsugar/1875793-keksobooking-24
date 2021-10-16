import {createSimilarAds} from './data.js';

const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const map = document.querySelector('#map-canvas');

const similarAds = createSimilarAds();

similarAds.forEach(({author, offer}) => {
  const adElements = similarAdTemplate.cloneNode(true);
  adElements.querySelector('.popup__title').textContent = offer.title;
  adElements.querySelector('.popup__text--address').textContent = offer.address;
  adElements.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adElements.querySelector('.popup__type').textContent = offer.type;
  adElements.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adElements.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  adElements.querySelector('.popup__features').textContent = offer.features;
  adElements.querySelector('.popup__description').textContent = offer.description;

  for (let i=0; i < offer.photos.length; i++) {
    const imageSource = adElements.querySelector('.popup__photos').querySelector('img').cloneNode(true);
    imageSource.src = offer.photos[i];
    adElements.querySelector('.popup__photos').appendChild(imageSource);
  }
  adElements.querySelector('.popup__photos').children[0].remove();
  adElements.querySelector('.popup__avatar').src = author.avatar;

  for (let j=0; j<adElements.length; j++) {
    if (adElements.children[j].content === '')
    {adElements.children[j].remove();}
  }
  map.appendChild(adElements);
});
