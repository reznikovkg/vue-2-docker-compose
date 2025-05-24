import image from './image'

const state = {
  puzzlePieces: [],
  maxPuzzleContainerWidth: 1000,
  maxPuzzleContainerHeight: 500,
  puzzleContainerWidth: 0,
  puzzleContainerHeight: 0,
  moveHistory: [],
  historyIndex: -1
}

const getters = {
  getPuzzlePieces: state => state.puzzlePieces,
  getPuzzleContainerWidth: state => state.puzzleContainerWidth,
  getPuzzleContainerHeight: state => state.puzzleContainerHeight
}

const mutations = {
  setPuzzlePieces: (state, pieces) => {
    state.puzzlePieces = pieces
  },
  setPuzzleContainerWidth: (state, width) => {
    state.puzzleContainerWidth = width
  },
  setPuzzleContainerHeight: (state, height) => {
    state.puzzleContainerHeight = height
  },
  resetHistory: (state) => {
    state.moveHistory = []
    state.historyIndex = -1
  },
  addMoveToHistory: (state) => {
    state.historyIndex++
    state.moveHistory = state.moveHistory.slice(0, state.historyIndex)
    state.moveHistory.push(JSON.parse(JSON.stringify(state.puzzlePieces)))
  },
  undoMove: (state) => {
    if (state.historyIndex > 0) {
      state.historyIndex--
      state.puzzlePieces = state.moveHistory[state.historyIndex]
      if (state.historyIndex === 0) {
        state.moveHistory = state.moveHistory.slice(0, state.historyIndex)
        state.moveHistory.push(JSON.parse(JSON.stringify(state.puzzlePieces)))
      }
    }
  }
}

const actions = {
  updatePuzzlePieces: ({ commit }, pieces) => {
    commit('setPuzzlePieces', pieces)
  },
  initializePuzzle: ({ commit, state }) => {
    const size = image.state.puzzleCount
    const img = new Image()
    img.src = image.state.imageUrl
    img.onload = () => {
      const imgAspectRatio = img.width / img.height
      const containerAspectRatio = state.maxPuzzleContainerWidth / state.maxPuzzleContainerHeight
      let containerWidth, containerHeight
      if (imgAspectRatio > containerAspectRatio) {
        containerWidth = state.maxPuzzleContainerWidth
        containerHeight = Math.min(state.maxPuzzleContainerHeight, state.maxPuzzleContainerWidth / imgAspectRatio)
      } else {
        containerHeight = state.maxPuzzleContainerHeight
        containerWidth = Math.min(state.maxPuzzleContainerWidth, state.maxPuzzleContainerHeight * imgAspectRatio)
      }
      const pieceWidth = containerWidth / size
      const pieceHeight = containerHeight / size
      const pieces = [];
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          pieces.push({
            src: image.state.imageUrl,
            width: pieceWidth,
            height: pieceHeight,
            correctX: x * pieceWidth,
            correctY: y * pieceHeight,
            x: ( Math.random() < 0.5 ? - pieceWidth / 3: containerWidth - 2 * pieceWidth / 3),
            y: Math.random() * (containerHeight - pieceHeight),
            initialX: x * pieceWidth,
            initialY: y * pieceHeight,
          })
        }
      }
      commit('setPuzzlePieces', pieces)
      commit('setPuzzleContainerWidth', containerWidth)
      commit('setPuzzleContainerHeight', containerHeight)
      commit('resetHistory')
      commit('addMoveToHistory')
    }
  },
  giveHint: ({ commit, state }) => {
    const pieces = state.puzzlePieces
    const misplacedPieces = pieces.filter(piece =>
        Math.abs(piece.x - piece.correctX) !== 0 || Math.abs(piece.y - piece.correctY) !== 0
    )
    if (misplacedPieces.length > 0) {
      const randomPiece = misplacedPieces[Math.floor(Math.random() * misplacedPieces.length)]
      randomPiece.x = randomPiece.correctX
      randomPiece.y = randomPiece.correctY
      commit('setPuzzlePieces', pieces)
      commit('addMoveToHistory')
    }
  },
  recordMove: ({ commit }) => {
    commit('addMoveToHistory')
  },
  undo: ({ commit }) => {
    commit('undoMove')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    image
  }
}
