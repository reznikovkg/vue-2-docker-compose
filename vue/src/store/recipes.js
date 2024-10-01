export default {
  namespaced: true,
  state: {
    recipes: [
      {
        id: 1,
        name: 'рецепт 1',
        description: '',
        steps: ''
      },
      {
        id: 2,
        name: 'рецепт 2',
        description: '',
        steps: ''
      }
    ]
  },
  getters: {
    getRecipes: (state) => state.recipes,
    getRecipeById: (state) => (id) => state.recipes.find(i => i.id === id)
  },
  mutations: {
    SET_RECIPES: (state, payload) => {
      state.recipes = payload
    }
  },
  actions: {
    loadRecipes: (store, payload = ['рецепт 1']) => {
      const { commit } = store
      commit('SET_RECIPES', payload)
    }
  }
}