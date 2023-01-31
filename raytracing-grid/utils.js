const successingInteger = (x) => {
  if (Number.isInteger(x)) {
    return x + 1;
  }

  return Math.ceil(x);
};

const predecessingInteger = (x) => {
  if (Number.isInteger(x)) {
    return x - 1;
  }

  return Math.floor(x);
};