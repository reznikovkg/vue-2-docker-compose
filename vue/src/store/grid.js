export default {
  namespaced: true,
  state: () => ({
    cells: [],
    buildings: new Map(),
  }),
  mutations: {
    SET_CELLS: (state, cells) => {
      state.cells = cells;
    },
    UPDATE_CELLS: (state, { index, updates }) => {
      Object.assign(state.cells[index], updates);
    },

    INCREMENT_COUNTER: (state, index) => {
      console.log("incrementCounter action called", index);
      console.log(state.cells[index]);
      if (state.cells[index]) {
        state.cells[index].counter++;
      }
    },

    DECREMENT_COUNTER: (state, index) => {
      console.log(state.cells[index].counter);
      if (state.cells[index]) {
        state.cells[index].counter--;
      }
    },

    SET_BUILDING: (state, { key, building }) => {
      state.buildings.set(key, building);
    },
    DELETE_BUILDING: (state, { x, y }) => {
      const key = `${x}-${y}`;
      state.buildings.delete(key);
    },
    RESET_GRID: (state) => {
      state.cells = [];
      state.buildings.clear();
    },
  },
  actions: {
    setCells: ({ commit }, cells) => {
      commit("SET_CELLS", cells);
    },
    updateCells: ({ commit }, payload) => {
      commit("UPDATE_CELLS", payload);
    },

    incrementCounter: ({ commit }, index) => {
      commit("INCREMENT_COUNTER", index);
    },

    decrementCounter: ({ commit }, index) => {
      commit("DECREMENT_COUNTER", index);
    },

    setBuilding: ({ commit }, payload) => {
      commit("SET_BUILDING", payload);
    },
    deleteBuilding: ({ commit }, payload) => {
      commit("DELETE_BUILDING", payload);
    },
    resetGrid: ({ commit }) => {
      commit("RESET_GRID");
    },
    initializeGrid: ({ commit }, { x, y }) => {
      const cells = [];
      for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
          cells.push({
            x: i,
            y: j,
            isOccupied: false,
            activeClass: null,
            children: null,
            temp: null,
            type: null,
            counter: 0,
          });
        }
      }
      commit("SET_CELLS", cells);
    },
  },
};
