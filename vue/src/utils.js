export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min, max) {
  return Math.random() * (max - min + 1) + min;
}

export function getRandomChance(percent) {
  return Math.random() < (percent / 100);
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}