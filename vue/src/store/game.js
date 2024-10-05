import Vue from "vue";
import levels from '@/assets/levels.json';

export default {
  namespaced: true,
  state: {
    grid: [],
    selectedGrid: [],
    cellTypes: [1, 2, 3, 4],
  },
  getters: {
    getGrid: (state) => state.grid,
    selectedGrid: (state) => state.selectedGrid,
    cellTypes: (state) => state.cellTypes,
  },
  mutations: {
    setGrid(state, grid) {
      state.grid = grid;
    },
    setSelectedGrid(state, selectedGrid) {
      state.selectedGrid = selectedGrid;
    },
    updateCell(state, { row, col, cellType }) {
      state.grid[row][col] = cellType;
    },
    toggleSelectedCell(state, { row, col }) {
      Vue.set(state.selectedGrid[row], col, !state.selectedGrid[row][col]);
    },
  },
  actions: {
    loadLevel({ commit }, levelNumber) {
      try {
        const levelData = levels.levels[levelNumber];
        if (levelData) {
          commit('setGrid', levelData);
          const emptySelectedGrid = levelData.map(row => row.map(() => false));
          commit('setSelectedGrid', emptySelectedGrid);
        }
      } catch (error) {
        console.error("Failed to load level:", error);
      }
    },
    updateCell({ commit }, payload) {
      commit("updateCell", payload);
    },
    toggleSelectedCell({ commit }, payload) {
      commit("toggleSelectedCell", payload);
    },
  }
}
