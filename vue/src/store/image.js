const state = {
  imageUrl: null,
  puzzleCount: 0
}

const getters = {
  getImageUrl: state => state.imageUrl,
  getPuzzleCount: state => state.puzzleCount
}

const mutations = {
  setImageUrl: (state, url) => {
    state.imageUrl = url
  },
  setPuzzleCount: (state, count) => {
    state.puzzleCount = count
  }
}

const actions = {
  updateImage: ({ commit }, url) => {
    commit('setImageUrl', url)
  },
  updatePuzzleCount: ({ commit }, count) => {
    commit('setPuzzleCount', count)
  },
  loadImage: ({ commit }, file) => {
    if (typeof file === "string") {
      localStorage.setItem('imageUrl', JSON.stringify(file))
      commit('setImageUrl', file)
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        localStorage.setItem('imageUrl', JSON.stringify(imageUrl))
        commit('setImageUrl', imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
