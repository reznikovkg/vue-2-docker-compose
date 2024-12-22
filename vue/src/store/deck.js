import cardStore from "./cards";
import { shuffleArray, randomInteger } from "@/components/common/helpers";

export default {
  namespaced: true,
  state: {
    deck: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4],
    hand: [],
    drawPile: [],
    discardPile: [],
    drawAmount: 5,
    maxHand: 9,
  },
  getters: {
    getDeck: (state) => state.deck.map((index) => cardStore.state.cards[index]),
    getDeckIds: (state) => state.deck,
    getHand: (state) => state.hand.map((index) => cardStore.state.cards[index]),
    getDrawPile: (state) => state.drawPile.map((index) => cardStore.state.cards[index]),
    getDiscardPile: (state) => state.discardPile.map((index) => cardStore.state.cards[index]),
    drawAmount: (state) => state.drawAmount,
    maxHand: (state) => state.maxHand,
  },
  mutations: {
    addCardToDeck: (state, payload) => {
      state.deck = [...state.deck, payload];
    },

    setHand: (state, payload) => {
      state.hand = payload;
    },
    setDrawPile: (state, payload) => {
      state.drawPile = payload;
    },
    setDiscardPile: (state, payload) => {
      state.discardPile = payload;
    },

    addToHand: (state, payload) => {
      state.hand = [...state.hand, payload]
    },
    addToDraw: (state, payload) => {
      state.discardPile = [...state.discardPile, payload]
    },
    addToDiscard: (state, payload) => {
      state.discardPile = [...state.discardPile, payload]
    },
    removeFromHand: (state, payload) => {
      state.hand.splice(payload, 1);
    },
    removeFromDraw: (state, payload) => {
      state.drawPile.splice(payload, 1);
    },
    discardHand: (state) => {
      state.discardPile = [...state.discardPile, ...state.hand];
      state.hand = []
    }
  },
  actions: {
    addCardToDeck: ({ commit }, payload) => {
      commit("addCardToDeck", payload);
    },
    setDrawPile: ({ commit }, payload) => {
      commit("setDrawPile", payload);
    },
    clearHand: ({ commit }) => {
      commit("setHand", []);
    },
    clearDrawPile: ({ commit }) => {
      commit("setDrawPile", []);
    },
    clearDiscardPile: ({ commit }) => {
      commit("setDiscardPile", []);
    },
    clearPiles: ({commit}) => {
      commit("setHand", []);
      commit("setDrawPile", []);
      commit("setDiscardPile", []);
    },
    playCard: ({ commit, state }, payload) => {
      commit("addToDiscard", state.hand[payload]);
      commit("removeFromHand", payload);
    },
    drawCards: ({ commit, state }, payload) => {
      for (let i = 0; i < payload; i++) {
        if (state.drawPile.length == 0 && state.discardPile.length > 0) {
          commit("setDrawPile", shuffleArray(state.discardPile));
          commit("setDiscardPile", []);
        }
        if (state.drawPile.length > 0) {
          if (state.hand.length < state.maxHand) {
            commit("addToHand", state.drawPile[state.drawPile.length-1]);
          } else {
            commit("addToDiscard", state.drawPile[state.drawPile.length-1]);
          }
          commit("removeFromDraw", state.drawPile.length-1);
        }
      }
    },
    discardRandom: ( {commit, state }, payload) => {
      for (let i = 0; i < payload; i++) {
        if (state.hand.length > 0) {
          const index = randomInteger(0, state.hand.length-1);
          commit("addToDiscard", state.hand[index]);
          commit("removeFromHand", index);
        }
      }
    },
    discardHand: ( { commit }) => {
      commit("discardHand");
    }
  },
};
