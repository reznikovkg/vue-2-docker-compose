export default {
    namespaced: true,
    state: {
        favorites: JSON.parse(localStorage.getItem("favorites")) ?? []
    },
    getters: {
        getFavorites: (state) => state.favorites
    },
    mutations: {
        addToFavorites: (state, item) => {
            state.favorites.push(item);
            localStorage.setItem("favorites", JSON.stringify(state.favorites))
        },
        removeFromFavorites: (state, item) => {
            console.log(item, state); 
        },
    },
    actions: {
        addToFavorites: (context, item) => {
            context.commit('addToFavorites', item)
        },
        removeFromFavorites: (context, item) => {
            context.commit('removeFromFavorites', item)
        }
    },
}