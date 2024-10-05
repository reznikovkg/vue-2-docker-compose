import { Player } from '@/engine/player';
import { GamePhases, INIT_DECK, ROUNDS_TO_WIN, TurnStates, Winners } from '@/engine/constants';

export class GameEngine {
  player = new Player(INIT_DECK);
  opponent = new Player(INIT_DECK);
  currentPhase = GamePhases.MULLIGAN;
  currentTurn = TurnStates.PLAYER;
  round = 1;
  opponentTurnsQuantity = 0;

  performMulligan(indexesToRemove) {
    this.player.performMulligan(indexesToRemove);
    this.currentPhase = GamePhases.ROUND_IN_PROGRESS;
  }

  endPlayerTurn(passed) {
    if (passed) {
      if (this.opponent.passed) {
        this.endRound();
        return;
      } else {
        this.player.pass();
      }
    }

    this.currentTurn = TurnStates.OPPONENT;
    this.performOpponentActions();
  }

  playCard(cardIndex) {
    if (this.currentTurn !== TurnStates.PLAYER) {
      return;
    }

    this.player.playCard(cardIndex);
    this.endPlayerTurn(false);
  }

  endOpponentTurn(passed) {
    if (passed) {
      if (this.player.passed) {
        this.endRound();
        return;
      } else {
        this.opponent.pass();
      }
    }

    this.currentTurn = TurnStates.PLAYER;
  }

  performOpponentActions() {
    if (this.currentTurn !== TurnStates.OPPONENT) {
      return;
    }

    const cards = this.opponent.cards;
    const bestCardIndex = cards.reduce((card, bestCardIndex, i) => card.score > cards[bestCardIndex].score ? i : bestCardIndex, 0);
    this.opponent.playCard(bestCardIndex);
    this.opponentTurnsQuantity++;
    this.endOpponentTurn(this.opponentTurnsQuantity > 3);
  }

  endRound() {
    if (this.player.board.getTotalScore() > this.opponent.board.getTotalScore()) {
      this.player.gameScore++;
    } else {
      this.opponent.gameScore++;
    }

    const winner = this.getWinner();

    if (!winner) {
      this.round++;
    } else {
      this.currentPhase = GamePhases.END;
    }

    this.player.prepareToRound();
    this.opponent.prepareToRound();
    this.opponentTurnsQuantity = 0;

    return winner;
  }

  getWinner() {
    if (this.player.gameScore.gameScore >= ROUNDS_TO_WIN) {
      this.currentPhase = GamePhases.END;
      return Winners.PLAYER;
    }

    if (this.opponent.gameScore.gameScore >= ROUNDS_TO_WIN) {
      this.currentPhase = GamePhases.END;
      return Winners.OPPONENT;
    }

    return null;
  }
}
