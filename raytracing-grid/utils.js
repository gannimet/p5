const tweakX = (x, theta) => {
  const isRayPointingRight = Math.abs(theta) < HALF_PI;

  return isRayPointingRight ? x : Math.floor(x - 0.1);
};

const tweakY = (y, theta) => {
  const isRayPointingDown = theta > 0;

  return isRayPointingDown ? y : Math.floor(y - 0.1);
};