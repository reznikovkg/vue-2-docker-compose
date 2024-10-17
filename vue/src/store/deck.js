import Vue from 'vue'
import Vuex from 'vuex'
import cardStore from './cards'

Vue.use(Vuex)

export default {
	namespaced: true,
	state: {
        startingDeck: [0, 0, 1],
        deck: [0, 0, 1],
        hand: [0, 0, 1, 1, 0],
        drawPile: [],
        discardPile: [],
    },
    getters: {
        getDeck: (state) => state.deck.map(index => cardStore.state.cards[index]),
        getHand: (state) => state.hand.map(index => cardStore.state.cards[index]),
        getDrawPile: (state) => state.drawPile.map(index => cardStore.state.cards[index]),
        getDiscardPile: (state) => state.discardPile.map(index => cardStore.state.cards[index]),
    },
    mutations: {

    },
    actions: {

    },
}