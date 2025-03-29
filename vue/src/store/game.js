import { KEY_MAP } from '@/utils/keyMap.js';

const initialState = () => ({
    cells: Array(16).fill(0),
    score: 0,
    gameOver: false,
    victory: false,
});

export default {
    namespaced: true,
    state: {
        cells: [],
        score: 0,
        gameOver: false,
        victory: false,
    },

    getters: {
        getCells: (state) => state.cells,
        getScore: (state) => state.score,
        isGameOver: (state) => state.gameOver,
        isVictory: (state) => state.victory,

        hasPossibleMoves: (state) => {
            return state.cells.some((cell, index) => {
                return (
                    (index % 4 < 3 && cell === state.cells[index + 1]) ||
                    (index < 12 && cell === state.cells[index + 4])
                );
            });
        },
    },
    mutations: {
        RESET_STATE: (state) => {
            Object.assign(state, initialState());
        },
        ADD_SCORE: (state, value) => {
            if (typeof value === 'number') {
                state.score += value;
            } else {
                console.error('Invalid score value:', value);
            }
        },
        SET_CELLS: (state, cells) => {
            state.cells = cells.map((cell) => (typeof cell === 'number' ? cell : 0));
        },
        SET_GAME_OVER: (state, status) => {
            state.gameOver = status;
        },
        SET_VICTORY: (state, status) => {
            state.victory = status;
        },
    },
    actions: {
        checkGameState: ({ state, commit, rootGetters }) => {
            if (!state.cells.includes(0)) {
                const hasMoves = rootGetters['game/hasPossibleMoves'];
                commit('SET_GAME_OVER', !hasMoves);
            }
            if (state.cells.includes(2048)) {
                commit('SET_VICTORY', true);
            }
        },
        restartGame: ({commit, dispatch}) => {
            commit('RESET_STATE');
            dispatch('addRandomTile');
            dispatch('addRandomTile');
        },
        addRandomTile: ({state, commit}) => {
            const emptyCells = state.cells
                .map((value, index) => (value === 0 ? index : -1))
                .filter((index) => index !== -1);
            if (emptyCells.length > 0) {
                const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                const newValue = [2, 4][Math.floor(Math.random() * 2)];
                const newCells = [...state.cells];
                newCells[index] = newValue;
                commit('SET_CELLS', newCells);
            }
        },
        move: ({dispatch, state, commit}, direction) => {
            let moved = false;
            let cells = [...state.cells];
            let scoreIncrease = 0;

            switch (direction) {
                case KEY_MAP.ArrowLeft: {
                    const result = moveRow(cells, 'left');
                    cells = result.cells;
                    moved = result.moved;
                    scoreIncrease = result.scoreIncrease;
                    break;
                }
                case KEY_MAP.ArrowRight: {
                    const result = moveRow(cells, 'right');
                    cells = result.cells;
                    moved = result.moved;
                    scoreIncrease = result.scoreIncrease;
                    break;
                }
                case KEY_MAP.ArrowUp: {
                    const result = moveColumn(cells, 'up');
                    cells = result.cells;
                    moved = result.moved;
                    scoreIncrease = result.scoreIncrease;
                    break;
                }
                case KEY_MAP.ArrowDown: {
                    const result = moveColumn(cells, 'down');
                    cells = result.cells;
                    moved = result.moved;
                    scoreIncrease = result.scoreIncrease;
                    break;
                }
                default: {
                    console.error(`Unknown direction: ${direction}`);
                }
            }
            if (moved) {
                commit('SET_CELLS', cells);
                if (scoreIncrease > 0) {
                    commit('ADD_SCORE', scoreIncrease);
                }
                dispatch('addRandomTile');
                dispatch('checkGameState');
            }
        },
    },
};
const moveRow = (cells, direction) => {
    let moved = false;
    let totalScoreIncrease = 0;
    for (let row = 0; row < 4; row++) {
        const start = row * 4;
        const end = start + 4;
        const currentRow = cells.slice(start, end);
        const { compressed, scoreIncrease } = compressAndMerge(currentRow, direction);
        if (JSON.stringify(currentRow) !== JSON.stringify(compressed)) {
            cells.splice(start, 4, ...compressed);
            moved = true;
            totalScoreIncrease += scoreIncrease;
        }
    }
    return { cells, moved, scoreIncrease: totalScoreIncrease };
};

const moveColumn = (cells, direction) => {
    let moved = false;
    let totalScoreIncrease = 0;
    for (let col = 0; col < 4; col++) {
        const column = [cells[col], cells[col + 4], cells[col + 8], cells[col + 12]];
        const { compressed, scoreIncrease } = compressAndMerge(column, direction);
        if (JSON.stringify(column) !== JSON.stringify(compressed)) {
            cells[col] = compressed[0];
            cells[col + 4] = compressed[1];
            cells[col + 8] = compressed[2];
            cells[col + 12] = compressed[3];
            moved = true;
            totalScoreIncrease += scoreIncrease;
        }
    }
    return { cells, moved, scoreIncrease: totalScoreIncrease };
};

const compressAndMerge = (array, direction) => {
    const sanitizedArray = array.map((cell) => (typeof cell === 'number' ? cell : 0));
    const compressed = sanitizedArray.filter((cell) => cell !== 0);
    let scoreIncrease = 0;
    if (direction === 'right' || direction === 'down') {
        compressed.reverse();
    }
    for (let i = 0; i < compressed.length - 1; i++) {
        if (compressed[i] === compressed[i + 1]) {
            compressed[i] *= 2;
            scoreIncrease += compressed[i];
            compressed.splice(i + 1, 1);
            i--;
        }
    }
    while (compressed.length < 4) {
        compressed.push(0);
    }
    if (direction === 'right' || direction === 'down') {
        compressed.reverse();
    }
    return { compressed, scoreIncrease };
};
