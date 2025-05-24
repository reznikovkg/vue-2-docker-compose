import image from './image'

const state = {
  puzzlePieces: [],
  maxPuzzleContainerWidth: 1000,
  maxPuzzleContainerHeight: 450,
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
      const edgeTypesMatrix = generateEdgeTypesMatrix(size)
      const pieces = []
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const maskId = `${x}-${y}`
          const svgPath = generatePuzzlePiecePath(pieceWidth, pieceHeight, edgeTypesMatrix[y][x])
          pieces.push({
            id: `${x}-${y}`,
            src: image.state.imageUrl,
            width: pieceWidth,
            height: pieceHeight,
            correctX: x * pieceWidth,
            correctY: y * pieceHeight,
            x: (Math.random() < 0.5 ? -pieceWidth / 3 : containerWidth - 2 * pieceWidth / 3),
            y: Math.random() * (containerHeight - pieceHeight),
            initialX: x * pieceWidth,
            initialY: y * pieceHeight,
            maskId,
            svgPath
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

function generateEdgeTypesMatrix(size) {
  const edgeTypesMatrix = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      top: null, right: null, bottom: null, left: null
    }))
  )
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (y > 0) {
        edgeTypesMatrix[y][x].top = edgeTypesMatrix[y - 1][x].bottom === 'out' ? 'in' : 'out'
      } else {
        edgeTypesMatrix[y][x].top = 'flat'
      }
      if (x < size - 1 && edgeTypesMatrix[y][x].right === null) {
        edgeTypesMatrix[y][x].right = edgeTypesMatrix[y][x].top === 'out' ? 'out' : 'in'
      } else if (x === size - 1) {
        edgeTypesMatrix[y][x].right = 'flat'
      }
      if (y < size - 1 && edgeTypesMatrix[y][x].bottom === null) {
        edgeTypesMatrix[y][x].bottom = Math.random() > 0.5 ? 'out' : 'in'
      } else if (y === size - 1) {
        edgeTypesMatrix[y][x].bottom = 'flat'
      }
      if (x > 0) {
        edgeTypesMatrix[y][x].left = edgeTypesMatrix[y][x - 1].right === 'out' ? 'in' : 'out'
      } else {
        edgeTypesMatrix[y][x].left = 'flat'
      }
      if (y > 0 && x > 0) {
        if (edgeTypesMatrix[y][x].top === 'in' &&
            edgeTypesMatrix[y][x].left === 'in' &&
            edgeTypesMatrix[y - 1][x - 1].bottom === 'in' &&
            edgeTypesMatrix[y - 1][x - 1].right === 'in') {
          if (Math.random() < 0.5 && (edgeTypesMatrix[y][x].top !== 'flat' || edgeTypesMatrix[y - 1][x].bottom !== 'flat')) {
            edgeTypesMatrix[y][x].top = 'out'
            edgeTypesMatrix[y - 1][x].bottom = 'in'
          } else {
            edgeTypesMatrix[y][x].left = 'out'
            edgeTypesMatrix[y][x-1].right = 'in'
          }
        }
      }
      if (y > 0 && x < size) {
        if (edgeTypesMatrix[y][x].top === 'in' &&
            edgeTypesMatrix[y][x].right === 'in' &&
            edgeTypesMatrix[y - 1][x + 1].left === 'in' &&
            edgeTypesMatrix[y - 1][x + 1].bottom === 'in') {
          if (Math.random() > 0.5 && (edgeTypesMatrix[y][x + 1].left !== 'flat' || edgeTypesMatrix[y][x].right !== 'flat')) {
            edgeTypesMatrix[y][x + 1].left = 'in'
            edgeTypesMatrix[y][x].right = 'out'
          } else {
            edgeTypesMatrix[y-1][x].bottom = 'in'
            edgeTypesMatrix[y][x].top = 'out'
          }
        }
      }
      if (y > 0 && x > 0 && y < size && x < size) {
        if (edgeTypesMatrix[y-1][x-1].right === 'out' &&
            edgeTypesMatrix[y][x-1].top === 'out' &&
            edgeTypesMatrix[y][x].left === 'out' &&
            edgeTypesMatrix[y - 1][x].bottom === 'out') {
          edgeTypesMatrix[y][x].left = 'in'
          edgeTypesMatrix[y][x-1].right = 'out'
        }
      }
    }
  }
  return edgeTypesMatrix
}
function generatePuzzlePiecePath(width, height, edgeTypes) {
  const { top, right, bottom, left } = edgeTypes
  const curveSize = Math.min(width, height) * 0.2
  let path = `M 0,0 `
  if (top === 'flat') {
    path += `L ${width},0 `
  } else {
    if (top === 'in')
    {
      path += `L ${width * 0.3},0 `
      path += `Q ${width * 0.5},${curveSize} ${width * 0.7},0 `
      path += `L ${width},0 `
    } else {
      path = `M 0,${curveSize} `
      path += `L 0,${curveSize} `
      path += `L ${width * 0.3},${curveSize} `
      path += `Q ${width * 0.5},0 ${width * 0.7},${curveSize} `
      path += `L ${width},${curveSize} `
    }
  }
  if (right === 'flat') {
    path += `L ${width},${height} `
  } else {
    if (right === 'in') {
      if (top === 'out') {
        path += `L ${width + curveSize},${curveSize} `
        path += `L ${width + curveSize},${height * 0.3} `
      } else {
        path += `L ${width + curveSize},0 `
        path += `L ${width + curveSize},${height * 0.3} `
      }
      path += `Q ${width},${height * 0.5} ${width + curveSize},${height * 0.7} `
      path += `L ${width + curveSize},${height * 0.7} `
      path += `L ${width + curveSize},${height} `
    }
    else {
      path += `L ${width},${height * 0.3} `
      path += `Q ${width + curveSize},${height * 0.5} ${width},${height * 0.7} `
      path += `L ${width},${height} `
    }
  }
  if (bottom === 'flat') {
    path += `L 0,${height} `
  } else {
    if (bottom === 'in') {
      if (right === 'in')
      {
        path += `L ${width + curveSize},${height} `
        path += `L ${width + curveSize},${height + curveSize} `
      }
      else {
        path += `L ${width},${height} `
        path += `L ${width},${height + curveSize} `
      }
      path += `L ${width},${height + curveSize} `
      path += `L ${width * 0.7},${height + curveSize} `
      path += `Q ${width * 0.5},${height} ${width * 0.3},${height + curveSize} `
      path += `L ${width * 0.3},${height + curveSize} `
      path += `L 0,${height + curveSize} `
    }
    else {
      path += `L ${width},${height} `
      path += `L ${width * 0.7},${height} `
      path += `Q ${width * 0.5},${height + curveSize} ${width * 0.3},${height} `
      path += `L 0,${height} `
    }
  }
  if (left === 'flat') {
    path += `L 0,0 `
  } else {
    if (left === 'out') {
      if (bottom === 'in') {
        path += `L 0,${height + curveSize} `
        path += `L ${curveSize},${height + curveSize} `
      } else {
        path += `L 0,${height} `
        path += `L ${curveSize},${height} `
      }
      path += `L ${curveSize},${height * 0.7} `
      path += `Q 0,${height * 0.5} ${curveSize},${height * 0.3} `
      path += `L ${curveSize},${height * 0.3} `
      path += `L ${curveSize},0 `
      if (top === 'out') {
        path += `L ${curveSize},${curveSize} `
        path += `L 0,${curveSize} `
      } else {
        path += `L 0,0 `
      }
    } else {
      path += `L 0,${height * 0.7} `
      path += `Q ${curveSize},${height * 0.5} 0,${height * 0.3} `
      path += `L 0,0 `
    }
  }
  return path
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