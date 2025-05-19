export default {
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
    },

    SET_GAME_STARTED(state, started) {
        state.gameStarted = started;
    },

    SET_GAME_OVER(state, over) {
        state.gameOver = over;
    },

    SET_STATUS(state, message) {
        state.statusMessage = message;
    },

    SET_ACTIVE_CELL(state, index) {
        state.activeCell = index;
    },

    SET_MOLE_HIT(state, hit) {
        state.moleWasHit = hit;
    },

    SET_MOLE_MISSED(state, miss) {
        state.moleWasMissed = miss;
    },

    ADD_SCORE(state, value) {
        state.score += value;
    },

    INCREMENT_MISSES(state) {
        state.misses += 1;
    },

    INCREMENT_COMBO(state) {
        state.comboCount += 1;
    },

    ADD_COMBO_BONUS(state, value) {
        state.comboBonus += value;
    },

    RESET_COMBO(state) {
        state.comboCount = 0;
        state.comboBonus = 0;
    },
    SET_HIT_INDEX(state, index) {
        state.hitIndex = index;
    },
    SET_MISSED_INDEX(state, index) {
        state.missedIndex = index;
    },
};