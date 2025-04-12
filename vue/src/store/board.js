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
      state.board[index].color = color;
    },
  },

  actions: {
    generateBoard({ state, commit }) {
      const board = Array.from({ length: state.boardSize ** 2 }, () => ({
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
      commit('setBoard', board);
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

      if (dispatch('hasMatches', afterSwapBoard)) {
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
      do {
        if (!dispatch('hasMatches', state.board)) break;
        await new Promise(resolve => setTimeout(resolve));

        dispatch('clearMatches');
        await new Promise(resolve => setTimeout(resolve));

        dispatch('dropBalls');
        await new Promise(resolve => setTimeout(resolve));

        dispatch('generateNewBalls');
        await new Promise(resolve => setTimeout(resolve));

      } while (dispatch('hasMatches', state.board));
    },

    dropBalls({ state, commit }) {
      const size = state.boardSize;

      for (let col = 0; col < size; col++) {
        let emptySpaces = 0;
        for (let row = size - 1; row >= 0; row--) {
          const index = row * size + col;

          if (state.board[index].color === '') {
            emptySpaces++;
          } else if (emptySpaces > 0) {
            const targetIndex = (row + emptySpaces) * size + col;
            const temp = state.board[index].color;
            commit('updateBoardCell', { index: targetIndex, color: temp });
            commit('updateBoardCell', { index, color: '' });
          }
        }
      }
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

    clearMatches({ state, commit }) {
      const size = state.boardSize;
      state.board.forEach((cell, i) => {
        if (!cell.color) return;
        const row = getRow(size, i);
        const col = getCol(size, i);

        if (
          col < size - 2 &&
          cell.color === state.board[i + 1]?.color &&
          cell.color === state.board[i + 2]?.color
        ) {
          commit('updateBoardCell', { index: i, color: '' });
          commit('updateBoardCell', { index: i + 1, color: '' });
          commit('updateBoardCell', { index: i + 2, color: '' });
        }

        if (
          row < size - 2 &&
          cell.color === state.board[i + size]?.color &&
          cell.color === state.board[i + size * 2]?.color
        ) {
          commit('updateBoardCell', { index: i, color: '' });
          commit('updateBoardCell', { index: i + size, color: '' });
          commit('updateBoardCell', { index: i + size * 2, color: '' });
        }
      });
    },

    generateNewBalls({ state, commit }) {
      state.board.forEach((cell, index) => {
        if (cell.color === '') {
          commit('updateBoardCell', {
            index,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          });
        }
      });
    },
  },
};
