export default {
    namespaced: true,
    state: {
        cart: []
    },
    getters: {
        getCart: (state) => state.cart
    },
    mutations: {
        addItemToCart: (state, item) => { 
            //console.log(state.cart)
            state.cart.push(item);
            //this.setCartToLocalStorage(state)
            //this.commit('setCartToLocalStorage');
        },

        removeItemToCart: (state, item) => { 
            const index = state.cart.findIndex(cartItem => cartItem.options.every(
                option => item.options.find(itemOption => itemOption.title === option.title).value === option.value
            ))

            if (index !== -1)
            {
                state.cart.splice(index, 1);
            }
        },

        setCartToLocalStorage: (state) => {
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        getCartFromLocalStorage: (state) => {
            state.cart = JSON.parse(localStorage.getItem("cart")) ?? [];
        },
    }
}