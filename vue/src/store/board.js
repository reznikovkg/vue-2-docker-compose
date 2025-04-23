const COLORS = [
  '#FF0000', '#024217', '#0000FF', '#FFFF00',
  '#FF00FF', '#00FFFF', '#a87532', '#28fa6e'
];

const getIndex = (boardSize, row, col) => row * boardSize + col;
const getRow = (boardSize, index) => Math.floor(index / boardSize);
const getCol = (boardSize, index) => index % boardSize;

export default {
  namespaced: true,
  state: {
    boardSize: 8,
    board: [],
    selectedCell: null,
  },

  getters: {
    isSelected: (state) => (index) => state.selectedCell === index,
  },

  mutations: {
    setBoard(state, board) {
      state.board = board;
    },
    setSelectedCell(state, index) {
      state.selectedCell = index;
    },
    clearSelectedCell(state) {
      state.selectedCell = null;
    },
    updateBoardCell(state, { index, color }) {
      if (color !== undefined) state.board[index].color = color;
      if ('isAppearing' in arguments[0]) {
        state.board[index].isAppearing = arguments[0].isAppearing;
      }
      setTimeout(() => {
        state.board.forEach((cell) => {
          if (cell.isAppearing) {
            cell.isAppearing = false;
          }
        });
      }, 600);
    },
    updateCellPosition(state, { index, position }) {
      state.board[index].position = position;
    },
  },

  actions: {
    generateBoard({ state, dispatch, commit }) {
      const board = Array.from({ length: state.boardSize ** 2 }, () => ({
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        position: { x: 0, y: 0 },
      }));
      commit('setBoard', board);
      dispatch('updateAllPositions');
    },

    async handleCellClick({ state, dispatch, commit }, clickedCellIndex) {
      if (state.selectedCell === null) {
        commit('setSelectedCell', clickedCellIndex);
        return;
      }

      const neighbors = await dispatch('getNeighbors', state.selectedCell);
      if (!neighbors.includes(clickedCellIndex)) return;

      const afterSwapBoard = [...state.board.map(cell => ({ ...cell }))];
      [afterSwapBoard[clickedCellIndex], afterSwapBoard[state.selectedCell]] =
          [afterSwapBoard[state.selectedCell], afterSwapBoard[clickedCellIndex]];

      if (await dispatch('hasMatches', afterSwapBoard)) {
        commit('setBoard', afterSwapBoard);
        dispatch('processMatches');
      }

      commit('clearSelectedCell');
    },

    getNeighbors({ state }, index) {
      const row = getRow(state.boardSize, index);
      const col = getCol(state.boardSize, index);
      const neighbors = [];

      if (row > 0) neighbors.push(getIndex(state.boardSize, row - 1, col));
      if (row < state.boardSize - 1) neighbors.push(getIndex(state.boardSize, row + 1, col));
      if (col > 0) neighbors.push(getIndex(state.boardSize, row, col - 1));
      if (col < state.boardSize - 1) neighbors.push(getIndex(state.boardSize, row, col + 1));

      return neighbors;
    },

    async processMatches({ state, dispatch }) {
      while (await dispatch('hasMatches', state.board)) {
        await dispatch('clearMatches');
        await new Promise(resolve => setTimeout(resolve, 600));

        await dispatch('dropBalls');
        await new Promise(resolve => setTimeout(resolve, 600));

        await dispatch('generateNewBalls');
        await new Promise(resolve => setTimeout(resolve, 600));
      }
    },

    dropBalls({ state, dispatch, commit }) {
      const size = state.boardSize;

      for (let col = 0; col < size; col++) {
        for (let row = size - 1; row >= 0; row--) {
          const index = getIndex(size, row, col);
          if (state.board[index].color === '') {
            for (let k = row - 1; k >= 0; k--) {
              const upperIndex = getIndex(size, k, col);
              if (state.board[upperIndex].color !== '') {
                commit('updateBoardCell', {
                  index,
                  color: state.board[upperIndex].color,
                });
                commit('updateBoardCell', {
                  index: upperIndex,
                  color: '',
                });
                break;
              }
            }
          }
        }
      }
      dispatch('updateAllPositions');
    },

    hasMatches(_, board) {
      const size = Math.sqrt(board.length);
      return board.some((cell, i) => {
        if (!cell.color) return false;
        const row = getRow(size, i);
        const col = getCol(size, i);
        return (
            col < size - 2 &&
            cell.color === board[i + 1]?.color &&
            cell.color === board[i + 2]?.color
        ) || (
            row < size - 2 &&
            cell.color === board[i + size]?.color &&
            cell.color === board[i + size * 2]?.color
        );
      });
    },

    clearMatches({ state, commit, dispatch}) {
      const size = state.boardSize;
      const toClear = new Set();
      state.board.forEach((cell, i) => {
        if (!cell.color) return;
        const row = getRow(size, i);
        const col = getCol(size, i);

        if (
            col < size - 2 &&
            cell.color === state.board[i + 1]?.color &&
            cell.color === state.board[i + 2]?.color
        ) {
          toClear.add(i);
          toClear.add(i + 1);
          toClear.add(i + 2);
        }

        if (
            row < size - 2 &&
            cell.color === state.board[i + size]?.color &&
            cell.color === state.board[i + size * 2]?.color
        ) {
          toClear.add(i);
          toClear.add(i + size);
          toClear.add(i + size * 2);
        }
      });

      toClear.forEach(index => {
        state.board[index].isFading = true;
      });

      setTimeout(() => {
        toClear.forEach(index => {
          commit('updateBoardCell', { index, color: '' });
          state.board[index].isFading = false;
        });
        dispatch('updateAllPositions');
      }, 600);
    },

    generateNewBalls({ state, dispatch, commit }) {
      const newAppeared = [];
      state.board.forEach((cell, index) => {
        if (cell.color === '') {
          commit('updateBoardCell', {
            index,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            isAppearing: true
          });
          newAppeared.push(index);
        }
      });
      setTimeout(() => {
        newAppeared.forEach(index => {
          state.board[index].isAppearing = false;
        });
      }, 600);
      dispatch('updateAllPositions');
    },

    updateAllPositions({ state, commit }) {
      const cellSize = 60;
      const gapSize = 4;
      const size = state.boardSize;
      state.board.forEach((_, index) => {
        const row = Math.floor(index / size);
        const col = index % size;
        const x = col * (cellSize + gapSize);
        const y = row * (cellSize + gapSize);
        commit("updateCellPosition", { index, position: { x, y } });
      });
    },
  },
};