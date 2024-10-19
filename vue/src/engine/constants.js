export const MAX_CARDS_PER_LINE = 7;

export const GamePhases = {
  MULLIGAN: 'MULLIGAN',
  ROUND_IN_PROGRESS: 'ROUND_IN_PROGRESS',
  END: 'END',
};

export const TurnStates = {
  PLAYER: 'PLAYER',
  OPPONENT: 'OPPONENT',
};

export const Winners = {
  PLAYER: 'PLAYER',
  OPPONENT: 'OPPONENT',
}

export const CardType = {
  MELEE: 'MELEE',
  RANGE: 'RANGE',
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

export const TIME_TO_TURN_MS = 60 * 1000;
