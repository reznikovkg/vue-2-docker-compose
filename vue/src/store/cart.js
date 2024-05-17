export const CART = "cart"

export default {
  namespaced: true,
  state: {
    cart: [],
    totalItems: 0,
    totalSum: 0
  },
  getters: {
    getCart: (state) => state.cart,
    getTotalItems: (state) => state.totalItems,
    getTotalSum: (state) => state.totalSum
  },
  mutations: {
    addProduct: (state, payload) => {
      let updatedCart = []
      let copies = state.cart.filter((product) => product.id == payload.id)
      if(copies.length != 0) {
        updatedCart = copies.map((el) => {
          if (el.id == payload.id) {
            return {
              ...el,
              quantity: el.quantity + 1
            }
          }
          return el
        })
      }
      else {
        updatedCart = [...state.cart, {
          ...payload,
          quantity: 1
        }]
      }
      state.cart = [...updatedCart]
      state.totalItems += 1
      state.totalSum += parseInt(payload.price)
      localStorage.setItem(CART, JSON.stringify(updatedCart))
    },
    deleteProduct: (state, payload) => {
      state.totalItems -= payload.quantity
      state.totalSum -= payload.quantity * parseInt(payload.price)
      state.cart = state.cart.filter((product) => product.id != payload.id)
      localStorage.setItem(CART, JSON.stringify(state.cart))
    },
    plusQuantityProduct: (state, payload) => {
      let updatedCart = [...state.cart]
      updatedCart.map((product) => {
        if(product == payload) {
          product.quantity += 1
        }
      })
      state.cart = [...updatedCart]
      state.totalItems += 1
      state.totalSum += parseInt(payload.price)
      localStorage.setItem(CART, JSON.stringify(state.cart))
    },
    minusQuantityProduct: (state, payload) => {
      let updatedCart = [...state.cart]
      updatedCart.map((product) => {
        if(product == payload) {
          product.quantity -= 1
        }
      })
      state.cart = [...updatedCart]
      state.totalItems -= 1
      state.totalSum -= parseInt(payload.price)
      localStorage.setItem(CART, JSON.stringify(state.cart))
    },
    clearCart: (state) => {
      state.cart = []
      state.totalItems = 0
      state.totalSum = 0
      localStorage.setItem(CART, JSON.stringify(state.cart))
    }
  },
  actions: {
    addProduct: ({ commit }, payload) => {
      commit("addProduct", payload)
      return payload
    },
    deleteProduct: ({ commit }, payload) => {
      commit("deleteProduct", payload)
    },
    plusQuantityProduct: ({ commit }, payload) => {
      commit("plusQuantityProduct", payload)
    },
    minusQuantityProduct: ({ commit }, payload) => {
      commit("minusQuantityProduct", payload)
    },
    clearCart: ({ commit }) => {
      commit("clearCart")
    }
  }
}