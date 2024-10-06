import test from "./mock.json";

export default {
  namespaced: true,
  state: {
    catalog: [...test.itemList],
  },
  getters: {
    getCatalog: (state) => state.catalog,
    getItemFromCatalogById: (state) => (itemId) =>
      state.catalog.find((item) => item.id === itemId),
  },
};
