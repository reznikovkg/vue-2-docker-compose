export default {
  namespaced: true,
  state: {
    cart: JSON.parse(localStorage.getItem("cart")) ?? [],
  },
  getters: {
    getCart: (state) => state.cart,
  },
  mutations: {
    addItemToCart: (state, item) => {
      state.cart.push(item);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    changeItem: (state, item) => {
      state.cart[state.cart.findIndex((elem) => elem.id === item.id)] = item;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeItemFromCart: (state, item) => {
      const index = state.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        state.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeAllItemsFromCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
};
