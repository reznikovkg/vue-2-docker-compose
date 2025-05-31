import { KEY_MAP } from '@/utils/keyMap';

const ChaosManager = {
    effects: [
        {
            type: 'FREEZE',
            target: 'cell',
            duration: 3,
            appliesTo: 'nonEmpty',
            apply(grid, position) {
                const cell = grid[position.y][position.x];
                if (cell.value > 0 && !cell.effects.some(e => e.type === 'FREEZE')) {
                    cell.effects.push({ type: 'FREEZE', expiresIn: this.duration });
                }
            }
        },
        {
            type: 'TORNADO',
            target: 'global',
            duration: 3,
            appliesTo: 'any',
            apply(grid) {
                const nonFrozenCells = grid.flat().filter(cell =>
                    cell.value > 0 && !cell.effects.some(e => e.type === 'FREEZE')
                );
                if (nonFrozenCells.length < 2) {
                    return grid;
                }

                const values = nonFrozenCells.map(c => c.value);
                const shuffledValues = [...values].sort(() => Math.random() - 0.5);
                nonFrozenCells.forEach((cell, i) => {
                    cell.value = shuffledValues[i];
                });
                return {
                    newGrid: grid,
                    tornadoTiles: nonFrozenCells.map(c => ({ x: c.x, y: c.y }))
                };
            }
        },
        {
            type: 'BLACKHOLE',
            target: 'cell',
            duration: 3,
            appliesTo: 'empty',
            apply(grid, position) {
                const cell = grid[position.y][position.x];
                if (cell.value === 0 && !cell.effects.some(e => e.type === 'BLACKHOLE')) {
                    cell.effects.push({ type: 'BLACKHOLE', expiresIn: this.duration });
                }
            },
            onTurn(grid, position) {
                const cell = grid[position.y][position.x];
                if (!cell) return;

                const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                for (const [dy, dx] of directions) {
                    const ny = position.y + dy;
                    const nx = position.x + dx;
                    if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[ny].length) {
                        const neighbor = grid[ny][nx];
                        if (
                            neighbor.value > 0 &&
                            !neighbor.effects.some(e => e.type === 'BLACKHOLE')
                        ) {
                            neighbor.value = 0;
                            break;
                        }
                    }
                }

                cell.effects = cell.effects.filter(e => e.expiresIn > 0);
            }
        }
    ],
    getRandomEffect() {
        //return this.effects.find(effect => effect.type === 'FREEZE');
        //return this.effects.find(effect => effect.type === 'TORNADO');
        //return this.effects.find(effect => effect.type === 'BLACKHOLE');

        return this.effects[Math.floor(Math.random() * this.effects.length)];
    },
    getEffectConfig(type) {
        return this.effects.find(e => e.type === type);
    }
};

const initialState = (gridSize = 4) => ({
    grid: Array.from({ length: gridSize }, (_, y) =>
        Array.from({ length: gridSize }, (_, x) => ({
            x,
            y,
            value: 0,
            effects: []
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
    isActive: false,
    tornadoAnimationActive: false,
    movedTiles: [],
    tornadoTiles: [],
    counter: 0,
    effectCycleCounter: 0,
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
        getMovedTiles: state => state.movedTiles || [],
        hasPossibleMoves: (state) => {
            const { gridSize, grid } = state;
            const frozenTiles = state.chaosEffects.frozenTiles || [];

            for (let y = 0; y < gridSize; y++) {
                for (let x = 0; x < gridSize; x++) {
                    const cell = grid[y][x];
                    if (cell.value === 0) {
                        continue;
                    }
                    const isFrozen = frozenTiles.some(ft => ft.x === x && ft.y === y);
                    if (isFrozen) {
                        continue;
                    }
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
        },
        isChaosActive: state => state.isActive || false,
        frozenCells: state => {
            return state.grid.flat()
                .filter(cell => cell.effects.some(e => e.type === 'FREEZE'))
                .map(cell => ({ x: cell.x, y: cell.y }));
        },
        getFreezeEffectByPosition: (state) => ({ x, y }) => {
            const cell = state.grid[y]?.[x];
            if (!cell) {
                return null;
            }
            return cell.effects.find(e => e.type === 'FREEZE') || null;
        },
        isTornadoAnimating: state => state.tornadoAnimationActive,
        tornadoTiles: state => state.tornadoTiles || [],
        getBlackholeEffectByPosition: (state) => ({ x, y }) => {
            const cell = state.grid[y]?.[x];
            if (!cell) return null;
            return cell.effects.find(e => e.type === 'BLACKHOLE') || null;
        },
    },
    mutations: {
        SET_TORNADO_TILES(state, tiles) {
            state.tornadoTiles = tiles;
        },

        SET_TORNADO_ANIMATION(state, status) {
            state.tornadoAnimationActive = status;
        },

        CLEAR_TORNADO_TILES(state) {
            state.tornadoTiles = [];
        },
        CLEAR_CHAOS_EFFECTS(state) {
            state.grid = state.grid.map(row =>
                row.map(cell => {
                    cell.effects = cell.effects.filter(e => e.type !== 'FREEZE');
                    return cell;
                })
            );
        },
        SET_CHAOS_ACTIVE(state, isActive) {
            state.isActive = isActive;
        },
        ADD_CHAOS_EFFECT(state, { effect, position }) {
            const cell = state.grid[position.y][position.x];
            cell.effects.push({
                ...effect,
                expiresIn: ChaosManager.getEffectConfig(effect.type).duration
            });
        },
        UPDATE_CHAOS_EFFECTS(state) {
            state.grid.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell.effects.length === 0) return;

                    const blackhole = cell.effects.find(e => e.type === 'BLACKHOLE');
                    if (blackhole) {
                        const effectDef = ChaosManager.effects.find(e => e.type === 'BLACKHOLE');
                        if (effectDef && typeof effectDef.onTurn === 'function') {
                            effectDef.onTurn(state.grid, { x, y });
                        }
                    }

                    // Уменьшаем expiresIn
                    cell.effects = cell.effects.map(effect => ({
                        ...effect,
                        expiresIn: effect.expiresIn !== undefined ? effect.expiresIn - 1 : undefined
                    }));

                    // Чистим эффекты
                    const oldEffects = [...cell.effects];
                    cell.effects = cell.effects.filter(e => e.expiresIn > 0);

                    // Если BLACKHOLE закончился — обнуляем значение
                    if (
                        !cell.effects.some(e => e.type === 'BLACKHOLE') &&
                        oldEffects.some(e => e.type === 'BLACKHOLE')
                    ) {
                        cell.value = 0;
                    }
                });
            });
        },
        INCREMENT_EFFECT_CYCLE_COUNTER(state) {
            state.effectCycleCounter++;
        },
        INCREMENT_CHAOS_COUNTER(state) {
            state.counter++;
        },
        RESET_CHAOS_COUNTER(state) {
            state.counter = 0;
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
                Array.from({ length: size }, (_, x) => ({
                    x,
                    y,
                    value: 0,
                    effects: []
                }))
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
        applyScheduledChaosEffect({ commit, state }) {
            const cycleInterval = 8;
            if (!state.isActive || state.counter % cycleInterval !== 0) {
                return;
            }

            const effect = ChaosManager.getRandomEffect();
            if (!effect || typeof effect.apply !== 'function') {
                return;
            }

            if (effect.target === 'cell') {
                let eligibleCells = [];

                const config = ChaosManager.getEffectConfig(effect.type);

                if (config.appliesTo === 'empty') {
                    eligibleCells = state.grid.flat().filter(cell =>
                        cell.value === 0 &&
                        !cell.effects.some(e => e.type === 'BLACKHOLE')
                    );
                } else if (config.appliesTo === 'nonEmpty') {
                    eligibleCells = state.grid.flat().filter(cell =>
                        cell.value > 0 &&
                        !cell.effects.some(e => e.type === 'FREEZE')
                    );
                } else {
                    eligibleCells = state.grid.flat();
                }

                if (eligibleCells.length > 0) {
                    const targetCell = eligibleCells[Math.floor(Math.random() * eligibleCells.length)];
                    effect.apply(state.grid, { x: targetCell.x, y: targetCell.y });
                    commit('ADD_CHAOS_EFFECT', {
                        effect,
                        position: { x: targetCell.x, y: targetCell.y }
                    });
                }

            } else if (effect.target === 'global') {
                if (effect.type === 'TORNADO') {
                    commit('SET_TORNADO_ANIMATION', true);

                    const result = effect.apply(state.grid);
                    commit('SET_TORNADO_TILES', result.tornadoTiles);
                    commit('SET_CELLS', result.newGrid);

                    setTimeout(() => {
                        commit('SET_TORNADO_ANIMATION', false);
                        commit('CLEAR_TORNADO_TILES');
                    }, 500);
                }
            }
            commit('INCREMENT_EFFECT_CYCLE_COUNTER');
        },

        toggleChaosMode({ commit, state }) {
            if (state.isActive) {
                commit('CLEAR_CHAOS_EFFECTS');
            }
            commit('SET_CHAOS_ACTIVE', !state.isActive);
        },
        applyRandomEffect({ commit, state }) {
            if (!state.isActive) {
                return;
            }
            const effect = ChaosManager.getRandomEffect();
            if (effect.target === 'cell') {
                let eligibleCells = [];
                const config = ChaosManager.getEffectConfig(effect.type);

                if (config.appliesTo === 'empty') {
                    eligibleCells = state.grid.flat().filter(cell =>
                        cell.value === 0 &&
                        !cell.effects.some(e => e.type === 'BLACKHOLE')
                    );
                } else if (config.appliesTo === 'nonEmpty') {
                    eligibleCells = state.grid.flat().filter(cell =>
                        cell.value > 0 &&
                        !cell.effects.some(e => e.type === 'FREEZE')
                    );
                } else {
                    eligibleCells = state.grid.flat();
                }
                if (eligibleCells.length > 0) {
                    const targetCell = eligibleCells[Math.floor(Math.random() * eligibleCells.length)];
                    effect.apply(state.grid, { x: targetCell.x, y: targetCell.y }, this);
                    commit('ADD_CHAOS_EFFECT', {
                        effect,
                        position: { x: targetCell.x, y: targetCell.y }
                    });
                }
            } else if (effect.target === 'global') {
                effect.apply(state.grid, null, this);
                commit('SET_CELLS', state.grid);
            }
        },
        processTurn({ commit, dispatch }) {
            commit('UPDATE_CHAOS_EFFECTS');
            commit('INCREMENT_CHAOS_COUNTER');

            dispatch('applyScheduledChaosEffect');
        },
        setGridSize({ commit }, size) {
            commit('SET_GRID_SIZE', size);
        },
        restartGameWithGridSize({ commit }, gridSize) {
            commit('RESET_STATE', gridSize);
            commit('SET_GRID_SIZE', gridSize);
        },
        restartGame({ dispatch, state}) {
            dispatch('restartGameWithGridSize', state.gridSize).then(() => {
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
        addRandomTile({ state, commit }) {
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
        move({ dispatch, state, commit, getters }, direction) {
            if (state.isAnimating) return;
            commit('SET_ANIMATING', true);

            const previousGrid = JSON.parse(JSON.stringify(state.grid));
            const previousScore = state.score;
            const gridSize = state.gridSize;
            const frozenTiles = getters.frozenCells || [];

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
                    score: previousScore,
                });

                commit('SET_CELLS', grid);
                commit('SET_MOVED_TILES', movedTiles);

                if (scoreIncrease > 0) {
                    commit('ADD_SCORE', scoreIncrease);
                }

                dispatch('animateMovement');
                dispatch('addRandomTile');
                dispatch('checkGameState');
                dispatch('processTurn');
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
const mergeLine = (line, direction, frozenIndices = [], blackholeIndices = []) => {
    const size = line.length;
    let compressed = line.filter((cell, index) =>
        cell.value !== 0 &&
        !frozenIndices.includes(index) &&
        !blackholeIndices.includes(index)
    );

    let scoreIncrease = 0;
    const movements = [];

    if (direction === 'right' || direction === 'down') {
        compressed.reverse();
    }

    for (let i = 0; i < compressed.length - 1; i++) {
        if (compressed[i].value === compressed[i + 1].value) {
            compressed[i] = {
                ...compressed[i],
                value: compressed[i].value * 2,
                merged: true
            };
            scoreIncrease += compressed[i].value;
            movements.push({
                from: i + 1,
                to: i,
                value: compressed[i].value
            });
            compressed.splice(i + 1, 1);
        }
    }

    const result = Array(size).fill(null);

    // Восстанавливаем замороженные ячейки
    line.forEach((cell, index) => {
        if (frozenIndices.includes(index)) {
            result[index] = { ...cell };
        }
    });

    // Пропускаем черные дыры — они остаются на месте
    line.forEach((cell, index) => {
        if (blackholeIndices.includes(index)) {
            result[index] = { ...cell };
        }
    });

    let pos = direction === 'left' || direction === 'up' ? 0 : size - 1;
    const step = direction === 'left' || direction === 'up' ? 1 : -1;

    compressed.forEach(cell => {
        while (
            pos < size &&
            pos >= 0 &&
            (result[pos] !== null || line[pos]?.value === 0 && blackholeIndices.includes(pos))
            ) {
            pos += step;
        }
        if (pos >= 0 && pos < size) {
            result[pos] = { ...cell, x: pos };

            if (cell.x !== pos) {
                movements.push({
                    from: cell.x,
                    to: pos,
                    value: cell.value
                });
            }

            // Если плитка попала в черную дыру — уничтожаем её
            if (blackholeIndices.includes(pos)) {
                result[pos].value = 0;
            }

            pos += step;
        }
    });

    for (let i = 0; i < size; i++) {
        if (result[i] === null) {
            result[i] = { value: 0, x: i, y: 0 };
        }
    }

    if (direction === 'right' || direction === 'down') {
        movements.forEach(move => {
            move.from = size - 1 - move.from;
            move.to = size - 1 - move.to;
        });
    }

    return {
        mergedLine: result,
        scoreIncrease,
        movements
    };
};

const moveRow = (grid, direction, gridSize, frozenTiles = []) => {
    let moved = false;
    let totalScoreIncrease = 0;
    const movedTiles = [];

    const blackholePositions = [];
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (grid[y][x].effects.some(e => e.type === 'BLACKHOLE')) {
                blackholePositions.push({ x, y });
            }
        }
    }

    for (let y = 0; y < gridSize; y++) {
        const row = [...grid[y]];

        const frozenIndices = frozenTiles
            .filter(tile => tile.y === y)
            .map(tile => tile.x);

        const blackholeIndices = blackholePositions
            .filter(tile => tile.y === y)
            .map(tile => tile.x);

        const { mergedLine, scoreIncrease, movements } = mergeLine(
            row.map(cell => ({ ...cell })),
            direction,
            frozenIndices,
            blackholeIndices
        );

        if (!deepEqual(row, mergedLine)) {
            moved = true;
            totalScoreIncrease += scoreIncrease;

            grid[y] = mergedLine.map((cell, x) => ({
                ...cell,
                x,
                y,
                effects: cell.effects || []
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

const moveColumn = (grid, direction, gridSize, frozenTiles = []) => {
    let moved = false;
    let totalScoreIncrease = 0;
    const movedTiles = [];

    const blackholePositions = [];
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (grid[y][x].effects.some(e => e.type === 'BLACKHOLE')) {
                blackholePositions.push({ x, y });
            }
        }
    }

    for (let x = 0; x < gridSize; x++) {
        const column = [];
        for (let y = 0; y < gridSize; y++) {
            column.push({ ...grid[y][x] });
        }

        const frozenIndices = frozenTiles
            .filter(tile => tile.x === x)
            .map(tile => tile.y);

        const blackholeIndices = blackholePositions
            .filter(tile => tile.x === x)
            .map(tile => tile.y);

        const { mergedLine, scoreIncrease, movements } = mergeLine(
            column,
            direction,
            frozenIndices,
            blackholeIndices
        );

        if (!deepEqual(column, mergedLine)) {
            moved = true;
            totalScoreIncrease += scoreIncrease;

            for (let y = 0; y < gridSize; y++) {
                grid[y][x] = {
                    ...mergedLine[y],
                    x,
                    y,
                    effects: mergedLine[y].effects || []
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
