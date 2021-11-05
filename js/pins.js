import {createModal} from'./popup.js';
import {makePageActive} from './utils.js';
import {fetchData} from './data-remote.js';
import {housingType, chooseHousingType,
  housingPrice, chooseHousingPriceRange,
  housingRooms, chooseNumberOfRooms,
  housingGuests, chooseNumberOfGuests} from './filter.js';

const SIMILAR_ADS_COUNT = 10;
const COORDS_DIGITS = 5;
const CITY_CENTRE_TOKYO = {
  lat: 35.652832,
  lng: 139.839478,
};

//метки на карте
const formAddressInput = document.querySelector('#address');
const initialCoords = [parseFloat(CITY_CENTRE_TOKYO.lat.toFixed(COORDS_DIGITS)), parseFloat(CITY_CENTRE_TOKYO.lng.toFixed(COORDS_DIGITS))];
formAddressInput.value = initialCoords;

const map = L.map('map-canvas')
  .on('load', () => {makePageActive();
  })
  .setView(CITY_CENTRE_TOKYO, 12);

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

const firstLayerGroup = L.layerGroup().addTo(map);

const renderPoints = (points) => {
  points.forEach((point) => {
    const {location} = point;
    const marker = L.marker({
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: pinIcon,
    },
    );
    marker.addTo(firstLayerGroup).bindPopup(createModal(point));
  });
  return firstLayerGroup;
};

const firstLayerPoints = fetchData().then((points) => renderPoints(points.slice(0, SIMILAR_ADS_COUNT)));

//фильтрация

housingType.addEventListener('input', () => {
  firstLayerPoints.then(() => firstLayerGroup.clearLayers());
  fetchData().then((points) => renderPoints(points
    .filter(chooseHousingType)
    .slice(0, SIMILAR_ADS_COUNT)));
});

housingPrice.addEventListener('input', () => {
  firstLayerPoints.then(() => firstLayerGroup.clearLayers());
  fetchData().then((points) => renderPoints(points
    .filter(chooseHousingType)
    .filter(chooseHousingPriceRange)
    .slice(0, SIMILAR_ADS_COUNT)));
});

housingRooms.addEventListener('input', () => {
  firstLayerPoints.then(() => firstLayerGroup.clearLayers());
  fetchData().then((points) => renderPoints(points
    .filter(chooseHousingType)
    .filter(chooseHousingPriceRange)
    .filter(chooseNumberOfRooms)
    .slice(0, SIMILAR_ADS_COUNT)));
});

housingGuests.addEventListener('input', () => {
  firstLayerPoints.then(() => firstLayerGroup.clearLayers());
  fetchData().then((points) => renderPoints(points
    .filter(chooseHousingType)
    .filter(chooseHousingPriceRange)
    .filter(chooseNumberOfRooms)
    .filter(chooseNumberOfGuests)
    .slice(0, SIMILAR_ADS_COUNT)));
});

export {map, mainMarker, CITY_CENTRE_TOKYO, formAddressInput, initialCoords, firstLayerPoints};
