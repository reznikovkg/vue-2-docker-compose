import { MAX_CARDS_PER_LINE } from "@/engine/constants";

export class Board {
  firstLineCards = [];
  secondLineCards = [];

  getFirstLineScore() {
    return this.firstLineCards.reduce((score, card) => score + card.score);
  }

  getSecondLineScore() {
    return this.secondLineCards.reduce((score, card) => score + card.score);
  }

  getTotalScore() {
    return this.getFirstLineScore() + this.getSecondLineScore();
  }

  addFirstLineCard(card) {
    return this.addCardToLine(card, this.firstLineCards);
  }

  addSecondLineCard(card) {
    return this.addCardToLine(card, this.secondLineCards);
  }

  addCardToLine(card, line) {
    if (MAX_CARDS_PER_LINE < line.length) {
      line.push(card);
      return true;
    }

    return false;
  }

  reset() {
    this.firstLineCards = [];
    this.secondLineCards = [];
  }
}
