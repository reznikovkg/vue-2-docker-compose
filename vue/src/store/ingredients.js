export default {
  namespaced: true,
  state: {
    ingredients: []
  },
  getters: {
    getIngredients: (state) => state.ingredients,
    getIngredientById: (state) => (id) => state.ingredients.find(i => i.id === id)
  },
  mutations: {
    SET_INGREDIENTS: (state, payload) => {
      state.ingredients = payload
    }
  },
  actions: {
    loadIngredients: (store, payload = ['ингредиент 1']) => {
      const { commit } = store
      commit('SET_INGREDIENTS', payload)
    }
  }
}