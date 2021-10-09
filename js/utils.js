const getRandomPositiveInteger = (num1, num2) => {
  const lower = Math.ceil(Math.min(Math.abs(num1), Math.abs(num2)));
  const upper = Math.floor(Math.max(Math.abs(num1), Math.abs(num2)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (num1, num2, digits) => {
  const lower = Math.min(Math.abs(num1), Math.abs(num2));
  const upper = Math.max(Math.abs(num1), Math.abs(num2));
  const result = Math.random() * (upper - lower) + lower;
  return parseFloat(result.toFixed(digits));
};

const getRandomArray = ([...array], length) =>
  Array.from({length: Math.min(array.length, Math.floor(Math.random() * length + 1))},
    () => array.splice(Math.random() * array.length, 1).join(),
  );

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArray};
