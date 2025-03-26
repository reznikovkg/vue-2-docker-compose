import { moveRow, moveColumn } from '@/utils/gameUtils';

const initialState = () => ({
    cells: Array(16).fill(0),
    score: 0,
    gameOver: false,
    victory: false,
});

export default {
    namespaced: true,
    state: initialState(),
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
            state.cells = cells.map(cell => (typeof cell === 'number' ? cell : 0));
        },
        SET_GAME_OVER: (state, status) => {
            state.gameOver = status;
        },
        SET_VICTORY: (state, status) => {
            state.victory = status;
        },
    },
    actions: {
        restartGame: ({ commit, dispatch }) => {
            commit('RESET_STATE');
            dispatch('addRandomTile');
            dispatch('addRandomTile');
        },
        initGame: ({ commit, dispatch }) => {
            commit('RESET_STATE');
            dispatch('addRandomTile');
            dispatch('addRandomTile');
        },
        addRandomTile: ({ state, commit }) => {
            const emptyCells = state.cells
                .map((value, index) => (value === 0 ? index : -1))
                .filter(index => index !== -1);
            if (emptyCells.length > 0) {
                const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                const newValue = [2, 4][Math.floor(Math.random() * 2)];
                const newCells = [...state.cells];
                newCells[index] = newValue;
                commit('SET_CELLS', newCells);
            }
        },
        move: ({ dispatch, state, commit }, direction) => {
            let moved = false;
            let cells = [...state.cells];
            switch (direction) {
                case 'ArrowLeft': {
                    ({cells, moved} = moveRow(cells, 'left', commit));
                    break;
                }
                case 'ArrowRight': {
                    ({cells, moved} = moveRow(cells, 'right', commit));
                    break;
                }
                case 'ArrowUp': {
                    ({cells, moved} = moveColumn(cells, 'up', commit));
                    break;
                }
                case 'ArrowDown': {
                    ({cells, moved} = moveColumn(cells, 'down', commit));
                    break;
                }
                default: {
                    console.error(`Unknown direction: ${direction}`);
                }
            }
            if (moved) {
                commit('SET_CELLS', cells);
                dispatch('addRandomTile');
                dispatch('checkGameState');
            }
        },
        checkGameState: ({ state, commit, rootGetters }) => {
            if (!state.cells.includes(0)) {
                const hasMoves = rootGetters['game/hasPossibleMoves'];
                commit('SET_GAME_OVER', !hasMoves);
            }
            if (state.cells.includes(2048)) {
                commit('SET_VICTORY', true);
            }
        },
    },
    getters: {
        rows: (state) => {
            const rows = [];
            for (let i = 0; i < 4; i++) {
                rows.push(state.cells.slice(i * 4, (i + 1) * 4));
            }
            return rows;
        },
        keyMap: () => ({
            ArrowUp: 'ArrowUp',
            ArrowDown: 'ArrowDown',
            ArrowLeft: 'ArrowLeft',
            ArrowRight: 'ArrowRight',
        }),

        hasPossibleMoves: (state) => {
            for (let i = 0; i < 16; i++) {
                if (
                    (i % 4 < 3 && state.cells[i] === state.cells[i + 1]) ||
                    (i < 12 && state.cells[i] === state.cells[i + 4])
                ) {
                    return true;
                }
            }
            return false;
        },
    },
};
