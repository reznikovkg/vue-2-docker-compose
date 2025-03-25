import modals from './modals'
import gameModule from './game';
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  modules: {
    game: gameModule,
    modals
  }
}
