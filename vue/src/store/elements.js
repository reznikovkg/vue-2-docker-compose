import { recipes } from "./recipes";

export default {
  namespaced: true,
  state: {
    openedElements: ["water", "fire", "earth", "air"],
    tableElements: [],
  },
  getters: {
    getOpenedElements: (state) => {
      return state.openedElements;
    },
    getTableElements: (state) => {
      return state.tableElements;
    },
  },
  mutations: {
    ADD_ITEM_TO_TABLE: (state, element) => {
      state.tableElements = [...state.tableElements, element];
    },
    CLEAR_TABLE: (state) => {
      state.tableElements = [];
    },
    ADD_OPENED_ELEMENT: (state) => {
      const result = recipes[state.tableElements.toSorted().join("")];

      if (result) {
        state.tableElements = [result];
      }
    },
  },
  actions: {
    addItemToTable({ commit }, element) {
      commit("ADD_ITEM_TO_TABLE", element);
    },
    clearTable({ commit }) {
      commit("CLEAR_TABLE");
    },
    addOpenedElement({ commit }) {
      commit("ADD_OPENED_ELEMENT");
    },
  },
};
