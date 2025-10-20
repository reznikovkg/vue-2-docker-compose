import { Player } from './player';
import { DECK, WinnerStates, TurnStates, MAX_CARDS_IN_HAND, POINTS_TO_WIN } from '@/core/constants';

export class GameEngine {
    instance;
    player = new Player();
    bot = new Player();
    board = [];
    turn = TurnStates.PLAYER;
    winner = WinnerStates.NONE;

    constructor() { 
       this.instance = this;
       const shuffledCards = this.shuffleCards(DECK);
       this.player.cards = shuffledCards.slice(0, MAX_CARDS_IN_HAND);
       const botCards = shuffledCards.slice(MAX_CARDS_IN_HAND, shuffledCards.length);
       this.bot.cards = botCards.toSorted((a,b) => a.rank < b.rank ? 1 : -1);
    }

    getInstance() {
        return this.instance || new GameEngine();
    }

    makePlayerMove(cardId) {
        if(this.turn == TurnStates.BOT){
            return;
        }

        this.board.push(this.player.cards.find(card => card.id == cardId));

        this.player.playCard(cardId);

        this.turn = TurnStates.BOT;

        setTimeout(() => this.makeBotMove(), 1000);
    }

    makeBotMove() {
        this.turn = TurnStates.BOT
        const botCard = this.bot.cards.shift();
        const playerCard = this.board[0]

        if(playerCard.rank > botCard.rank){
            this.player.gameScore++;
        }
        else if(playerCard.rank < botCard.rank){
            this.bot.gameScore++;
        }

        this.board.push(botCard);

        setTimeout(() => this.checkIfSomeOneWin(), 1000);
    }

    checkIfSomeOneWin() {
        if(this.player.cards.length == 0) {
            this.winner = this.findWinner();
            this.clearBoard();
            return;
        }

        if(this.player.gameScore == POINTS_TO_WIN) {
            this.winner = WinnerStates.PLAYER_WINS;
        }

        if(this.bot.gameScore == POINTS_TO_WIN){
            this.winner = WinnerStates.BOT_WINS;
        }

        this.turn = TurnStates.PLAYER;
        this.clearBoard();
    }

    findWinner() {
        if(this.player.gameScore > this.bot.gameScore) {
            return WinnerStates.PLAYER_WINS;
        }
        
        else if (this.player.gameScore == this.bot.gameScore) {
            return WinnerStates.DRAW
        }

        else if (this.player.gameScore < this.bot.gameScore) {
            return WinnerStates.BOT_WINS;
        }
    }

    startNewGame() {
        this.player = new Player();
        this.bot = new Player();
        const shuffledCards = this.shuffleCards(DECK);

        this.player.cards = shuffledCards.slice(0, MAX_CARDS_IN_HAND);
        const botCards = shuffledCards.slice(MAX_CARDS_IN_HAND, shuffledCards.length);
        this.bot.cards = botCards.toReversed();
        this.winner = WinnerStates.NONE;
        this.turn = TurnStates.PLAYER;
    }

    clearBoard(){
        this.board = [];
    }

    shuffleCards(cards){
        let j, temp;
        for(let i = cards.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = cards[j];
            cards[j] = cards[i];
            cards[i] = temp;
        }
        return cards;
    }
}

