import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const FISH_TYPES = {
  low: { name: 'Обычная рыба', color: '#3498DB' },
  medium: { name: 'Хорошая рыба', color: '#27AE60' },
  high: { name: 'Редкая рыба', color: '#F39C12' }
}
const FISHING_ZONES = [
  { x: 200, y: 150, radius: 80, type: 'low' },
  { x: 500, y: 300, radius: 60, type: 'medium' },
  { x: 800, y: 200, radius: 40, type: 'high' },
  { x: 400, y: 450, radius: 70, type: 'medium' },
  { x: 900, y: 400, radius: 50, type: 'high' }
]
export default new Vuex.Store({
  state: {
    boatPosition: { x: 600, y: 400 },
    inventory: [],
    fishCaught: 0,
    isFishing: false,
    fishingAttempts: 0,
    fishingSuccess: 0
  },
  getters: {
    boatPosition: state => state.boatPosition,
    inventory: state => state.inventory.map(fish => ({
      ...fish,
      ...FISH_TYPES[fish.type]
    })),
    fishCaught: state => state.fishCaught,
    isFishing: state => state.isFishing,
    fishingZones: () => FISHING_ZONES,
    fishTypes: () => FISH_TYPES,
    fishingAttempts: state => state.fishingAttempts,
    fishingSuccess: state => state.fishingSuccess,
    currentZone: (state) => {
      const boatX = state.boatPosition.x
      const boatY = state.boatPosition.y

      for (const zone of FISHING_ZONES) {
        const distance = Math.sqrt(
            Math.pow(boatX - zone.x, 2) + Math.pow(boatY - zone.y, 2)
        )
        if (distance <= zone.radius) {
          return zone.type
        }
      }
      return 'low'
    }
  },
  mutations: {
    SET_BOAT_POSITION(state, position) {
      state.boatPosition = position
    },
    ADD_FISH_TO_INVENTORY(state, fishType) {
      const existingFish = state.inventory.find(fish => fish.type === fishType)
      if (existingFish) {
        existingFish.count++
      } else {
        state.inventory.push({
          type: fishType,
          count: 1
        })
      }
      state.fishCaught++
    },
    SET_FISHING_STATE(state, isFishing) {
      state.isFishing = isFishing
    },
    INCREMENT_FISHING_ATTEMPTS(state) {
      state.fishingAttempts++
    },
    INCREMENT_FISHING_SUCCESS(state) {
      state.fishingSuccess++
    },
    RESET_FISHING_STATS(state) {
      state.fishingAttempts = 0
      state.fishingSuccess = 0
    },
    LOAD_GAME_DATA(state) {
      const savedData = localStorage.getItem('fishingGameData')
      if (savedData) {
        const data = JSON.parse(savedData)
        state.boatPosition = data.boatPosition || { x: 600, y: 400 }
        state.inventory = data.inventory || []
        state.fishCaught = data.fishCaught || 0
      }
    },
    SAVE_GAME_DATA(state) {
      const gameData = {
        boatPosition: state.boatPosition,
        inventory: state.inventory,
        fishCaught: state.fishCaught
      }
      localStorage.setItem('fishingGameData', JSON.stringify(gameData))
    },
    RESET_GAME(state) {
      state.boatPosition = { x: 650, y: 400 }
      state.inventory = []
      state.fishCaught = 0
      state.fishingAttempts = 0
      state.fishingSuccess = 0
      localStorage.removeItem('fishingGameData')
    }
  },
  actions: {

    moveBoat({ commit, state }, movement) {
      const newPosition = {
        x: Math.max(0, Math.min(1200, state.boatPosition.x + movement.x)),
        y: Math.max(0, Math.min(800, state.boatPosition.y + movement.y))
      }
      commit('SET_BOAT_POSITION', newPosition)
      commit('SAVE_GAME_DATA')
    },
    catchFish({ commit, getters }) {
      const currentZone = getters.currentZone
      commit('ADD_FISH_TO_INVENTORY', currentZone)
      commit('SAVE_GAME_DATA')
    },
    startFishing({ commit }) {
      commit('SET_FISHING_STATE', true)
      commit('RESET_FISHING_STATS')
    },
    stopFishing({ commit }) {
      commit('SET_FISHING_STATE', false)
    },
    incrementFishingAttempts({ commit }) {
      commit('INCREMENT_FISHING_ATTEMPTS')
    },
    incrementFishingSuccess({ commit }) {
      commit('INCREMENT_FISHING_SUCCESS')
    },
    loadGameData({ commit }) {
      commit('LOAD_GAME_DATA')
    },
    resetGame({ commit }) {
      commit('RESET_GAME')
    }
  }
})