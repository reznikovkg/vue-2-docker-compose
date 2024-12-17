import { AbilityCollection } from "./ability";

const EmptyAbilityCollection = new AbilityCollection();

export class Card {
  type = null;
  score = null;
  image = null;
  abilities = null;
  new = false;

  constructor(type, score, image, abilities = EmptyAbilityCollection) {
    this.type = type;
    this.score = score;
    this.image = image;
    this.abilities = abilities;
  }

  getType() {
    return this.type;
  }

  getScore() {
    return this.score;
  }

  getImage() {
    return this.image;
  }

  getNew() {
    return this.new;
  }

  setNew(value) {
    this.new = value;
  }

  getAbilities() {
    return this.abilities;
  }
}
