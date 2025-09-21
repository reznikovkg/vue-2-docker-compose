import Vue from 'vue'
import Vuex from 'vuex'
import { GAME_CONFIG, GAME_STATES } from './constants'

Vue.use(Vuex)

const state = {
  gameState: GAME_STATES.IDLE,
  isPlaying: false,
  gameOver: false,
  lanes: [
    { notes: [] },
    { notes: [] },
    { notes: [] }
  ],
  activeLanes: [false, false, false],
  score: 0,
  lives: GAME_CONFIG.INITIAL_LIVES,
  noteSpeed: GAME_CONFIG.BASE_NOTE_SPEED,
  baseNoteSpeed: GAME_CONFIG.BASE_NOTE_SPEED,
  maxNoteSpeed: GAME_CONFIG.MAX_NOTE_SPEED,
  speedIncreaseRate: GAME_CONFIG.SPEED_INCREASE_RATE,
  gameStartTime: 0,
  noteId: GAME_CONFIG.DEFAULT_NOTE_ID,
  hitZonePosition: GAME_CONFIG.HIT_ZONE_POSITION,
  noteSpawnInterval: null,
  gameLoop: null
}

const getters = {
  gameOver: state => state.gameOver,
  lanes: state => state.lanes,
  activeLanes: state => state.activeLanes,
  keys: () => GAME_CONFIG.KEYS,
  score: state => state.score,
  lives: state => state.lives,
  noteSpeed: state => state.noteSpeed,
  speedPercentage: state => {
    const minSpeed = GAME_CONFIG.BASE_NOTE_SPEED
    const maxSpeed = GAME_CONFIG.MAX_NOTE_SPEED
    const currentSpeed = state.noteSpeed
    
    return ((currentSpeed - minSpeed) / (maxSpeed - minSpeed)) * 100
  },
  canStartGame: state => state.gameState === GAME_STATES.IDLE || state.gameState === GAME_STATES.GAME_OVER,
}

const mutations = {
  SET_GAME_STATE(state, gameState) {
    state.gameState = gameState
    state.isPlaying = gameState === GAME_STATES.PLAYING
    state.gameOver = gameState === GAME_STATES.GAME_OVER
  },

  SET_ACTIVE_LANE(state, { laneIndex, isActive }) {
    state.activeLanes.splice(laneIndex, 1, isActive)
  },
  
  ADD_NOTE(state, { laneIndex, note }) {
    state.lanes[laneIndex].notes.push(note)
  },
  
  REMOVE_NOTE(state, { laneIndex, noteIndex }) {
    state.lanes[laneIndex].notes.splice(noteIndex, 1)
  },
  
  UPDATE_NOTE(state, { laneIndex, noteIndex, updates }) {
    Object.assign(state.lanes[laneIndex].notes[noteIndex], updates)
  },
  
  CLEAR_LANE_NOTES(state, laneIndex) {
    state.lanes[laneIndex].notes = []
  },
  
  ADD_SCORE(state, points) {
    state.score += points
  },

  DECREASE_LIVES(state) {
    state.lives = Math.max(0, state.lives - 1)
  },

  SET_NOTE_SPEED(state, speed) {
    state.noteSpeed = speed
  },
  
  SET_GAME_START_TIME(state, time) {
    state.gameStartTime = time
  },
  
  INCREMENT_NOTE_ID(state) {
    state.noteId++
  },

  SET_NOTE_SPAWN_INTERVAL(state, interval) {
    state.noteSpawnInterval = interval
  },
  
  SET_GAME_LOOP(state, loop) {
    state.gameLoop = loop
  },
  
  CLEAR_INTERVALS(state) {
    if (state.noteSpawnInterval) {
      clearInterval(state.noteSpawnInterval)
      state.noteSpawnInterval = null
    }
    if (state.gameLoop) {
      clearInterval(state.gameLoop)
      state.gameLoop = null
    }
  },

  RESET_GAME(state) {
    state.gameState = GAME_STATES.IDLE
    state.isPlaying = false
    state.gameOver = false
    state.lanes.forEach(lane => lane.notes = [])
    state.activeLanes = [false, false, false]
    state.score = 0
    state.lives = GAME_CONFIG.INITIAL_LIVES
    state.noteSpeed = GAME_CONFIG.BASE_NOTE_SPEED
    state.gameStartTime = 0
    state.noteId = GAME_CONFIG.DEFAULT_NOTE_ID
    if (state.noteSpawnInterval) {
      clearInterval(state.noteSpawnInterval)
      state.noteSpawnInterval = null
    }
    if (state.gameLoop) {
      clearInterval(state.gameLoop)
      state.gameLoop = null
    }
  }
}

const actions = {
  startGame({ commit, dispatch }) {
    commit('RESET_GAME')
    commit('SET_GAME_STATE', GAME_STATES.PLAYING)
    commit('SET_GAME_START_TIME', Date.now())

    const noteSpawnInterval = setInterval(() => {
      dispatch('spawnNote')
    }, GAME_CONFIG.NOTE_SPAWN_INTERVAL)
    commit('SET_NOTE_SPAWN_INTERVAL', noteSpawnInterval)

    const gameLoop = setInterval(() => {
      dispatch('updateNotes')
    }, GAME_CONFIG.GAME_LOOP_INTERVAL)
    commit('SET_GAME_LOOP', gameLoop)
  },
  
  pauseGame({ commit, state }) {
    if (state.gameState !== GAME_STATES.PLAYING)
      return
    commit('SET_GAME_STATE', GAME_STATES.PAUSED)
    commit('CLEAR_INTERVALS')
  },
  
  resetGame({ commit }) {
    commit('RESET_GAME')
  },
  
  endGame({ commit }) {
    commit('SET_GAME_STATE', GAME_STATES.GAME_OVER)
    commit('CLEAR_INTERVALS')
  },

  spawnNote({ commit, state }) {
    if (state.gameState !== GAME_STATES.PLAYING)
      return

    const laneIndex = Math.floor(Math.random() * GAME_CONFIG.LANES_COUNT)
    const note = {
      id: state.noteId,
      position: GAME_CONFIG.DEFAULT_POSITION,
      hit: false,
      miss: false,
      laneIndex: laneIndex
    }
    commit('ADD_NOTE', { laneIndex, note })
    commit('INCREMENT_NOTE_ID')
  },
  
  updateNotes({ commit, state, dispatch }) {
    if (state.gameState !== GAME_STATES.PLAYING)
      return
    dispatch('updateNoteSpeed')
    state.lanes.forEach((lane, laneIndex) => {
      lane.notes.forEach((note, noteIndex) => {
        const newPosition = note.position + state.noteSpeed
        commit('UPDATE_NOTE', { 
          laneIndex, 
          noteIndex, 
          updates: { position: newPosition } 
        })
        if (newPosition > state.hitZonePosition + GAME_CONFIG.HIT_RANGE && !note.hit && !note.miss) {
          commit('UPDATE_NOTE', { 
            laneIndex, 
            noteIndex, 
            updates: { miss: true } 
          })
          dispatch('getHurt')
        }
      })
      const notesToKeep = lane.notes.filter(note => note.position < GAME_CONFIG.NOTE_FILTER_POSITION)
      if (notesToKeep.length !== lane.notes.length) {
        commit('CLEAR_LANE_NOTES', laneIndex)
        notesToKeep.forEach(note => {
          commit('ADD_NOTE', { laneIndex, note })
        })
      }
    })
  },
  
  updateNoteSpeed({ commit, state }) {
    if (state.gameStartTime === 0)
      return
    const currentTime = Date.now()
    const elapsedTime = (currentTime - state.gameStartTime) / 1000
    const speedMultiplier = Math.floor(elapsedTime / GAME_CONFIG.SPEED_INCREASE_INTERVAL)
    const newSpeed = GAME_CONFIG.BASE_NOTE_SPEED + (speedMultiplier * GAME_CONFIG.SPEED_INCREASE_RATE)
    const finalSpeed = Math.min(newSpeed, GAME_CONFIG.MAX_NOTE_SPEED)
    commit('SET_NOTE_SPEED', finalSpeed)
  },

  pressKey({ commit, dispatch, state }, laneIndex) {
    if (state.gameState !== GAME_STATES.PLAYING)
      return
    commit('SET_ACTIVE_LANE', { laneIndex, isActive: true })
    dispatch('checkHits', laneIndex)
  },
  
  releaseKey({ commit, state }, laneIndex) {
    if (state.gameState !== GAME_STATES.PLAYING)
      return
    commit('SET_ACTIVE_LANE', { laneIndex, isActive: false })
  },
  
  hitNote({ dispatch }, laneIndex) {
    dispatch('pressKey', laneIndex)
    setTimeout(() => dispatch('releaseKey', laneIndex), GAME_CONFIG.HIT_NOTE_TIMEOUT)
  },
  
  checkHits({ state, dispatch, commit }, laneIndex) {
    const lane = state.lanes[laneIndex]
    for (let i = 0; i < lane.notes.length; i++) {
      const note = lane.notes[i]
      const distance = Math.abs(note.position - state.hitZonePosition)
      if (!note.hit && !note.miss && distance <= GAME_CONFIG.HIT_RANGE && note.laneIndex === laneIndex) {
        dispatch('registerHit', { laneIndex, noteIndex: i, note, distance })
        commit('REMOVE_NOTE', { laneIndex, noteIndex: i })
        break
      }
    }
  },
  
  registerHit({ commit }) {
    commit('ADD_SCORE', GAME_CONFIG.SCORE_PER_HIT)
  },
  
  getHurt({ commit, state, dispatch }) {
    if (state.lives > 0) {
      commit('DECREASE_LIVES')
      if (state.lives <= 0) {
        dispatch('endGame')
      }
    }
  },

  handleKeyDown({ dispatch, state }, event) {
    if (state.gameState !== GAME_STATES.PLAYING)
      return
    // eslint-disable-next-line no-prototype-builtins
    if (GAME_CONFIG.KEY_MAP.hasOwnProperty(event.key.toLowerCase())) {
      event.preventDefault()
      dispatch('pressKey', GAME_CONFIG.KEY_MAP[event.key.toLowerCase()])
    }
  },
  
  handleKeyUp({ dispatch, state }, event) {
    if (state.gameState !== GAME_STATES.PLAYING)
      return
    // eslint-disable-next-line no-prototype-builtins
    if (GAME_CONFIG.KEY_MAP.hasOwnProperty(event.key.toLowerCase())) {
      event.preventDefault()
      dispatch('releaseKey', GAME_CONFIG.KEY_MAP[event.key.toLowerCase()])
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
