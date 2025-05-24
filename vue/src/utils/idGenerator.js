let houseId = 0;
let personId = 0;

export function generateHouseId() {
  return `house-${houseId++}`;
}

export function generatePersonId() {
  return `person-${personId++}`;
}
