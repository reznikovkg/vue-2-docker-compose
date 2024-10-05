import recipes from '@/data/recipes_data'

export default {
  namespaced: true,
  state: {
    recipes: recipes
  },
  getters: {
    getRecipes: (state) => state.recipes,
    getRecipeById: (state) => (id) => state.recipes.find(i => i.id === id),
    getRecipesByIngredients: (state) => ({includeList, excludeList}) => {
      let result = state.recipes
      
      if (includeList.length > 0) {
        result = result.filter(recipe => {
          return (recipe.ingredients.map(ingredient =>
            includeList.includes(ingredient.ingredient_id)))
            .reduce(
              (acc, curr) => acc || curr
            )
        })
      }

      if (excludeList.length > 0) {
        result = result.filter(recipe => {
          return (recipe.ingredients.map(ingredient =>
            !excludeList.includes(ingredient.ingredient_id)))
            .reduce(
              (acc, curr) => acc && curr
            )
        })
      }

      return result
    }
  },
  mutations: {
    SET_RECIPES: (state, payload) => {
      state.recipes = payload
    },
    ADD_RECIPE: (state, payload) => {
      state.recipes.push(payload)
    }
  },
  actions: {
    loadRecipes: (context, payload) => {
      context.commit('SET_RECIPES', payload)
    },
    addRecipe: (context, payload) => {
      context.commit('ADD_RECIPE', payload)
    }
  }
}