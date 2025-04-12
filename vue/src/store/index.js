import Vue from 'vue';
import Vuex from 'vuex';
import board from './board';
import modals from './modals'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    modals,
    board,
  },
});
