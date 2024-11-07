import * as consts from "./constants"
import * as cards from "./cards"
import {randomInteger} from "@/store/modals";

const GameState = {
    thisPlayerCards: [],
    otherPlayerCards: [],
    thisPlayerCreatures: [],
    otherPlayerCreatures: [],

    thisPlayerDeck: consts.StartDeckSize,
    otherPlayerDeck: consts.StartDeckSize,
    thisPlayerHp: consts.StartFaceHP,
    otherPlayerHp: consts.StartFaceHP,

    thisPlayerMana: consts.StartMana,
    gameInProcess: true
};

for (let i = 0; i < consts.MaxHandSize; i++) {
    GameState.thisPlayerCards.push(randomInteger(0, cards.MaxCardId))
    GameState.otherPlayerCards.push(randomInteger(0, cards.MaxCardId))
}

export default {
    name: "game",

    getGameState() {
        return GameState
    },

    endMove() {
        if (GameState.gameInProcess) {
            GameState.thisPlayerMana = consts.StartMana

            let buffer = GameState.thisPlayerCards
            GameState.thisPlayerCards = GameState.otherPlayerCards
            GameState.otherPlayerCards = buffer

            buffer = GameState.thisPlayerCreatures
            GameState.thisPlayerCreatures = GameState.otherPlayerCreatures
            GameState.otherPlayerCreatures = buffer

            buffer = GameState.thisPlayerDeck
            GameState.thisPlayerDeck = GameState.otherPlayerDeck
            GameState.otherPlayerDeck = buffer

            buffer = GameState.thisPlayerHp
            GameState.thisPlayerHp = GameState.otherPlayerHp
            GameState.otherPlayerHp = buffer

            while (GameState.thisPlayerCards.length < consts.MaxHandSize
            && GameState.thisPlayerDeck > 0) {
                GameState.thisPlayerDeck--
                GameState.thisPlayerCards.push(randomInteger(0, cards.MaxCardId))
            }
        }
    },

    activateCard(index) {
        const cardID = GameState.thisPlayerCards[index]
        const cardInfo = cards.Cards[cardID]

        if (GameState.thisPlayerMana >= cardInfo.cost
            && GameState.thisPlayerCreatures.length < consts.MaxCreaturesForPlayer) {
            GameState.thisPlayerMana -= cardInfo.cost
            GameState.thisPlayerCards.splice(index, 1)
            GameState.thisPlayerCreatures.push({
                name: cardInfo.name,
                attack: cardInfo.attack,
                defence: cardInfo.defence,
            })
        }
    }

}