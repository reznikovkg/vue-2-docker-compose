import { Card } from "@/engine/card";
import { AbilityCollection, PlayCardAbilityResponse } from "./ability";

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
  new Card(CardType.MELEE, 10, 'geralt-of-rivia.jpeg'),
  new Card(CardType.RANGE, 7, 'triss-merigold.jpeg'),
  new Card(CardType.RANGE, 8, 'yennefer.jpeg'),
  new Card(CardType.MELEE, 2, 'dandelion.jpeg'),
  new Card(CardType.MELEE, 10, 'zoltan-chiva.png'),
  new Card(CardType.MELEE, 9, 'ciri.jpeg', new AbilityCollection(
    (context) => {
      const engine = context.getEngine();
      const oppositeLine = (engine.currentTurn !== TurnStates.PLAYER
        ? engine.player
        : engine.opponent).board.firstLineCards;

      console.log(oppositeLine);

      // Find geralt-of-rivia in the opposite line
      const isFound = oppositeLine.findIndex(card => card.image === 'geralt-of-rivia.jpeg') !== -1;
      console.log(isFound);

      return new PlayCardAbilityResponse(isFound);
    }
  )),
  new Card(CardType.MELEE, 6, 'roche.png'),
  new Card(CardType.MELEE, 10, 'emgir-var-emreis.jpeg'),
  new Card(CardType.RANGE, 7, 'gyunter.jpeg'),
  new Card(CardType.RANGE, 5, 'iorvet.jpeg'),
  new Card(CardType.MELEE, 3, 'kerak.jpeg'),
  new Card(CardType.MELEE, 6, 'lamberd.jpeg'),
  new Card(CardType.MELEE, 4, 'leo-bonart.jpeg'),
  new Card(CardType.MELEE, 9, 'vesemir.jpeg'),
  new Card(CardType.MELEE, 7, 'yapen-zigrin.jpeg'),
];

export const MAX_CARDS_IN_HAND = 10;

export const MAX_MULLIGAN_CARDS_QUANTITY = 3;

export const ROUNDS_TO_WIN = 2;

export const NEW_ROUND_DRAW_CARDS_QUANTITY = 3;

export const TIME_TO_TURN_S = 60;

export const TIME_TO_TURN_MS = TIME_TO_TURN_S * 1000;

export const MAX_OPPONENT_WAIT_MS = 5000;

export const COUNTDOWN_STEP_MS = 1000;

export const OPPONENT_TURNS_PER_ROUND = 3;
