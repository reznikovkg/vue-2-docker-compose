import enemyStore from "./enemy";
import { selectRandomPattern, randomInteger } from "@/components/common/helpers";

export default {
  namespaced: true,
  state: {
    player: {
      maxHealth: 60,
      health: 60,
      shield: 0,
      status: [],
    },
    mana: {
      max: 3,
      current: 3,
    },
    currentEnemies: [],
  },
  getters: {
    getPlayer: (state) => state.player,
    getEnemies: (state) => state.currentEnemies,
    getMana: (state) => state.mana,
  },
  mutations: {
    addEnemyById: (state, payload) => {
      const base = enemyStore.state.enemies[payload];
      state.currentEnemies.push(
          {
            base: base,
            health: base.maxHealth,
            shield: 0,
            status: [],
            currentPattern: selectRandomPattern(base.actionPatterns),
            intent: null,
          })
    },

    enemySetIntent: (state, payload) => {
      let enemy = state.currentEnemies.find((enemy) => enemy == payload);
      enemy.intent = enemy.currentPattern[0];
      enemy.intent.values[0] =
        randomInteger(enemy.intent.values[0] - enemy.intent.randomRange,
          enemy.intent.values[0] + enemy.intent.randomRange);
    },

    enemyNextAction: (state, payload) => {
      let enemy = state.currentEnemies.find((enemy) => enemy == payload);
      enemy.currentPattern.splice(0, 1);
    },

    enemyNextPattern: (state, payload) => {
      let enemy = state.currentEnemies.find((enemy) => enemy == payload);
      enemy.currentPattern = selectRandomPattern(enemy.base.actionPatterns);
    },

    clearEnemies: (state) => {
      state.currentEnemies = [];
    },

    applyDamage: (state, payload) => {
      let target = null;
      if (payload.target == "player") {
        target = state.player
      } else {
        target = state.currentEnemies.find((enemy) => enemy == payload.target);
      }
      if (target == null)
        return;
      let amount = payload.amount;
      if (target.shield > 0) {
        if (amount > target.shield) {
          amount -= target.shield;
          target.shield = 0;
        } else {
          target.shield = target.shield - amount;
          amount = 0;
        }
      }

      target.health = target.health - amount;

      if (target.health <= 0) {
        if (target != state.player) {
          state.currentEnemies = state.currentEnemies.filter((enemy) => enemy !== target);
        }
      }
    },

    applyHeal: (state, payload) => {
      let target = null;
      if (payload.target == "player") {
        target = state.player
      } else {
        target = state.currentEnemies.find((enemy) => enemy == payload.target);
      }
      if (target == null)
        return;
      
      target.health = Math.min(target.health + payload.amount, target.maxHealth);
    },

    applyShield: (state, payload) => {
      let target = null;
      if (payload.target == "player") {
        target = state.player
      } else {
        target = state.currentEnemies.find((enemy) => enemy == payload.target);
      }

      target.shield = target.shield + payload.amount;
    },

    setShield: (state, payload) => {
      let target = null;
      if (payload.target == "player") {
        target = state.player
      } else {
        target = state.currentEnemies.find((enemy) => enemy == payload.target);
      }

      target.shield = payload.amount;
    },

    changeMaxMana: (state, payload) => {
      state.mana.max = state.mana.max + payload;
    },

    changeCurrentMana: (state, payload) => {
      state.mana.current = state.mana.current + payload;
    },

    setCurrentMana: (state, payload) => {
      state.mana.current = payload;
    }
  },
  actions: {
    addEnemyById: ({ commit }, payload) => {
      commit("addEnemyById", payload);
    },
    clearEnemies: ({ commit }) => {
      commit("clearEnemies");
    },
    applyDamage: ({ commit }, payload) => {
      commit("applyDamage", payload);
    },
    applyHeal: ({commit }, payload) => {
      commit("applyHeal", payload);
    },
    applyShield: ({ commit }, payload) => {
      commit("applyShield", payload);
    },
    setShield: ({ commit }, payload) => {
      commit("setShield", payload);
    },
    changeMaxMana: ({ commit }, payload) => {
      commit("changeMaxMana", payload);
    },
    changeCurrentMana: ({ commit }, payload) => {
      commit("changeCurrentMana", payload);
    },
    setCurrentMana: ({ commit }, payload) => {
      commit("setCurrentMana", payload);
    },
    enemySetIntent: ({ commit }, payload) => {
      commit("enemySetIntent", payload);
    },
    enemyNextAction: ({ commit, state }, payload) => {
      let enemy = state.currentEnemies.find((enemy) => enemy == payload);
      if (enemy.currentPattern.length > 1) {
        commit("enemyNextAction", payload);
      } else {
        commit("enemyNextPattern", payload);
      }
      commit("enemySetIntent", payload);
    },
  },
};
