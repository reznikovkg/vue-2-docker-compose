import dishes from '@/data/dishes_data'

export default {
  namespaced: true,
  state: {
    dishes: dishes
  },
  getters: {
    getDishes: (state) => state.dishes,
    getDishById: (state) => (id) => state.dishes.find(i => i.id === id),
    
    getDishNames: (state) => {
      let namesList = []
      state.dishes.forEach(dish => {
        if(!namesList.includes(dish.name)) {
          namesList.push(dish.name)
        }
      })
      return namesList
    },

    getDishCategories: (state) => {
      let categoriesList = []
      state.dishes.forEach(dish => {
        if(!categoriesList.includes(dish.dish_category)) {
          categoriesList.push(dish.dish_category)
        }
      })
      return categoriesList
    },

    getDishCuisines: (state) => {
      let cuisinesList = []
      state.dishes.forEach(dish => {
        if(!cuisinesList.includes(dish.cuisine)) {
          cuisinesList.push(dish.cuisine)
        }
      })
      return cuisinesList
    },

    getDishNamesByCategory: (state) => (category) => {
      let namesByCategoryList = []
      state.dishes.forEach(dish => {
        if(dish.dish_category == category && !namesByCategoryList.includes(dish.name)) {
          namesByCategoryList.push(dish.name)
        }
      })
      return namesByCategoryList
    },

    getCuisinesByDishName: (state) => (name) => {
      let cuisinesByDishNameList = []
      state.dishes.forEach(dish => {
        if(dish.name == name && !cuisinesByDishNameList.includes(dish.cuisine)) {
          cuisinesByDishNameList.push(dish.cuisine)
        }
      })
      return cuisinesByDishNameList
    }
  },
  mutations: {
    SET_DISHES: (state, payload) => {
      state.dishes = payload
    },
    ADD_DISH: (state, payload) => {
      state.dishes.push(payload)
    }
  },
  actions: {
    loadDishes: (context, payload = null) => {
      context.commit('SET_DISHES', payload)
    },
    addDish: (context, payload) => {
      context.commit('ADD_DISH', payload)
    }
  }
}