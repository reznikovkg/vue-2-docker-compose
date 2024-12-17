export class AbilityContext {
  engine = null;

  constructor(engine) {
    this.engine = engine;
  }

  getEngine() {
    return this.engine;
  }
}

export class PlayCardAbilityContext extends AbilityContext {
  cardIndex = null;
  position = null;

  constructor(engine, cardIndex, position) {
    super(engine);

    this.cardIndex = cardIndex;
    this.position = position;
  }

  getCardIndex() {
    return this.cardIndex;
  }

  getPosition() {
    return this.position;
  }
}

export class PlayCardAbilityResponse {
  dropPlayerCard = false;

  constructor(dropPlayerCard = false) {
    this.dropPlayerCard = dropPlayerCard;
  }

  getDropPlayerCard() {
    return this.dropPlayerCard;
  }
}

export class AbilityCollection {
  playCardAbility = null;

  constructor(playCardAbility = null) {
    this.playCardAbility = playCardAbility;
  }

  onPlayCardAbility(context) {
    return this.playCardAbility?.(context);
  }
}
