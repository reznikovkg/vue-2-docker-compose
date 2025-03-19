import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    enemyPosition: 0, // Позиция врага
    enemyHealth: 100, // Здоровье врага
    coins: 500, // Начальное количество монет
    gameOver: false, // Состояние игры: завершена или нет
    enemyDefeated: false, // Состояние: враг побежден или нет
    currentLevel: 0,
  },
  getters: {
    getEnemyPosition: state => state.enemyPosition,
    getEnemyHealth: state => state.enemyHealth,
    getCoins: state => state.coins, // Получаем количество монет
    getGameOver: state => state.gameOver, // Получаем состояние завершения игры
    getEnemyDefeated: state => state.enemyDefeated, // Получаем состояние победы над врагом
    getCurrentLevel: state => state.currentLevel,
  },
  mutations: {
    setEnemyPosition(state, position) {
      state.enemyPosition = position;
    },
    setEnemyHealth(state, health) {
      state.enemyHealth = health;
    },
    setCoins(state, coins) {
      state.coins = coins; // Обновляем количество монет
    },
    updateCoins(state, amount) {
      state.coins += amount; // Добавляем или вычитаем монеты
    },
    setGameOver(state, status) {
      state.gameOver = status; // Обновляем состояние игры
    },
    setEnemyDefeated(state, status) {
      state.enemyDefeated = status; // Обновляем состояние победы над врагом
    },
    setCurrentLevel(state, level) {
      state.currentLevel = level;
    },
  },
  actions: {
    updateEnemyPosition({ commit }, position) {
      commit('setEnemyPosition', position);
    },
    updateEnemyHealth({ commit }, health) {
      commit('setEnemyHealth', health);
    },
    updateCoins({ commit }, amount) {
      commit('updateCoins', amount); // Обновляем монеты
    },
    updateGameOver({ commit }, status) {
      commit('setGameOver', status); // Обновляем статус завершения игры
    },
    updateEnemyDefeated({ commit }, status) {
      commit('setEnemyDefeated', status); // Обновляем статус победы над врагом
    },
    updateCurrentLevel({ commit }, level) {
      commit('setCurrentLevel', level);
    },
  },
})
