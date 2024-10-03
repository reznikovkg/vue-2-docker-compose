import test from "./mock.json";

export default {
  namespaced: true,
  state: {
    catalog: [],
  },
  getters: {
    getCatalog: (state) => state.catalog,
    getItemFromCatalogById: (state) => (itemId) =>
      state.catalog.find((item) => item.id === itemId),
  },
  mutations: {
    readCatalog: (state) => {
      state.catalog = [...test.itemList];
    },
  },
};
