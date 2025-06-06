import image from './image'

const state = {
  puzzlePieces: [],
  piecePadding: 0,
  maxPuzzleContainerWidth: 1000,
  maxPuzzleContainerHeight: 450,
  puzzleContainerWidth: 0,
  puzzleContainerHeight: 0,
  moveHistory: [],
  historyIndex: -1
}

const getters = {
  getPuzzlePieces: state => state.puzzlePieces,
  getPiecePadding: state => state.piecePadding,
  getPuzzleContainerWidth: state => state.puzzleContainerWidth,
  getPuzzleContainerHeight: state => state.puzzleContainerHeight
}

const mutations = {
  setPuzzlePieces: (state, pieces) => {
    state.puzzlePieces = pieces
  },
  setPiecePadding: (state, padding) => {
    state.piecePadding = padding
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
      const padding = Math.min(pieceWidth, pieceHeight) * 0.2
      const shapeMatrix = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => [0, 0, 0, 0])
      )
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          if (y === 0) {
            shapeMatrix[y][x][0] = 0
          } else {
            shapeMatrix[y][x][0] = -shapeMatrix[y - 1][x][2]
          }
          if (x === size - 1) {
            shapeMatrix[y][x][1] = 0
          } else {
            shapeMatrix[y][x][1] = Math.random() < 0.5 ? 1 : -1
          }
          if (y === size - 1) {
            shapeMatrix[y][x][2] = 0
          } else {
            shapeMatrix[y][x][2] = Math.random() < 0.5 ? 1 : -1
          }
          if (x === 0) {
            shapeMatrix[y][x][3] = 0
          } else {
            shapeMatrix[y][x][3] = -shapeMatrix[y][x - 1][1]
          }
        }
      }
      const pieces = []
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          pieces.push({
            id: `${x}-${y}`,
            src: image.state.imageUrl,
            width: pieceWidth,
            height: pieceHeight,
            correctX: x * pieceWidth,
            correctY: y * pieceHeight,
            x: Math.random() < 0.5 ? -pieceWidth : containerWidth,
            y: Math.random() * (containerHeight - pieceHeight),
            initialX: x * pieceWidth,
            initialY: y * pieceHeight,
            shape: shapeMatrix[y][x]
          })
        }
      }
      commit('setPuzzlePieces', pieces)
      commit('setPiecePadding', padding)
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
