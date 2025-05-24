const state = {
  startTime: null,
  elapsedTime: 0,
  timerInterval: null
}

const getters = {
  getFormattedTime: state => {
    const minutes = Math.floor(state.elapsedTime / 60000)
    const seconds = Math.floor((state.elapsedTime % 60000) / 1000)
    let minutesString = minutes.toString()
    if (minutesString.length < 2) {
      minutesString = "0" + minutesString
    }
    let secondsString = seconds.toString()
    if (secondsString.length < 2) {
      secondsString = "0" + secondsString
    }
    return minutesString + ":" + secondsString
    }
}

const mutations = {
  setStartTime: (state, startTime) => {
    state.startTime = startTime
  },
  setElapsedTime: (state, elapsedTime) => {
    state.elapsedTime = elapsedTime
  },
  setTimerInterval: (state, timerInterval) => {
    state.timerInterval = timerInterval
  }
}

const actions = {
  startTimer: ({ commit, state }) => {
    commit('setStartTime', Date.now())
    const interval = setInterval(() => {
      commit('setElapsedTime', Date.now() - state.startTime)
    }, 1)
    commit('setTimerInterval', interval)
  },
  stopTimer: ({ commit }) => {
    clearInterval(state.timerInterval)
    commit('setTimerInterval', null)
  },
  resetTimer: ({ commit }) => {
    commit('setElapsedTime', 0)
    commit('setStartTime', null)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
