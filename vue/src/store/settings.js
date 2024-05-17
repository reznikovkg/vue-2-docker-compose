export const SETTINGS = "settings"

export default {
  namespaced: true,
  state: {
    mode: false,
    statusAPI: false
  },
  getters: {
    getMode: (state) => state.mode,
    getStatusAPI: (state) => state.statusAPI
  },
  mutations: {
    setMode: (state, payload) => {
      state.mode = payload
      localStorage.setItem('mode', JSON.stringify(state.mode))
    },
    setStatusAPI: (state, payload) => {
      state.statusAPI = payload
      localStorage.setItem('api', JSON.stringify(state.statusAPI))
    },
  },
  actions: {
    setMode: ({ commit }, payload) => {
      commit('setMode', payload)
    },
    setStatusAPI: ({ commit }, payload) => {
      commit('setStatusAPI', payload)
    }
  }
}