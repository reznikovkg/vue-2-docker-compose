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

export const INIT_DECK = [
  {
    type: CardType.MELEE,
    score: 10,
    image: 'geralt-of-rivia.jpeg',
  },
  {
    type: CardType.RANGE,
    score: 7,
    image: 'triss-merigold.jpeg',
  },
  {
    type: CardType.RANGE,
    score: 8,
    image: 'yennefer.jpeg',
  },
  {
    type: CardType.MELEE,
    score: 2,
    image: 'dandelion.jpeg',
  },
  {
    type: CardType.MELEE,
    score: 10,
    image: 'zoltan-chiva.png',
  },
  {
    type: CardType.MELEE,
    score: 9,
    image: 'ciri.jpeg',
  },
  {
    type: CardType.MELEE,
    score: 6,
    image: 'roche.png',
  },
  {
    type: CardType.MELEE,
    score: 10,
    image: 'emgir-var-emreis.jpeg',
  },
  {
    type: CardType.RANGE,
    score: 7,
    image: 'gyunter.jpeg',
  },
  {
    type: CardType.RANGE,
    score: 5,
    image: 'iorvet.jpeg',
  },
  {
    type: CardType.MELEE,
    score: 3,
    image: 'kerak.jpeg',
  },
  {
    type: CardType.MELEE,
    score: 6,
    image: 'lamberd.jpeg',
  },
  {
    type: CardType.MELEE,
    score: 4,
    image: 'leo-bonart.jpeg',
  },
  {
    type: CardType.MELEE,
    score: 9,
    image: 'vesemir.jpeg',
  },
  {
    type: CardType.MELEE,
    score: 7,
    image: 'yapen-zigrin.jpeg',
  },
].map(card => ({ ...card, new: false }));

export const MAX_CARDS_IN_HAND = 10;

export const MAX_MULLIGAN_CARDS_QUANTITY = 3;

export const ROUNDS_TO_WIN = 2;

export const NEW_ROUND_DRAW_CARDS_QUANTITY = 3;

export const TIME_TO_TURN_S = 60;

export const TIME_TO_TURN_MS = TIME_TO_TURN_S * 1000;

export const MAX_OPPONENT_WAIT_MS = 5000;

export const COUNTDOWN_STEP_MS = 1000;

export const OPPONENT_TURNS_PER_ROUND = 3;
