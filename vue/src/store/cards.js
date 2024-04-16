import { data } from '../components/catalog/mockData';

export default {
  state: {
    cards: [],
  },
  getters: {
    getCards: (state) => state.cards,
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
      commit('setCards', data);
    },
  },
};
