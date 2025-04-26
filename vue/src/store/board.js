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
    score: 0,
  },

  getters: {
    isSelected: (state) => (index) => state.selectedCell === index,
    getScore: (state) => state.score,
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
    addScore(state, points) {
      state.score += points;
    },
    resetScore(state) {
      state.score = 0;
    },
  },

  actions: {
    async generateBoard({ state, dispatch, commit }) {
      const board = Array.from({ length: state.boardSize ** 2 }, () => ({
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        position: { x: 0, y: 0 },
      }));
      commit('setBoard', board);
      dispatch('updateAllPositions');
      await dispatch('processMatches');
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

    clearMatches({ state, commit, dispatch }) {
      const size = state.boardSize;
      const board = state.board;
      const matchedGroups = [];
      const visited = new Set();

      // Поиск всех горизонтальных и вертикальных цепочек
      for (let i = 0; i < board.length; i++) {
        if (!board[i].color) continue;

        const row = getRow(size, i);
        const col = getCol(size, i);

        // Горизонтальные совпадения
        if (col <= size - 3) {
          const color = board[i].color;
          const line = [i];
          for (let offset = 1; col + offset < size; offset++) {
            const next = i + offset;
            if (board[next].color === color) {
              line.push(next);
            } else break;
          }
          if (line.length >= 3) {
            matchedGroups.push(line);
            line.forEach(idx => visited.add(idx));
          }
        }

        // Вертикальные совпадения
        if (row <= size - 3) {
          const color = board[i].color;
          const line = [i];
          for (let offset = 1; row + offset < size; offset++) {
            const next = i + offset * size;
            if (board[next].color === color) {
              line.push(next);
            } else break;
          }
          if (line.length >= 3) {
            matchedGroups.push(line);
            line.forEach(idx => visited.add(idx));
          }
        }
      }

      const toClear = new Set();
      matchedGroups.forEach(group => group.forEach(i => toClear.add(i)));

      // Подсчёт очков с множителями
      let score = 0;
      matchedGroups.forEach(group => {
        const base = group.length * 10;
        const multiplier = group.length === 3 ? 1 : group.length === 4 ? 1.5 : 2;
        score += Math.floor(base * multiplier);
      });

      // Проверка на перекрёстные совпадения
      const intersectMap = {};
      matchedGroups.flat().forEach(i => {
        intersectMap[i] = (intersectMap[i] || 0) + 1;
      });
      const crossBonus = Object.values(intersectMap).filter(c => c > 1).length * 20;
      score += crossBonus;

      commit('addScore', score);

      toClear.forEach(i => {
        state.board[i].isFading = true;
      });

      setTimeout(() => {
        toClear.forEach(i => {
          commit('updateBoardCell', { index: i, color: '' });
          state.board[i].isFading = false;
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