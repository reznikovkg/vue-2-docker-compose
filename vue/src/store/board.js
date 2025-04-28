const COLORS = [
  '#FF0000', '#024217', '#0000FF', '#FFFF00',
  '#FF00FF', '#00FFFF', '#a87532', '#28fa6e'
];

const getIndex = (boardSize, row, col) => row * boardSize + col;
const getRow = (boardSize, index) => Math.floor(index / boardSize);
const getCol = (boardSize, index) => index % boardSize;

const state = {
  boardSize: 8,
  board: [],
  selectedCell: null,
  score: 0,
  combo: {
    lastColor: null,
    count: 0,
    manualMatch: false,
  },
  cellSize: 60,
  gapSize: 4,
  activeAnimations: 0,
}

const getters = {
  isSelected: (state) => (index) => state.selectedCell === index,
  getScore: (state) => state.score,
  board: (state) => state.board,
  boardSize: (state) => state.boardSize,
  cellSize: (state) => state.cellSize,
  gapSize: (state) => state.gapSize
}

const mutations = {
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
    if (color !== undefined) {
      state.board[index].color = color;
    }
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
  setCombo(state, { color, manual }) {
    if (manual && state.combo.lastColor === color) {
      state.combo.count += 1;
    } else {
      state.combo.count = 1;
    }
    state.combo.lastColor = color;
    state.combo.manualMatch = manual;
  },
  resetCombo(state) {
    state.combo = {
      lastColor: null,
      count: 0,
      manualMatch: false,
    };
  },
}

const actions = {
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
    if (!neighbors.includes(clickedCellIndex)) {
      return;
    }

    const afterSwapBoard = [...state.board.map(cell => ({ ...cell }))];
    [afterSwapBoard[clickedCellIndex], afterSwapBoard[state.selectedCell]] =
        [afterSwapBoard[state.selectedCell], afterSwapBoard[clickedCellIndex]];

    if (await dispatch('hasMatches', afterSwapBoard)) {
      const matchedColor = afterSwapBoard[clickedCellIndex].color;
      commit('setBoard', afterSwapBoard);
      commit('setCombo', { color: matchedColor, manual: true });
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

  async processMatches({ state, dispatch, commit }) {
    const { manualMatch: isManual, lastColor: color, count: comboCount } = state.combo;

    while (await dispatch('hasMatches', state.board)) {
      await dispatch('clearMatches');
      await dispatch('waitForAnimations');

      await dispatch('dropBalls');
      await dispatch('waitForAnimations');

      await dispatch('generateNewBalls');
      await dispatch('waitForAnimations');
    }

    if (isManual && comboCount >= 2) {
      await dispatch('triggerComboEffect', color);
      commit('resetCombo');
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
    return new Promise((resolve) => {
      const size = state.boardSize;
      const board = state.board;
      const matchedGroups = [];
      const visited = new Set();

      for (let i = 0; i < board.length; i++) {
        if (!board[i].color) continue;

        const row = getRow(size, i);
        const col = getCol(size, i);

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

      let score = 0;
      matchedGroups.forEach(group => {
        const base = group.length * 10;
        const multiplier = group.length === 3 ? 1 : group.length === 4 ? 1.5 : 2;
        score += Math.floor(base * multiplier);
      });

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
        resolve();
      }, 600);
    });
  },

  generateNewBalls({ state, dispatch, commit }) {
    return new Promise((resolve) => {
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
        dispatch('updateAllPositions');
        resolve();
      }, 600);
    });
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

  async triggerComboEffect({ dispatch }, color) {
    switch (color) {
      case '#FF0000':
      case '#024217':
        dispatch('triggerBlockExplosion');
        break;
      case '#0000FF':
      case '#FFFF00':
        dispatch('triggerBonusScore');
        break;
      case '#00FFFF':
      case '#FF00FF':
        dispatch('triggerLineClear');
        break;
      case '#a87532':
      case '#28fa6e':
        dispatch('triggerColorRepaint');
        break;
    }

    dispatch('dropBalls');
    await dispatch('generateNewBalls');
  },

  triggerBlockExplosion({ state, commit }) {
    const size = state.boardSize;
    const row = Math.floor(Math.random() * (size - 2));
    const col = Math.floor(Math.random() * (size - 2));

    for (let r = row; r < row + 3; r++) {
      for (let c = col; c < col + 3; c++) {
        const index = getIndex(size, r, c);
        commit('updateBoardCell', { index, color: '' });
      }
    }
  },

  triggerBonusScore({ commit }) {
    commit('addScore', 100);
  },

  triggerLineClear({ state, commit }) {
    const size = state.boardSize;
    const isVertical = Math.random() > 0.5;
    if (isVertical) {
      const col = Math.floor(Math.random() * size);
      for (let row = 0; row < size; row++) {
        const index = getIndex(size, row, col);
        commit('updateBoardCell', { index, color: '' });
      }
    } else {
      const row = Math.floor(Math.random() * size);
      for (let col = 0; col < size; col++) {
        const index = getIndex(size, row, col);
        commit('updateBoardCell', { index, color: '' });
      }
    }
  },

  triggerColorRepaint({ state, commit }) {
    const emptyIndexes = state.board
        .map((_, index) => index)
        .filter(i => state.board[i].color === '');
    emptyIndexes.forEach(index => {
      commit('updateBoardCell', {
        index: index,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]});
    });
  },
  notifyTransitionEnd: ({ commit }) => {
    commit('decreaseActiveAnimations');
  },
      notifyAnimationEnd: ({ commit }) => {
    commit('decreaseActiveAnimations');
  },
      waitForAnimations: ({ state }) => {
    return new Promise((resolve) => {
      const check = () => {
        if (state.activeAnimations === 0) {
          resolve();
        } else {
          setTimeout(check, 50);
        }
      };
      check();
    });
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};