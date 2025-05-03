  import Vue from 'vue'
  import Vuex from 'vuex'
  Vue.use(Vuex)
  export default new Vuex.Store({
    state: {
      index: 0,
      selectedHero: null,
      heroPosition: null, 
      returningFromDetail: false,
      lastReturnedHeroName: null,
      lastReturnedHeroPosition: null,
    },
    mutations: {
      moveRight(state) {
        const totalItems = 8;
        if (state.index < totalItems - 3) {
          state.index += 3;
        } 
      },
      moveLeft(state) {
        if (state.index > 0) {
          state.index -= 3;
        }
      },
      selectHero(state, payload) {
        state.selectedHero = payload.hero;
        state.heroPosition = payload.position;
      },
      clearHero(state) {
        state.selectedHero = null;
        state.heroPosition = null;
      },
      setReturningHero(state, payload) {
        state.returningFromDetail = true;
        state.lastReturnedHeroName = payload.name;
        state.lastReturnedHeroPosition = payload.position;
      },
      clearReturningHero(state) {
        state.returningFromDetail = false;
        state.lastReturnedHeroName = null;
        state.lastReturnedHeroPosition = null;
      }
    },
    actions: {},
    modules: {}
  })
