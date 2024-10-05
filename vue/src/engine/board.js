import { CardType, MAX_CARDS_PER_LINE } from '@/engine/constants';

export class Board {
  firstLineCards = [];
  secondLineCards = [];

  getFirstLineScore() {
    return this.firstLineCards.reduce((score, card) => score + card.score, 0);
  }

  getSecondLineScore() {
    return this.secondLineCards.reduce((score, card) => score + card.score, 0);
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

  addCard(card) {
    switch (card.type) {
      case CardType.MELEE:
        this.addFirstLineCard(card);
        break;

      case CardType.RANGE:
        this.addSecondLineCard(card);
        break;

      default:
        console.error('Invalid cardType: ', card);
    }
  }

  reset() {
    this.firstLineCards = [];
    this.secondLineCards = [];
  }
}
