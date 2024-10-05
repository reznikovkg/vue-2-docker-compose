export default {
    namespaced: true,
    state: {
        cart: JSON.parse(localStorage.getItem("cart")) ?? []
    },
    getters: {
        getCart: (state) => state.cart
    },

    mutations: {
        addItemToCart: (state, item) => {
            state.cart.push(item);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        removeItemFromCart: (state, item) => {
            const index = state.cart.findIndex(cartItem => cartItem.options.every(
                option => item.options.find(itemOption => itemOption.title === option.title).value === option.value
            ))

            if (index !== -1) {
                state.cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(state.cart));
            }

        },

        removeAllItemsFromCart: (state) => {
            state.cart = [];
            localStorage.setItem("cart", JSON.stringify(state.cart));
        }
    }
}