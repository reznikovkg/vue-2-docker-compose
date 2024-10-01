import ingredients from "./ingredients"

export default {
  namespaced: true,
  state: {
    recipes: [
      {
        id: 1,
        name: 'рецепт 1',
        cover: '*img*',
        description: 'краткое описание рецепта 1',
        ingredients: [
          {
            ingredient_id: 1,
            amount: 0.5
          },
          {
            ingredient_id: 2,
            amount: 200
          },
        ],
        steps: [
          {
            img: '*img*',
            description: ''
          },
          {
            img: '*img*',
            description: ''
          },
          {
            img: '*img*',
            description: ''
          }
        ]
      },
      {
        id: 2,
        name: 'рецепт 2',
        cover: '*img*',
        description: 'краткое описание рецепта 2',
        ingredients: [
          {
            ingredient_id: 1,
            amount: 0.3
          },
          {
            ingredient_id: 3,
            amount: 2
          },
        ],
        steps: [
          {
            img: '*img*',
            description: ''
          },
          {
            img: '*img*',
            description: ''
          },
          {
            img: '*img*',
            description: ''
          },
          {
            img: '*img*',
            description: ''
          }
        ]
      },
      {
        id: 3,
        name: 'рецепт 3',
        cover: '*img*',
        description: 'краткое описание рецепта 3',
        ingredients: [
          {
            ingredient_id: 2,
            amount: 250
          },
          {
            ingredient_id: 3,
            amount: 4
          },
          {
            ingredient_id: 4,
            amount: 150
          },
          {
            ingredient_id: 5,
            amount: 3
          },
        ],
        steps: [
          {
            img: '*img*',
            description: ''
          },
          {
            img: '*img*',
            description: ''
          },
          {
            img: '*img*',
            description: ''
          }
        ]
      },
      {
        id: 4,
        name: 'рецепт 4',
        cover: '*img*',
        description: 'краткое описание рецепта 4',
        ingredients: [
          {
            ingredient_id: 3,
            amount: 300
          },
          {
            ingredient_id: 4,
            amount: 350
          },
          {
            ingredient_id: 5,
            amount: 2
          },
        ],
        steps: [
          {
            img: '*img*',
            description: ''
          },
          {
            img: '*img*',
            description: ''
          }
        ]
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
    loadRecipes: (store, payload = null) => {
      const { commit } = store
      commit('SET_RECIPES', payload)
    }
  }
}