import Vue from 'vue'
import Vuex from 'vuex'
import movement from "@/store/movement"
import areas from "@/store/areas"
import inventory from './inventory'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    movement,
    areas,
    inventory
  }
})
