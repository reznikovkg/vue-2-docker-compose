export default {
  namespaced: true,
  state: {
    grid: [
      [1, 2, 3, 4, 2],
      [4, 3, 2, 1, 3],
      [1, 2, 3, 4, 4],
      [4, 3, 2, 1, 1],
    ]
  },
  getters: {
    getGrid: (state) => state.grid,
  },
  mutations: {
    updateCell(state, { row, col, cellType }) {
      state.grid[row][col] = cellType;
    }
  },
  actions: {
    updateCell({ commit }, payload) {
      commit("updateCell", payload);
    },
  }
}
