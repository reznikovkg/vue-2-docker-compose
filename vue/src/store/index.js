import modals from './modals'
import Vuex from "vuex";
import Vue from "vue";
import gameEngine from "@/store/game-engine";

Vue.use(Vuex)

const storeRoot = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  modules: {
    modals,
    gameEngine,
  }
}

export default new Vuex.Store(storeRoot)
