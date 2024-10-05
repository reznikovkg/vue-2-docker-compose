export const MAX_CARDS_PER_LINE = 7;

export const GamePhases = {
  MULLIGAN: 1,
  ROUND_IN_PROGRESS: 2,
  END: 3,
};

export const TurnStates = {
  PLAYER: 1,
  OPPONENT: 2,
};

export const Winners = {
  PLAYER: 1,
  OPPONENT: 2,
}

export const CardType = {
  MELEE: 1,
  RANGE: 2,
};

export const CARDS_IN_DECK_QUANTITY = 30;

export const INIT_DECK = new Array(CARDS_IN_DECK_QUANTITY).fill({
  score: 1,
  type: CardType.MELEE,
});

export const MAX_CARDS_IN_HAND = 10;

export const MAX_MULLIGAN_CARDS_QUANTITY = 3;

export const ROUNDS_TO_WIN = 2;

export const NEW_ROUND_DRAW_CARDS_QUANTITY = 3;
