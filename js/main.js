// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomfromRange (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (max<min || max <0 || min <0) ? 0 : Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomfromRange (13, 32);

function getRandomFloating (min, max, decimal) {
  const result = (max < min || max <0 || min <0) ? 0 : (Math.random() * (max - min + 1)) + min;
  return result.toFixed(decimal);
}
getRandomFloating (5.754, 60.5, 4);
