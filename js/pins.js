//import {createSimilarAds } from './data.js';
import {createModal} from'./popup.js';
import {makePageActive} from './utils.js';

const COORDS_DIGITS = 5;

const CITY_CENTRE_TOKYO = {
  lat: 35.652832,
  lng: 139.839478,
};

const getData = () => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        response.json();
      }
    })
    .then((data) => {
      createModal(data);
    });
};

const points = getData();

const formAddressInput = document.querySelector('#address');
const initialCoords = [parseFloat(CITY_CENTRE_TOKYO.lat.toFixed(COORDS_DIGITS)), parseFloat(CITY_CENTRE_TOKYO.lng.toFixed(COORDS_DIGITS))];
formAddressInput.value = initialCoords;

const map = L.map('map-canvas').on('load', () => {makePageActive();
}).setView(CITY_CENTRE_TOKYO, 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const pinMainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  CITY_CENTRE_TOKYO,
  {
    draggable: true,
    icon: pinMainIcon,
  },
);

function getCoordinates (evt) {
  const addressCoords = evt.target.getLatLng();
  formAddressInput.value = [parseFloat(addressCoords.lat.toFixed(COORDS_DIGITS)), parseFloat(addressCoords.lng.toFixed(COORDS_DIGITS))];
}

mainMarker.addTo(map);
mainMarker.on('moveend', getCoordinates);


points.forEach((point) => {
  const {coords} = point;

  const adMarker = L.marker({
    lat: coords.lat,
    lng: coords.lng,
  },
  {
    icon: pinIcon,
  },
  );

  adMarker.addTo(map).bindPopup(createModal(point));
});

