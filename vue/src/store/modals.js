import Vue from "vue";

export default {
  namespaced: true,
  state: {
    modals: {},
  },
  getters: {
    getModals: (state) => Object.values(state.modals),
  },
  mutations: {
    openModal: (state, { component, params }) => {
      const hash = Date.now() + Math.random();
      Vue.set(state.modals, hash, {
        component,
        hash,
        params,
        isVisible: true,
      });
    },
    closeModal: (state, hash) => {
      if (state.modals[hash]) {
        Vue.set(state.modals[hash], 'isVisible', false);
      }
    },
    clearModals: (state) => {
      state.modals = {};
    },
  },
  actions: {
    openModal: ({ commit }, payload) => {
      commit('clearModals');
      commit('openModal', payload);
    },
    closeModal: ({ commit }, hash) => {
      commit('closeModal', hash);
    },
    clearAllModals: ({ commit }) => {
      commit('clearModals');
    },
  },
};
