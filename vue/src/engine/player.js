import { Board } from "@/engine/board";
import { Lines } from "@/engine/constants";

export class Player {
  cards = [];
  score = 0;
  deck = [];
  board = new Board();

  // TODO: recalculate score
  playCard(cardIndex, line) {
    switch (line) {
      case Lines.FIRST:
        return this.board.addFirstLineCard(this.cards[cardIndex]);

      case Lines.SECOND:
        return this.board.addSecondLineCard(this.cards[cardIndex]);

      default:
        return false;
    }
  }
}
