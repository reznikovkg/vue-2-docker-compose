//[min, max]
export const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max - min);
  return Math.round(rand);
}

export const shuffleArray = (array) => {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = 
    [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function selectRandomPattern(patterns) {
  var probabilitySum = 0;
  patterns.forEach((pattern) => {
    probabilitySum += pattern.probability;
  });
  
  var random = randomInteger(0, probabilitySum-1);
  for (let i = 0; i < patterns.length; i++) {
    if (random < patterns[i].probability) {
      return structuredClone(patterns[i].pattern);
    }
    random -= patterns[i].probability;
  }
}
