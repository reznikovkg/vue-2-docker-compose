import modals from './modals'
import deck from './deck'
import battle from './battle'
import encounter from './encounter'
import enemy from './enemy'
import cards from './cards'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  modules: {
    modals,
    enemy,
    cards,
    deck,
    battle,
    encounter,
  }
}
