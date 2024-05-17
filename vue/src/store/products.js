import axios from 'axios';

export const PRODUCTS = "products"

export default {
  namespaced: true,
  state: {
    products: [],
  },
  getters: {
    getProducts: (state) => state.products,
    getProductByID: (state) => (id) => state.products.find((product) => product.id === id),
    getSearchedProducts: (state) => (filterFunction) => state.products.filter(filterFunction),
  },
  mutations: {
    setProducts: (state, payload) => {
      state.products = payload
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    searchedProducts: (state, payload) => {
      state.products = payload
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    clearProducts: (state) => {
      state.products = []
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    createProduct: (state, payload) => {
      const product = {...payload, id: state.products.length + 1}
      state.products.push(product)
      localStorage.setItem(PRODUCTS, JSON.stringify(state.products))
    },
    editProduct: (state, payload) => {
      state.products = state.products.map((p) => (p.id === payload.id ? { ...p, ...payload } : p))
      localStorage.setItem(PRODUCTS, JSON.stringify(state.products))
    },
    deleteProduct: (state, payload) => {
      state.products = state.products.filter((product) => product.id != payload.id)
      localStorage.setItem(PRODUCTS, JSON.stringify(state.products))
    }
  },
  actions: {
    getProductsFromAPI: ({ commit }) => {
      axios.get('https://dummyjson.com/products')
        .then(res => {
          commit("setProducts", res.data.products)
        })
        .catch(error => {
          console.error("Error while fetching:", error);
        });
    },
    searchProducts: async({ commit }, name) => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/search?q=${name}`)
        commit('searchedProducts', res.data.products)
      } catch (error) {
        console.error('Error searching products by name:', error)
      }
    },
    clearProducts: ({ commit }) => {
      commit("clearProducts")
    },
    createProduct: ({ commit }, payload) => {
      commit("createProduct", payload)
    },
    editProduct: ({ commit }, payload) => {
      commit("editProduct", payload)
    },
    deleteProduct: ({ commit }, payload) => {
      commit("deleteProduct", payload)
    },
  }
}