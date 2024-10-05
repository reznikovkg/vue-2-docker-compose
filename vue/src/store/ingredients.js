import ingredients from '@/data/ingredients_data'

export default {
  namespaced: true,
  state: {
    ingredients: ingredients
  },
  getters: {
    getIngredients: (state) => state.ingredients,
    getIngredientById: (state) => (id) => state.ingredients.find(i => i.id === id)
  },
  mutations: {
    SET_INGREDIENTS: (state, payload) => {
      state.ingredients = payload
    },
    ADD_INGREDIENT: (state, payload) => {
      state.ingredients.push(payload)
    }
  },
  actions: {
    loadIngredients: (context, payload = null) => {
      context.commit('SET_INGREDIENTS', payload)
    },
    addIngredient: (context, payload) => {
      context.commit('ADD_INGREDIENT', payload)
    }
  }
}