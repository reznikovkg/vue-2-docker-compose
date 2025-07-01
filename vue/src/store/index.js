import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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

export default new Vuex.Store({
    state: {
        gameStarted: false,
        gameOver: false,
        score: 0,
        comboCount: 0,
        comboBonus: 0,
        misses: 0,
        maxMisses: 5,
        statusMessage: '',
        activeCell: null,
        moleWasHit: false,
        moleWasMissed: false,
        missedIndex: null,
        hitIndex: null,
        moleIntervalId: null,
        moleTimeoutId: null,
        statusTimeoutId: null,
    },

    getters: {
        isGameActive: state => state.gameStarted && !state.gameOver,
        gameStarted: state => state.gameStarted,
        gameOver: state => state.gameOver,
        score: state => state.score,
        comboCount: state => state.comboCount,
        misses: state => state.misses,
        maxMisses: state => state.maxMisses,
        statusMessage: state => state.statusMessage,
        activeCell: state => state.activeCell,
        hitIndex: state => state.hitIndex,
        missedIndex: state => state.missedIndex,
    },

    mutations: {
        RESET_GAME(state) {
            state.score = 0;
            state.comboCount = 0;
            state.comboBonus = 0;
            state.misses = 0;
            state.statusMessage = '';
            state.activeCell = null;
            state.gameOver = false;
            state.moleWasHit = false;
            state.moleWasMissed = false;
            state.hitIndex = null;
            state.missedIndex = null;
        },
        SET_GAME_STARTED: (state, started) => { state.gameStarted = started; },
        SET_GAME_OVER: (state, over) => { state.gameOver = over; },
        SET_STATUS: (state, message) => { state.statusMessage = message; },
        SET_ACTIVE_CELL: (state, index) => { state.activeCell = index; },
        SET_MOLE_HIT: (state, hit) => { state.moleWasHit = hit; },
        SET_MOLE_MISSED: (state, miss) => { state.moleWasMissed = miss; },
        ADD_SCORE: (state, value) => { state.score += value; },
        INCREMENT_MISSES: (state) => { state.misses += 1; },
        INCREMENT_COMBO: (state) => { state.comboCount += 1; },
        ADD_COMBO_BONUS: (state, value) => { state.comboBonus += value; },
        RESET_COMBO(state) {
            state.comboCount = 0;
            state.comboBonus = 0;
        },
        SET_HIT_INDEX: (state, index) => { state.hitIndex = index; },
        SET_MISSED_INDEX: (state, index) => { state.missedIndex = index; },

        SET_MOLE_INTERVAL_ID: (state, id) => { state.moleIntervalId = id; },
        SET_MOLE_TIMEOUT_ID: (state, id) => { state.moleTimeoutId = id; },
        SET_STATUS_TIMEOUT_ID: (state, id) => { state.statusTimeoutId = id; },
        CLEAR_TIMEOUT_IDS(state) {
            state.moleIntervalId = null;
            state.moleTimeoutId = null;
            state.statusTimeoutId = null;
        },
    },

    actions: {
        clearAllTimeouts({ state, commit }) {
            clearTimeout(state.moleTimeoutId);
            clearTimeout(state.statusTimeoutId);
            clearInterval(state.moleIntervalId);
            commit('CLEAR_TIMEOUT_IDS');
        },

        startGame({ commit, dispatch }) {
            dispatch('clearAllTimeouts');
            commit('RESET_GAME');
            commit('SET_GAME_STARTED', true);
            dispatch('scheduleNextMole');
        },

        scheduleNextMole({ dispatch, state, commit }) {
            const { spawnInterval } = getCurrentDelays(state.comboCount);
            const intervalId = setInterval(() => {
                dispatch('spawnMole');
            }, randomTime(spawnInterval * 0.7, spawnInterval));
            commit('SET_MOLE_INTERVAL_ID', intervalId);
        },

        spawnMole({ commit, dispatch, state }) {
            const moleDuration = getCurrentDelays(state.comboCount).moleDuration;
            commit('SET_ACTIVE_CELL', Math.floor(Math.random() * 9) + 1);
            commit('SET_MOLE_HIT', false);
            commit('SET_MOLE_MISSED', false);

            clearTimeout(state.moleTimeoutId);
            const timeoutId = setTimeout(() => {
                if (!state.moleWasHit && !state.moleWasMissed && !state.gameOver) {
                    commit('ADD_SCORE', state.comboBonus);
                    commit('RESET_COMBO');
                    commit('INCREMENT_MISSES');
                    commit('SET_STATUS', `⏱️ Too slow! (${state.misses}/${state.maxMisses})`);
                    commit('SET_MISSED_INDEX', state.activeCell);

                    clearTimeout(state.statusTimeoutId);
                    const statusId = setTimeout(() => {
                        if (!state.gameOver) commit('SET_STATUS', null);
                    }, 1000);
                    commit('SET_STATUS_TIMEOUT_ID', statusId);

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
            commit('SET_MOLE_TIMEOUT_ID', timeoutId);
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
            clearTimeout(state.moleTimeoutId);

            clearTimeout(state.statusTimeoutId);
            const statusId = setTimeout(() => {
                if (!state.gameOver) commit('SET_STATUS', null);
            }, 1000);
            commit('SET_STATUS_TIMEOUT_ID', statusId);

            setTimeout(() => {
                commit('SET_HIT_INDEX', null);
                commit('SET_MISSED_INDEX', null);
            }, 400);

            if (state.misses >= state.maxMisses && !state.gameOver) {
                dispatch('endGame');
            }
        },

        endGame({ commit, state, dispatch }) {
            if (state.gameOver) return;
            commit('SET_GAME_OVER', true);
            commit('SET_STATUS', `💀 Game Over! Final Score: ${state.score}`);
            dispatch('clearAllTimeouts');
        },

        restartGame({ dispatch }) {
            dispatch('startGame');
        },
    },
});