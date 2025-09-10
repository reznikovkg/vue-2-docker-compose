function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export class Item {
  constructor({name, price, description, stackable = true}) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stackable = stackable;
    this.count = 0;
    this.id = hashString(`${this.constructor.name}:${this.name}`);
  }

  imageUrl() {
    return `/gear/${this.image}.png`;
  }

  canBuyMore() {
    if (!this.stackable) {
      return this.count == 0;
    } else {
      return true;
    }
  }
}


export class Bait extends Item {
  constructor({effectiveness, image, type, ...base}) {
    super({...base});
    this.effectiveness = effectiveness;
    this.image = image;
    this.type = type;

    if (!this.description) {
      switch (this.type) {
        case "omnivorous":
          this.description = `Наживка для всеядных рыб`;
          break;
        case "predator":
          this.description = `Наживка для хищных рыб`;
          break;
        case "herbivorus":
          this.description = `Наживка для травоядных рыб`;
          break;
      }
    }
  }

  imageUrl() {
    return `/baits/${this.image}.png`;
  }
}

export class Lure extends Item {
  constructor() {
    super({
        name: "Прикормка",
        price: 200,
        description: "Увеличивает шанс на улов.",
        stackable: false
      }
    );
  }

  imageUrl() {
    return "lure.png";
  }
}

export class Reel extends Item {
  constructor({timeLimit, image, handleWeight, ...base}) {
    super({...base, stackable: false});
    this.timeLimit = timeLimit;
    this.image = image;
    this.handleWeight = handleWeight;
  }
}

export class Rod extends Item {
  constructor({image, baseDelay, handleWeight, ...base}) {
    super({...base, stackable: false});
    this.image = image;
    this.equiped = false;
    this.baseDelay = baseDelay;
    this.handleWeight = handleWeight;
  }
}

export class Line extends Item {
  constructor({image, handleWeight, ...base}) {
    super({...base});
    this.image = image;
    this.handleWeight = handleWeight;
  }
}