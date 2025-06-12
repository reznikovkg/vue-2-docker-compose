export default {
  install(Vue, {store}) {
    const memoryRouter = {
      replace(to) {
        store.commit('memoryRouter/REPLACE_CURRENT_ROUTE', to);
      },
      to(to) {
        store.commit('memoryRouter/SET_ROUTE', to);
      },
      back() {
        return store.dispatch('memoryRouter/back');
      },
      get current() {
        return store.getters['memoryRouter/getCurrentRoute'];
      }
    };

    Vue.prototype.$router = memoryRouter;
  }
};