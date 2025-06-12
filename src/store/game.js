import {getRandomChance, getRandomFloat, getRandomInt} from "@/utils";

export const FISHES = [
  {name: "Скумбрия", maxWeight: 1.5, type: "herbivorus", biome: ["sea"], pricePerKg: 12},
  {name: "Сом", maxWeight: 35, type: "predator", biome: ["sea", "river", "swamp"], pricePerKg: 20},
  {name: "Карась", maxWeight: 2, type: "omnivorous", biome: ["river", "swamp"], pricePerKg: 8},
  {name: "Щука", maxWeight: 20, type: "predator", biome: ["river", "swamp"], pricePerKg: 18},
  {name: "Лещ", maxWeight: 5, type: "omnivorous", biome: ["river", "swamp"], pricePerKg: 10},
  {name: "Окунь", maxWeight: 2, type: "predator", biome: ["river"], pricePerKg: 11},
  {name: "Сельдь", maxWeight: 1.3, type: "herbivorus", biome: ["sea"], pricePerKg: 9},
  {name: "Толстолобик", maxWeight: 35, type: "herbivorus", biome: ["river", "swamp"], pricePerKg: 14},
  {name: "Форель", maxWeight: 7, type: "predator", biome: ["river"], pricePerKg: 25},
  {name: "Тунец", maxWeight: 100, type: "predator", biome: ["sea"], pricePerKg: 40},
  {name: "Сазан", maxWeight: 25, type: "omnivorous", biome: ["river"], pricePerKg: 13},
  {name: "Краснопёрка", maxWeight: 1.8, type: "herbivorus", biome: ["river"], pricePerKg: 7}
];

export default {
  namespaced: true,
  state: {
    state: 'idle', // states: idle, casting, hooked, fighting, caught, escaped, broken
    getAwayLevel: 0,
    progress: 0,
    intervalId: null,
    qte: [],
    currentQte: null,
    fishToCatch: null,
    brokeSomething: null,
    qteStartTime: 0,
    qteElapsed: 0,
    lureTime: 0,
  },
  getters: {},
  mutations: {
    SET_STATE(gameState, newState) {
      clearInterval(gameState.intervalId);
      gameState.state = newState;
      gameState.qte = [];
      gameState.currentQte = null;
      console.log(`state changed to: ${newState}`);
    },
    RESET(gameState) {
      gameState.state = 'idle';
      gameState.getAwayLevel = 0;
      gameState.progress = 0;
      gameState.qte = [];
      gameState.currentQte = null;
      gameState.qteStartTime = null;
      gameState.qteElapsed = null;
      gameState.intervalId = null;
      gameState.brokeSomething = false;
    },
    SET_FISH_TO_CATCH(gameState, fishObj) {
      gameState.fishToCatch = fishObj;
    },
    SET_QTE(gameState, qte) {
      gameState.qte = qte;
    },
    UPDATE_QTE_ELAPSED(gameState, elapsed) {
      gameState.qteElapsed = elapsed;
    },
    SET_BROKEN(gameState, broken) {
      gameState.brokeSomething = broken;
    },
    INCREASE_LURE_TIME(state, amount) {
      state.lureTime += amount;
    },
    INCREMENT_PROGRESS(state, amount) {
      state.progress += amount;
    },
    NEXT_QTE(state) {
      if (state.qte.length === 0) {
        state.currentQte = null;
        return;
      }

      state.currentQte = state.qte.shift();
      state.qteStartTime = Date.now();
    },
  },

  actions: {
    useLure({commit, rootState}, amount = 100) {
      const lure = rootState.inventory.items.find(item => item.constructor.name == "Lure" && item.count > 0);

      if (lure) {
        commit('inventory/REMOVE_ITEM', {item: lure}, {root: true});
        commit('INCREASE_LURE_TIME', amount);
      } else {
        console.warn("Can't use lure: Not enough")
      }
    },

    castRod({commit, state, rootState, rootGetters, dispatch}) {
      const {equipedRod, equipedBait} = rootState.inventory;
      let count = 0;

      if (!equipedRod || !equipedRod.equiped) return;

      commit('SET_STATE', 'casting');
      let baseDelay = 300 + equipedRod.baseDelay * rootGetters['locations/getDifficulty'];

      if (state.lureTime > 0) {
        baseDelay -= getRandomInt(100, 300);
      }

      const delay = (baseDelay * (1.1 - equipedBait.effectiveness)).clamp(300, Number.MAX_SAFE_INTEGER);

      state.intervalId = setInterval(() => {
        if (getRandomChance(rootGetters['locations/getCatchChance']) && count > 2) {
          clearInterval(state.intervalId);
          dispatch('startHook');
        }

        state.lureTime -= 1;
        count += 1;
      }, delay);
    },

    uncastRod({commit, state}) {
      clearInterval(state.intervalId);
      commit("SET_STATE", "idle");
    },

    startHook({commit, state, rootState, rootGetters, dispatch}) {
      commit('SET_STATE', 'hooked');
      state.getAwayLevel = 0;

      const {equipedBait, equipedReel} = rootState.inventory;

      const availableFishes = rootGetters['locations/availableFishes'].filter(f =>
        (equipedBait.type === "omnivorous" || f.type === equipedBait.type)
      );

      if (!availableFishes.length) {
        dispatch('escaped');
        return;
      }

      const fish = availableFishes[Math.floor(Math.random() * availableFishes.length)];

      commit('SET_FISH_TO_CATCH', {
        fish,
        weight: getRandomFloat(0.3 * rootGetters['locations/getWeightMultiplier'], fish.maxWeight).clamp(0.3, fish.maxWeight)
      });

      state.intervalId = setInterval(() => {
        state.getAwayLevel += 1 * rootGetters['locations/getDifficulty'];

        if (state.getAwayLevel >= 100) {
          dispatch('escaped');
        }
      }, equipedReel.timeLimit);
    },

    escaped({commit}) {
      commit('SET_STATE', 'escaped');
    },

    async startFight({commit, state, rootState, rootGetters, dispatch}) {
      commit('SET_STATE', 'fighting');
      state.progress = 0;

      const {equipedBait} = rootState.inventory;
      const fishWeight = state.fishToCatch.weight;

      const broke = await dispatch('inventory/calculateWeights', fishWeight, {root: true});

      if (broke) {
        dispatch('escaped');
        commit('SET_BROKEN', broke);
        commit('inventory/REMOVE_ITEM', {item: equipedBait}, {root: true});
        return;
      } else {
        if (getRandomChance(50)) {
          commit('inventory/REMOVE_ITEM', {item: equipedBait}, {root: true});
        }
      }

      const qte = await dispatch('generateQTEQueue', {count: 5, difficulty: rootGetters['locations/getDifficulty']});
      commit('SET_QTE', qte);
      commit('NEXT_QTE');

      state.intervalId = setInterval(async () => {
        if (state.progress >= 100) {
          await dispatch('startCaught');
        }

        if (state.currentQte) {
          const now = Date.now();
          const elapsed = now - state.qteStartTime;

          commit('UPDATE_QTE_ELAPSED', elapsed);

          if (elapsed >= state.currentQte.timeLimit) {
            await dispatch('escaped');
          }
        }
      }, 10);
    },

    startCaught({commit, state}) {
      commit('SET_STATE', 'caught');
      commit('inventory/ADD_FISH', {item: state.fishToCatch}, {root: true});
      commit('SET_FISH_TO_CATCH', null);
    },

    completeQTE({commit, state}, perfect = false) {
      if (state.currentQte) {
        state.currentQte.completed = true;
        commit('INCREMENT_PROGRESS', perfect ? state.currentQte.cost : state.currentQte.cost * 2);
        commit('UPDATE_QTE_ELAPSED', 0);
        commit('NEXT_QTE');
      }
    },

    generateQTEQueue(_, {count, difficulty}) {
      return Array.from({length: count}, (_, i) => ({
        id: i,
        timeLimit: 700 + (Math.random() * 1000 / difficulty),
        cost: 100 / count,
        completed: false,
      }));
    },
  }
}