import { data } from "../components/catalog/mockData";

export default {
  state: {
    cards: [],
  },
  getters: {
    getCards: (state) => state.cards,
    getCardById: (state) => (id) => state.cards.find((card) => card.id === id),
    generateId: (state) => {
      if (state.cards.length === 0) {
        return 1;
      }

      return state.cards[state.cards.length - 1].id + 1;
    }
  },
  mutations: {
    setCards: (state, newCards) => {
      state.cards = newCards;
    },
    addOneCard: (state, card) => {
      state.cards.push(card);
    },
  },
  actions: {
    async fetchMockData({ commit }) {
      commit("setCards", data);
    },
  },
};
