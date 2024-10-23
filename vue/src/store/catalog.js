import test from './mock.json';

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
    mutations: {
        ADD_ITEM_TO_CATALOG: (state, newItem) => {
            state.catalog.push(newItem);
        },
    },
    actions: {
        addItemToCatalog({ commit }, newItem) {
            commit('ADD_ITEM_TO_CATALOG', newItem);
        },
    },
};
