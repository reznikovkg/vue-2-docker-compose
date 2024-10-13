export default {
    namespaced: true,
    state: {
        favorites
    },
    getters: {
        getCart: (state) => state.cart
    },
    mutations: {
        addToFavorites: (state, item) => {
            console.log(item);
        },
        removeFromFavorites: (state, item) => {

        },
    }
}