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
    gridRows: (state) => state.grid.length,
    gridColumns: (state) => state.grid[0].length,
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
    setGridSize(state, { rows, columns }) {
      const defaultCellType = 2;
      if (state.grid.length < rows) {
        for (let i = state.grid.length; i < rows; i++) {
          state.grid.push(new Array(columns).fill(defaultCellType));
          state.selectedGrid.push(new Array(columns).fill(false));
        }
      } else if (state.grid.length > rows) {
        state.grid = state.grid.slice(0, rows);
        state.selectedGrid = state.selectedGrid.slice(0, rows);
      }

      state.grid = state.grid.map((row) => {
        if (row.length < columns) {
          return [...row, ...new Array(columns - row.length).fill(defaultCellType)];
        } else if (row.length > columns) {
          return row.slice(0, columns);
        }
        return row;
      });

      state.selectedGrid = state.selectedGrid.map((row) => {
        if (row.length < columns) {
          return [...row, ...new Array(columns - row.length).fill(false)];
        } else if (row.length > columns) {
          return row.slice(0, columns);
        }
        return row;
      });
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
    setGridSize({ commit }, payload) {
      commit("setGridSize", payload);
    },
  },
};
