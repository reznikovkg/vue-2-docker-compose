import { KEY_MAP } from '@/utils/keyMap.js';

const initialState = (gridSize = 4) => ({
    cells: Array(gridSize * gridSize).fill(0),
    gridSize,
    score: 0,
    highScore: parseInt(localStorage.getItem('highScore')) || 0,
    gameOver: false,
    victory: false,
    previousState: null,
    victoryModalShown: false,
});

export default {
    namespaced: true,
    state: initialState(),
    getters: {
        getCells: (state) => state.cells,
        getScore: (state) => state.score,
        getHighScore: (state) => state.highScore,
        isGameOver: (state) => state.gameOver,
        isVictory: (state) => state.victory,
        canUndo: (state) => !!state.previousState,
        getGridSize: (state) => state.gridSize,
        hasPossibleMoves: (state) => {
            const gridSize = state.gridSize;
            return state.cells.some((cell, index) => {
                return (
                    (index % gridSize < gridSize - 1 && cell === state.cells[index + 1]) ||
                    (index < gridSize * (gridSize - 1) && cell === state.cells[index + gridSize])
                );
            });
        },
        getFormattedCells: (state) => {
            const formatCellValue = (value) => {
                if (value === 0) {
                    return '';
                }
                if (value < 2049) {
                    return value.toString();
                }
                const suffixes = ['', 'k', 'kk', 'kkk'];
                let suffixIndex = 0;
                let formattedValue = value;
                while (formattedValue >= 2049 && suffixIndex < suffixes.length - 1) {
                    formattedValue /= 1000;
                    suffixIndex++;
                }
                return `${Math.floor(formattedValue)}${suffixes[suffixIndex]}`.slice(0, 6);
            };
            return state.cells.map((cell) => formatCellValue(cell));
        },
    },
    mutations: {
        SET_GRID_SIZE: (state, size) => {
            state.gridSize = size;
            state.cells = Array(size * size).fill(0);
        },
        RESET_STATE: (state, gridSize = state.gridSize) => {
            const { highScore } = state;
            Object.assign(state, initialState(gridSize));
            state.highScore = highScore;
            state.victoryModalShown = false;
        },
        ADD_SCORE: (state, value) => {
            if (typeof value === 'number') {
                state.score += value;
                if (state.score > state.highScore) {
                    state.highScore = state.score;
                    localStorage.setItem('highScore', state.highScore);
                }
            }
        },
        SET_HIGH_SCORE: (state, value) => {
            if (typeof value === 'number' && value > state.highScore) {
                state.highScore = value;
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
        SET_VICTORY_MODAL_SHOWN: (state, status) => {
            state.victoryModalShown = status;
        },
        SAVE_PREVIOUS_STATE: (state) => {
            const currentState = {
                cells: [...state.cells],
                score: state.score,
            };
            if (!state.previousState || JSON.stringify(state.previousState) !== JSON.stringify(currentState)) {
                state.previousState = currentState;
            }
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
        setGridSize: ({ commit }, size) => {
            return new Promise((resolve) => {
                commit('SET_GRID_SIZE', size);
                commit('RESET_STATE');
                resolve();
            });
        },
        restartGameWithGridSize: ({ commit }, gridSize) => {
            commit('RESET_STATE', gridSize);
            commit('SET_GRID_SIZE', gridSize);
        },
        restartGame: ({ dispatch, state }) => {
            dispatch('restartGameWithGridSize', state.gridSize);
            dispatch('addRandomTile');
            dispatch('addRandomTile');
        },
        checkGameState: ({ state, commit, dispatch }) => {
            const gridSize = state.gridSize;
            if (!state.cells.includes(0)) {
                const hasMoves = state.cells.some((cell, index) => {
                    return (
                        (index % gridSize < gridSize - 1 && cell === state.cells[index + 1]) ||
                        (index < gridSize * (gridSize - 1) && cell === state.cells[index + gridSize])
                    );
                });
                if (!hasMoves) {
                    commit('SET_GAME_OVER', true);
                    dispatch('openGameEndModal', {
                        title: 'Конец игры',
                        message: 'Вы проиграли. Попробуйте снова!',
                        buttons: [
                            {
                                text: 'Новая игра',
                                click: () => dispatch('restartGame'),
                            },
                        ],
                    });
                }
            }
            if (state.cells.includes(2048) && !state.victoryModalShown) {
                commit('SET_VICTORY', true);
                commit('SET_VICTORY_MODAL_SHOWN', true);
                dispatch('openGameEndModal', {
                    title: 'Победа!',
                    message: 'Вы выиграли! Поздравляем!',
                    buttons: [
                        {
                            text: 'Продолжить',
                            click: () => {}
                        },
                        {
                            text: 'Новая игра',
                            click: () => dispatch('restartGame'),
                        },
                    ],
                });
            }
        },
        openGameEndModal: ({ commit }, { title, message, buttons }) => {
            commit('modals/openModal', {
                    component: 'GameEndModal',
                    params: { title, message, buttons },
                },
                { root: true }
            );
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
                cells[index1] = 16777216*8;
                cells[index2] = 16777216*8;
                commit('SET_CELLS', cells);
            }
        },
        move: ({ dispatch, state, commit }, direction) => {
            const previousCells = [...state.cells];
            const previousScore = state.score;
            let cells = [...state.cells];
            let scoreIncrease = 0;
            const gridSize = state.gridSize;
            switch (direction) {
                case KEY_MAP.ArrowLeft:
                    ({ cells, scoreIncrease } = processMove(cells, 'left', moveRow, gridSize));
                    break;
                case KEY_MAP.ArrowRight:
                    ({ cells, scoreIncrease } = processMove(cells, 'right', moveRow, gridSize));
                    break;
                case KEY_MAP.ArrowUp:
                    ({ cells, scoreIncrease } = processMove(cells, 'up', moveColumn, gridSize));
                    break;
                case KEY_MAP.ArrowDown:
                    ({ cells, scoreIncrease } = processMove(cells, 'down', moveColumn, gridSize));
                    break;
                default:
                    console.error(`Unknown direction: ${direction}`);
            }
            if (JSON.stringify(previousCells) !== JSON.stringify(cells) || previousScore !== state.score + scoreIncrease) {
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

const compressAndMerge = (array, direction, gridSize) => {
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
    while (compressed.length < gridSize) {
        compressed.push(0);
    }
    if (direction === 'right' || direction === 'down') {
        compressed.reverse();
    }
    return { compressed, scoreIncrease };
};
const moveRow = (cells, direction, gridSize) => {
    let moved = false;
    let totalScoreIncrease = 0;
    for (let row = 0; row < gridSize; row++) {
        const start = row * gridSize;
        const end = start + gridSize;
        const currentRow = cells.slice(start, end);
        const { compressed, scoreIncrease } = compressAndMerge(currentRow, direction, gridSize);
        if (JSON.stringify(currentRow) !== JSON.stringify(compressed)) {
            cells.splice(start, gridSize, ...compressed);
            moved = true;
            totalScoreIncrease += scoreIncrease;
        }
    }
    return { cells, moved, scoreIncrease: totalScoreIncrease };
};
const moveColumn = (cells, direction, gridSize) => {
    let moved = false;
    let totalScoreIncrease = 0;
    for (let col = 0; col < gridSize; col++) {
        const column = [];
        for (let i = 0; i < gridSize; i++) {
            column.push(cells[col + i * gridSize]);
        }
        const { compressed, scoreIncrease } = compressAndMerge(column, direction, gridSize);
        if (JSON.stringify(column) !== JSON.stringify(compressed)) {
            for (let i = 0; i < gridSize; i++) {
                cells[col + i * gridSize] = compressed[i];
            }
            moved = true;
            totalScoreIncrease += scoreIncrease;
        }
    }
    return { cells, moved, scoreIncrease: totalScoreIncrease };
};
const processMove = (cells, direction, moveFunction, gridSize) => {
    const result = moveFunction(cells, direction, gridSize);
    return {
        cells: result.cells,
        moved: result.moved,
        scoreIncrease: result.scoreIncrease,
    };
};
