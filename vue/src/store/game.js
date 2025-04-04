import { KEY_MAP } from '@/utils/keyMap.js';

const initialState = () => ({
    cells: Array(16).fill(0),
    score: 0,
    gameOver: false,
    victory: false,
    previousState: null,
});

export default {
    namespaced: true,
    state: initialState(),
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
        SAVE_PREVIOUS_STATE: (state) => {
            state.previousState = {
                cells: [...state.cells],
                score: state.score,
            };
        },
        RESET_PREVIOUS_STATE: (state) => {
            state.previousState = null;
        },
        SET_FOCUS: (state, status) => {
            state.isFocused = status;
        },
        UNDO_MOVE: (state) => {
            if (state.previousState) {
                state.cells = state.previousState.cells;
                state.score = state.previousState.score;
                state.previousState = null;
            }
        },
    },
    actions: {
        checkGameState: ({ state, commit, dispatch }) => {
            if (!state.cells.includes(0)) {
                const hasMoves = state.cells.some((cell, index) => {
                    return (
                        (index % 4 < 3 && cell === state.cells[index + 1]) ||
                        (index < 12 && cell === state.cells[index + 4])
                    );
                });
                if (!hasMoves) {
                    commit('SET_GAME_OVER', true);
                    dispatch('openGameEndModal', {
                        title: 'Конец игры',
                        message: 'Вы проиграли. Попробуйте снова!',
                        textColor: 'red',
                    });
                }
            }
            if (state.cells.includes(2048)) {
                commit('SET_VICTORY', true);
                dispatch('openGameEndModal', {
                    title: 'Победа!',
                    message: 'Вы выиграли! Поздравляем!',
                    textColor: 'green',
                });
            }
        },
        openGameEndModal: ({ commit }, { title, message }) => {
            commit('modals/openModal',
                {
                    component: 'GameEndModal',
                    params: { title, message },
                },
                { root: true }
            );
        },
        restartGame: ({ commit, dispatch }) => {
            commit('RESET_STATE');
            dispatch('addRandomTile');
            dispatch('addRandomTile');
        },
        addRandomTile: ({ state, commit }) => {
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
        addSpecificTiles: ({ state, commit }) => { //отладочный элемент (снесётся в дальнейшем)
            const cells = [...state.cells];
            const emptyCells = cells
                .map((value, index) => (value === 0 ? index : -1))
                .filter((index) => index !== -1);

            if (emptyCells.length >= 2) {
                const [index1, index2] = emptyCells.slice(0, 2);
                cells[index1] = 1024;
                cells[index2] = 1024;
                commit('SET_CELLS', cells);
            }
        },
        move: ({ dispatch, state, commit }, direction) => {
            const previousCells = [...state.cells];
            const previousScore = state.score;

            let cells = [...state.cells];
            let scoreIncrease = 0;

            switch (direction) {
                case KEY_MAP.ArrowLeft:
                    ({ cells, scoreIncrease } = processMove(cells, 'left', moveRow));
                    break;
                case KEY_MAP.ArrowRight:
                    ({ cells, scoreIncrease } = processMove(cells, 'right', moveRow));
                    break;
                case KEY_MAP.ArrowUp:
                    ({ cells, scoreIncrease } = processMove(cells, 'up', moveColumn));
                    break;
                case KEY_MAP.ArrowDown:
                    ({ cells, scoreIncrease } = processMove(cells, 'down', moveColumn));
                    break;
                default:
                    console.error(`Unknown direction: ${direction}`);
            }
            if (
                JSON.stringify(previousCells) !== JSON.stringify(cells) ||
                previousScore !== state.score + scoreIncrease
            ) {
                commit('SAVE_PREVIOUS_STATE');
                commit('SET_CELLS', cells);
                if (scoreIncrease > 0) {
                    commit('ADD_SCORE', scoreIncrease);
                }
                dispatch('addRandomTile');
                dispatch('checkGameState');
            }
        },
        setFocus: ({ commit }, status) => {
            commit('SET_FOCUS', status);
        },
        undoMove: ({ commit }) => {
            commit('UNDO_MOVE');
        },
        moveByKeyEvent: ({ dispatch }, event) => {
            const direction = KEY_MAP[event.key];
            if (direction) {
                dispatch('move', direction);
            }
        },
    },
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

const processMove = (cells, direction, moveFunction) => {
    const result = moveFunction(cells, direction);
    return {
        cells: result.cells,
        moved: result.moved,
        scoreIncrease: result.scoreIncrease,
    };
};
