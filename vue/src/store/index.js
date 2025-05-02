import Vue from 'vue'
import Vuex from 'vuex'
import agreement from './modules/agreement'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
     agreement
  }
})