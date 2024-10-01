export default {
  namespaced: true,
  state: {
    ingredients: [
      {
        id: 1,
        name: 'ингредиент 1',
        cover: '*img*',
        description: 'описание ингредиента 1',
        measure_unit: 'кг'
      },
      {
        id: 2,
        name: 'ингредиент 2',
        cover: '*img*',
        description: 'описание ингредиента 2',
        measure_unit: 'мл'
      },
      {
        id: 3,
        name: 'ингредиент 3',
        cover: '*img*',
        description: 'описание ингредиента 3',
        measure_unit: 'шт.'
      },
      {
        id: 4,
        name: 'ингредиент 4',
        cover: '*img*',
        description: 'описание ингредиента 4',
        measure_unit: 'г'
      },
      {
        id: 5,
        name: 'ингредиент 5',
        cover: '*img*',
        description: 'описание ингредиента 5',
        measure_unit: 'ч.л.'
      },
    ]
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
    loadIngredients: (store, payload = null) => {
      const { commit } = store
      commit('SET_INGREDIENTS', payload)
    }
  }
}