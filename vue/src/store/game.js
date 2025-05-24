import { KEY_MAP } from '@/utils/keyMap';
import { ChaosManager, ChaosType } from '@/utils/chaos';

const initialState = (gridSize = 4) => ({
    grid: Array.from({ length: gridSize }, (_, y) =>
        Array.from({ length: gridSize }, (_, x) => ({
            x,
            y,
            value: 0,
            frozen: false,
        }))
    ),
    gridSize,
    score: 0,
    highScore: parseInt(localStorage.getItem('highScore')) || 0,
    gameOver: false,
    victory: false,
    previousState: null,
    victoryModalShown: false,
    isAnimating: false,
    movedTiles: [],

    notifications: [],
    chaosDuration: 0,
    chaosType: null,
    chaosEffects: {},
    isChaosEnabled: false,
});

export default {
    namespaced: true,
    state: initialState(),
    getters: {
        getGrid: (state) => state.grid,
        getCells: (state) => state.grid.flat().map(cell => cell.value),
        getScore: (state) => state.score,
        getHighScore: (state) => state.highScore,
        isGameOver: (state) => state.gameOver,
        isVictory: (state) => state.victory,
        canUndo: (state) => !!state.previousState,
        getGridSize: (state) => state.gridSize,
        hasPossibleMoves: (state) => {
            const { gridSize, grid } = state;
            const frozenTiles = state.chaosEffects.frozenTiles || [];

            for (let y = 0; y < gridSize; y++) {
                for (let x = 0; x < gridSize; x++) {
                    const cell = grid[y][x];
                    if (cell.value === 0) continue;

                    // Проверяем, не заморожена ли текущая клетка
                    const isFrozen = frozenTiles.some(ft => ft.x === x && ft.y === y);
                    if (isFrozen) continue;

                    // Проверка соседей
                    const directions = [
                        { x: x + 1, y }, // right
                        { x, y: y + 1 }  // down
                    ];

                    for (const dir of directions) {
                        if (dir.x < gridSize && dir.y < gridSize) {
                            const neighbor = grid[dir.y][dir.x];
                            const neighborFrozen = frozenTiles.some(ft => ft.x === dir.x && ft.y === dir.y);

                            if (!neighborFrozen && neighbor.value === cell.value) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        },
        getFormattedCells: (state) => {
            const formatCellValue = (value) => {
                if (typeof value !== 'number' || isNaN(value)) {
                    return '';
                }
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
                    formattedValue /= 1024;
                    suffixIndex++;
                }
                return `${Math.floor(formattedValue)}${suffixes[suffixIndex]}`;
            };

            if (!state.grid || !Array.isArray(state.grid)) {
                return [];
            }
            return state.grid.flatMap((row) =>
                row.map(cell => ({
                    x: cell.x,
                    y: cell.y,
                    value: cell.value,
                    frozen: cell.frozen,
                    formattedValue: formatCellValue(cell.value)
                }))
            );
        }
    },
    mutations: {
        SET_CHAOS_EFFECTS(state, effects) {
            state.chaosEffects = { ...effects };
        },
        ADD_NOTIFICATION(state, notification) {
            state.notifications.push({
                ...notification,
                id: Date.now()
            });
        },
        REMOVE_NOTIFICATION(state, id) {
            state.notifications = state.notifications.filter(n => n.id !== id);
        },
        CLEAR_EXPIRED_CHAOS(state) {
            // Уменьшаем длительность всех эффектов
            Object.keys(state.chaosEffects).forEach(type => {
                if (state.chaosEffects[type]?.expiresIn !== undefined) {
                    state.chaosEffects[type].expiresIn--;

                    if (state.chaosEffects[type].expiresIn <= 0) {
                        delete state.chaosEffects[type];

                        // Особые случаи очистки
                        if (type === ChaosType.FROZEN_TILES) {
                            // Размораживаем все плитки
                            state.grid.forEach(row => {
                                row.forEach(cell => {
                                    cell.frozen = false;
                                });
                            });
                        }
                    }
                }
            });
        },
        SET_CHAOS_ENABLED(state, status) {
            state.isChaosEnabled = status;
        },
        INCREMENT_CHAOS_COUNTER(state) {
            if (state.chaosDuration === 0) {
                state.chaosCounter++;
            }
        },
        RESET_CHAOS_COUNTER(state) {
            state.chaosCounter = 0;
        },
        SET_CHAOS_DURATION(state, duration) {
            state.chaosDuration = duration;
        },
        DECREASE_CHAOS_DURATION(state) {
            if (state.chaosDuration > 0) {
                state.chaosDuration--;
            }
        },
        SET_CHAOS_TYPE(state, type) {
            state.chaosType = type;
        },
        CLEAR_CHAOS_EFFECTS(state) {
            state.chaosEffects = {};
            state.chaosType = null;
            state.chaosDuration = 0;
            state.chaosCounter = 0;
        },
        APPLY_CHAOS_EFFECTS(state, effects) {
            state.chaosEffects = { ...state.chaosEffects, ...effects };
        },
        SET_ANIMATING(state, status) {
            state.isAnimating = status;
        },
        SET_LAST_ACTION(state, action) {
            state.lastAction = action;
        },
        SET_GRID_SIZE(state, size) {
            state.gridSize = size;
            state.grid = Array.from({ length: size }, (_, y) =>
                Array.from({ length: size }, (_, x) => ({ x, y, value: 0, frozen: false }))
            );
        },
        SET_MOVED_TILES(state, tiles) {
            state.movedTiles = tiles;
        },
        RESET_STATE(state, gridSize = state.gridSize) {
            const { highScore } = state;
            Object.assign(state, initialState(gridSize));
            state.highScore = highScore;
            state.victoryModalShown = false;
        },
        ADD_SCORE(state, value) {
            if (typeof value === 'number') {
                state.score += value;
                if (state.score > state.highScore) {
                    state.highScore = state.score;
                    localStorage.setItem('highScore', state.highScore);
                }
            }
        },
        SET_HIGH_SCORE(state, value) {
            if (typeof value === 'number' && value > state.highScore) {
                state.highScore = value;
            }
        },

        SET_CELLS(state, grid) {
            if (!Array.isArray(grid)) {
                return;
            }

            state.grid = grid.map(row => {
                if (!Array.isArray(row)) {
                    return [];
                }
                return row.map(cell => ({ ...cell }));
            });
        },
        SET_GAME_OVER(state, status) {
            state.gameOver = status;
        },
        SET_VICTORY(state, status) {
            state.victory = status;
        },
        SET_VICTORY_MODAL_SHOWN(state, status) {
            state.victoryModalShown = status;
        },
        SAVE_PREVIOUS_STATE(state) {
            const currentState = {
                grid: state.grid.map(row => row.map(cell => ({ ...cell }))),
                score: state.score
            };
            if (!state.previousState || !deepEqual(state.previousState.grid, currentState.grid)) {
                state.previousState = currentState;
            }
        },
        UNDO_MOVE(state) {
            if (state.previousState) {
                state.grid = state.previousState.grid.map(row => row.map(cell => ({ ...cell })));
                state.score = state.previousState.score;
                state.previousState = null;
            }
        },
        SET_FOCUS(state, status) {
            state.isFocused = status;
        }
    },
    actions: {
        applyRandomChaos({ state, commit, dispatch }) {
            if (!state.isChaosEnabled) return;

            const newState = ChaosManager.applyRandomChaos(JSON.parse(JSON.stringify(state)));

            console.log('Применяем хаос:', newState.chaosEffects); // Для отладки

            if (newState.chaosEffects) {
                commit('APPLY_CHAOS_EFFECTS', newState.chaosEffects);

                // Обновляем grid если были заморожены плитки
                if (newState.chaosEffects.frozenTiles) {
                    commit('SET_CELLS', newState.grid);
                }

                const newEffectType = Object.keys(newState.chaosEffects)
                    .find(type => !state.chaosEffects[type]);

                if (newEffectType) {
                    const notification = ChaosManager.getChaosNotification(newEffectType);
                    dispatch('showNotification', notification);
                }
            }
        },

        showNotification({ commit }, notification) {
            commit('ADD_NOTIFICATION', notification);
            setTimeout(() => {
                commit('REMOVE_NOTIFICATION', notification.id);
            }, notification.duration);
        },
        checkChaos({ state, dispatch, commit }) {
            if (!state.isChaosEnabled) {
                return;
            }
            if (state.chaosDuration > 0) {
                dispatch('decreaseChaosDuration');
            } else if (state.chaosCounter >= 5) {
                dispatch('applyRandomChaos');
                commit('RESET_CHAOS_COUNTER');
            } else {
                commit('INCREMENT_CHAOS_COUNTER');
            }
        },
        decreaseChaosDuration({ commit, state }) {
            if (state.chaosDuration > 0) {
                commit('DECREASE_CHAOS_DURATION');
            }
            if (state.chaosDuration === 0 && state.chaosType) {
                commit('CLEAR_CHAOS_EFFECTS');
            }
        },
        toggleChaosMode({ commit, state }) {
            commit('SET_CHAOS_ENABLED', !state.isChaosEnabled);
            if (!state.isChaosEnabled) {
                commit('CLEAR_CHAOS_EFFECTS');
            }
        },
        setGridSize({ commit }, size) {
            commit('SET_GRID_SIZE', size);
        },
        restartGameWithGridSize({ commit }, gridSize) {
            commit('RESET_STATE', gridSize);
            commit('SET_GRID_SIZE', gridSize);
        },
        restartGame({ dispatch, state, commit }) {
            dispatch('restartGameWithGridSize', state.gridSize).then(() => {
                commit('SET_CHAOS_ENABLED', false);
                commit('CLEAR_CHAOS_EFFECTS');
                return dispatch('addRandomTile');
            }).then(() => dispatch('addRandomTile'));
        },
        checkGameState({ state, commit, dispatch }) {
            const { gridSize } = state;
            let hasMoves = false;

            for (let y = 0; y < gridSize; y++) {
                for (let x = 0; x < gridSize; x++) {
                    const cell = state.grid[y][x];
                    if (cell.value === 0) {
                        continue;
                    }

                    const rightCell = x + 1 < gridSize ? state.grid[y][x + 1] : null;
                    const downCell = y + 1 < gridSize ? state.grid[y + 1]?.[x] : null;

                    if (
                        (rightCell && !rightCell.frozen && rightCell.value === cell.value) ||
                        (downCell && !downCell.frozen && downCell.value === cell.value)
                    ) {
                        hasMoves = true;
                        break;
                    }
                }
                if (hasMoves) {
                    break;
                }
            }

            if (!state.grid.some(row => row.some(cell => cell.value === 0)) && !hasMoves) {
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

            if (!state.victoryModalShown && state.grid.some(row => row.some(cell => cell.value === 2048))) {
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
                            click: () => dispatch('restartGame')
                        },
                    ],
                });
            }
        },
        openGameEndModal({ commit }, { title, message, buttons }) {
            commit('modals/openModal', {
                component: 'GameEndModal',
                params: { title, message, buttons },
            }, { root: true });
        },
        async addRandomTile({ state, commit }) {
            const emptyCells = state.grid.flat().filter(cell => cell.value === 0);

            if (emptyCells.length > 0) {
                const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                randomCell.value = [2, 4][Math.floor(Math.random() * 2)];
                randomCell.frozen = false;

                const newGrid = state.grid.map(row => row.map(cell => ({ ...cell })));
                commit('SET_CELLS', newGrid);
            }
        },
        addSpecificTiles({ state, commit }) {
            const emptyCells = state.grid.flat().filter(cell => cell.value === 0);
            if (emptyCells.length >= 2) {
                emptyCells[0].value = 1024;
                emptyCells[1].value = 1024;
                const newGrid = state.grid.map(row => row.map(cell => ({ ...cell })));
                commit('SET_CELLS', newGrid);
            }
        },
        undoMove({ commit }) {
            commit('UNDO_MOVE');
        },
        moveByKeyEvent({ dispatch }, { direction }) {
            dispatch('move', direction);
        },
        async move({ dispatch, state, commit }, direction) {
            if (state.isAnimating) return;
            commit('SET_ANIMATING', true);

            const previousGrid = JSON.parse(JSON.stringify(state.grid));
            const previousScore = state.score;
            const gridSize = state.gridSize;
            const frozenTiles = state.chaosEffects.frozenTiles || [];

            let grid = JSON.parse(JSON.stringify(state.grid));
            let scoreIncrease = 0;
            let movedTiles = [];

            switch (direction) {
                case KEY_MAP.ArrowLeft:
                    ({ grid, scoreIncrease, movedTiles } = moveRow(grid, 'left', gridSize, frozenTiles));
                    break;
                case KEY_MAP.ArrowRight:
                    ({ grid, scoreIncrease, movedTiles } = moveRow(grid, 'right', gridSize, frozenTiles));
                    break;
                case KEY_MAP.ArrowUp:
                    ({ grid, scoreIncrease, movedTiles } = moveColumn(grid, 'up', gridSize, frozenTiles));
                    break;
                case KEY_MAP.ArrowDown:
                    ({ grid, scoreIncrease, movedTiles } = moveColumn(grid, 'down', gridSize, frozenTiles));
                    break;
                default:
                    commit('SET_ANIMATING', false);
                    return;
            }
            if (!deepEqual(previousGrid, grid)) {
                commit('SAVE_PREVIOUS_STATE', {
                    grid: previousGrid,
                    score: previousScore
                });
                commit('SET_CELLS', grid);
                commit('SET_MOVED_TILES', movedTiles);
                if (scoreIncrease > 0) {
                    commit('ADD_SCORE', scoreIncrease);
                }
                await dispatch('animateMovement');
                await dispatch('addRandomTile');
                dispatch('checkGameState');
            }
            commit('CLEAR_EXPIRED_CHAOS');
            if (state.isChaosEnabled) {
                commit('INCREMENT_CHAOS_COUNTER');
                if (state.chaosCounter >= 5) {
                    await dispatch('applyRandomChaos');
                    commit('RESET_CHAOS_COUNTER');
                }
            }
            commit('SET_ANIMATING', false);
        },

        animateMovement({ commit}) {
            return new Promise(resolve => {
                setTimeout(() => {
                    commit('SET_MOVED_TILES', []);
                    resolve();
                }, 100);
            });
        },
        setFocus({ commit }, status) {
            commit('SET_FOCUS', status);
        },
    },
};

const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const mergeLine = (line, direction) => {
    const size = line.length;
    let compressed = line.filter(cell => cell.value !== 0);
    let scoreIncrease = 0;
    const movements = [];

    if (direction === 'right' || direction === 'down') {
        compressed.reverse();
    }

    for (let i = 0; i < compressed.length - 1; i++) {
        if (compressed[i].value === compressed[i+1].value) {
            compressed[i] = {
                ...compressed[i],
                value: compressed[i].value * 2,
                merged: true
            };
            scoreIncrease += compressed[i].value;
            movements.push({
                from: i+1,
                to: i,
                value: compressed[i].value
            });
            compressed.splice(i+1, 1);
        }
    }

    while (compressed.length < size) {
        compressed.push({ value: 0, x: 0, y: 0 });
    }

    if (direction === 'right' || direction === 'down') {
        compressed.reverse();
        movements.forEach(move => {
            move.from = size - 1 - move.from;
            move.to = size - 1 - move.to;
        });
    }

    return {
        mergedLine: compressed,
        scoreIncrease,
        movements
    };
};

const moveRow = (grid, direction, gridSize) => {
    let moved = false;
    let totalScoreIncrease = 0;
    const movedTiles = [];

    for (let y = 0; y < gridSize; y++) {
        const row = [...grid[y]];

        const { mergedLine, scoreIncrease, movements } = mergeLine(
            row.map(cell => ({ ...cell })),
            direction
        );

        if (!deepEqual(row, mergedLine)) {
            moved = true;
            totalScoreIncrease += scoreIncrease;

            grid[y] = mergedLine.map((cell, x) => ({
                ...cell,
                x,
                y
            }));
            movements.forEach(move => {
                movedTiles.push({
                    from: { x: move.from, y },
                    to: { x: move.to, y },
                    value: move.value
                });
            });
        }
    }
    return {
        grid,
        moved,
        scoreIncrease: totalScoreIncrease,
        movedTiles
    };
};

const moveColumn = (grid, direction, gridSize) => {
    let moved = false;
    let totalScoreIncrease = 0;
    const movedTiles = [];

    for (let x = 0; x < gridSize; x++) {
        const column = [];
        for (let y = 0; y < gridSize; y++) {
            column.push({ ...grid[y][x] });
        }
        const { mergedLine, scoreIncrease, movements } = mergeLine(column, direction);

        if (!deepEqual(column, mergedLine)) {
            moved = true;
            totalScoreIncrease += scoreIncrease;

            for (let y = 0; y < gridSize; y++) {
                grid[y][x] = {
                    ...mergedLine[y],
                    x,
                    y
                };
            }
            movements.forEach(move => {
                movedTiles.push({
                    from: { x, y: move.from },
                    to: { x, y: move.to },
                    value: move.value
                });
            });
        }
    }
    return {
        grid,
        moved,
        scoreIncrease: totalScoreIncrease,
        movedTiles
    };
};
