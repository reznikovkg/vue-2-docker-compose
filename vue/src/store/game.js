import Vue from "vue";

export default {
  namespaced: true,
  state: {
    grid: [
      [1, 2, 3, 4, 2],
      [4, 3, 2, 1, 3],
      [1, 2, 3, 4, 4],
      [4, 3, 2, 1, 1],
    ],
    selectedGrid: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ],
    cellTypes: [1, 2, 3, 4],
  },
  getters: {
    getGrid: (state) => state.grid,
    selectedGrid: (state) => state.selectedGrid,
    cellTypes: (state) => state.cellTypes,
  },
  mutations: {
    updateCell(state, { row, col, cellType }) {
      state.grid[row][col] = cellType;
    },
    toggleSelectedCell(state, { row, col }) {
      Vue.set(state.selectedGrid[row], col, !state.selectedGrid[row][col]);
    },
  },
  actions: {
    updateCell({ commit }, payload) {
      commit("updateCell", payload);
    },
    toggleSelectedCell({ commit }, payload) {
      commit("toggleSelectedCell", payload);
    },
  }
}
