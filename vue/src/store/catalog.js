

import test from "./mock.json";

export default {
  namespaced: true,
  state: {
    catalog: [],
  },
  getters: {
    getCatalog: (state) => state.catalog,
  },
  mutations: {
    readCatalog: (state) => {
      state.catalog = {
        ...test.itemList,
      };
    },
  },
};
