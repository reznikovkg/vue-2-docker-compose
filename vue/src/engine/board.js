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
    if (MAX_CARDS_PER_LINE > this.firstLineCards.length) {
      this.firstLineCards = [...this.firstLineCards, card]
      return true;
    }

    return false;
  }

  addSecondLineCard(card) {
    if (MAX_CARDS_PER_LINE > this.secondLineCards.length) {
      this.secondLineCards = [...this.secondLineCards, card]
      return true;
    }

    return false;
  }

  removeCardFromFirstLine(index) {
    this.firstLineCards.splice(index, 1);
    this.firstLineCards = [...this.firstLineCards];
  }

  removeCardFromSecondLine(index) {
    this.secondLineCards.splice(index, 1);
    this.secondLineCards = [...this.secondLineCards];
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
