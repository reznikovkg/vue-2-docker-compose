let moleInterval = null;
let moleTimeout = null;
let statusTimeout = null;

function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCurrentDelays(comboCount) {
    const speedFactor = 0.1;
    const baseInterval = 3000;
    const baseDuration = 1500;
    const factor = 1 + comboCount * speedFactor;
    return {
        spawnInterval: Math.max(500, baseInterval / factor),
        moleDuration: Math.max(300, baseDuration / factor),
    };
}

export default {
    startGame({ commit, dispatch }) {
        commit('RESET_GAME');
        commit('SET_GAME_STARTED', true);
        dispatch('scheduleNextMole');
    },

    scheduleNextMole({ dispatch, state }) {
        const { spawnInterval } = getCurrentDelays(state.comboCount);
        moleInterval = setTimeout(() => {
            dispatch('spawnMole');
            dispatch('scheduleNextMole');
        }, randomTime(spawnInterval * 0.7, spawnInterval));
    },

    spawnMole({ commit, dispatch, state }) {
        const moleDuration = getCurrentDelays(state.comboCount).moleDuration;
        commit('SET_ACTIVE_CELL', Math.floor(Math.random() * 9) + 1);
        commit('SET_MOLE_HIT', false);
        commit('SET_MOLE_MISSED', false);

        clearTimeout(moleTimeout);
        moleTimeout = setTimeout(() => {
            if (!state.moleWasHit && !state.moleWasMissed && !state.gameOver) {
                commit('ADD_SCORE', state.comboBonus);
                commit('RESET_COMBO');
                commit('INCREMENT_MISSES');
                commit('SET_STATUS', `⏱️ Too slow! (${state.misses}/${state.maxMisses})`);
                commit('SET_MISSED_INDEX', state.activeCell);

                clearTimeout(statusTimeout);
                statusTimeout = setTimeout(() => {
                    if (!state.gameOver) commit('SET_STATUS', null);
                }, 1000);

                setTimeout(() => {
                    commit('SET_MOLE_MISSED', false);
                    commit('SET_MISSED_INDEX', null);
                }, 400);

                if (state.misses >= state.maxMisses) {
                    dispatch('endGame');
                }
            }
            commit('SET_ACTIVE_CELL', null);
        }, randomTime(moleDuration * 0.7, moleDuration));
    },

    handleCellClick({ commit, state, dispatch }, index) {
        if (!state.gameStarted || state.misses >= state.maxMisses || state.gameOver) return;

        const isHit = index === state.activeCell;
        if (isHit) {
            commit('SET_MOLE_HIT', true);
            commit('INCREMENT_COMBO');

            const multiplier = 1 + state.comboCount * 0.05;
            const points = Math.round(100 * multiplier);

            commit('ADD_COMBO_BONUS', points);
            commit('SET_STATUS', `✅ Hit! +${points} pts (Combo x${state.comboCount})`);
            commit('SET_HIT_INDEX', index);
            commit('SET_MISSED_INDEX', null);
        } else {
            commit('SET_MOLE_MISSED', true);
            commit('ADD_SCORE', state.comboBonus);
            commit('RESET_COMBO');
            commit('INCREMENT_MISSES');
            commit('SET_STATUS', `❌ Miss! (${state.misses}/${state.maxMisses})`);
            commit('SET_MISSED_INDEX', index);
            commit('SET_HIT_INDEX', null);
        }

        commit('SET_ACTIVE_CELL', null);

        clearTimeout(statusTimeout);
        statusTimeout = setTimeout(() => {
            if (!state.gameOver) commit('SET_STATUS', null);
        }, 1000);

        setTimeout(() => {
            commit('SET_HIT_INDEX', null);
            commit('SET_MISSED_INDEX', null);
        }, 400);

        if (state.misses >= state.maxMisses && !state.gameOver) {
            dispatch('endGame');
        }
    },

    endGame({ commit, state }) {
        commit('SET_STATUS', `💀 Game Over! Final Score: ${state.score}`);
        commit('SET_GAME_OVER', true);
        clearTimeout(moleTimeout);
        clearTimeout(statusTimeout);
        clearTimeout(moleInterval);
    },

    restartGame({ dispatch }) {
        dispatch('startGame');
    }
};