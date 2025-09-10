import {clamp, getRandomChance, getRandomFloat, getRandomInt} from "@/utils";

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
    setState(gameState, newState) {
      clearInterval(gameState.intervalId);
      gameState.state = newState;
      gameState.qte = [];
      gameState.currentQte = null;
      console.log(`state changed to: ${newState}`);
    },
    reset(gameState) {
      if (gameState.intervalId) {
        clearInterval(gameState.intervalId);
      }

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
    setFishToCatch(gameState, fishObj) {
      gameState.fishToCatch = fishObj;
    },
    setQte(gameState, qte) {
      gameState.qte = qte;
    },
    updateQteElapsed(gameState, elapsed) {
      gameState.qteElapsed = elapsed;
    },
    setBroken(gameState, broken) {
      gameState.brokeSomething = broken;
    },
    increaseLureTime(gameState, amount) {
      gameState.lureTime += amount;
    },
    incrementProgress(gameState, amount) {
      gameState.progress += amount;
    },
    nextQte(gameState) {
      if (gameState.qte.length === 0) {
        gameState.currentQte = null;
        return;
      }

      gameState.currentQte = gameState.qte.shift();
      gameState.qteStartTime = Date.now();
    },
  },

  actions: {
    useLure({commit, rootState}, amount = 100) {
      const lure = rootState.inventory.items.find(item => item.constructor.name == "Lure" && item.count > 0);

      if (lure) {
        commit('inventory/removeItem', {item: lure}, {root: true});
        commit('increaseLureTime', amount);
      } else {
        console.warn("Can't use lure: Not enough");
      }
    },

    castRod({commit, state, rootState, rootGetters, dispatch}) {
      const {equipedRod, equipedBait} = rootState.inventory;
      let count = 0;

      if (!equipedRod || !equipedRod.equiped) return;

      commit('setState', 'casting');
      let baseDelay = 300 + equipedRod.baseDelay * rootGetters['locations/getDifficulty'];

      if (state.lureTime > 0) {
        baseDelay -= getRandomInt(100, 300);
      }

      const delay = clamp(baseDelay * (1.1 - equipedBait.effectiveness), 300, Number.MAX_SAFE_INTEGER);

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
      commit("setState", "idle");
    },

    startHook({commit, state, rootState, rootGetters, dispatch}) {
      commit('setState', 'hooked');
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

      commit('setFishToCatch', {
        fish,
        weight: clamp(getRandomFloat(0.3 * rootGetters['locations/getWeightMultiplier'], fish.maxWeight), 0.3, fish.maxWeight)
      });

      state.intervalId = setInterval(() => {
        state.getAwayLevel += 1 * rootGetters['locations/getDifficulty'];

        if (state.getAwayLevel >= 100) {
          dispatch('escaped');
        }
      }, equipedReel.timeLimit);
    },

    escaped({commit}) {
      commit('setState', 'escaped');
    },

    async startFight({commit, state, rootState, rootGetters, dispatch}) {
      commit('setState', 'fighting');
      state.progress = 0;

      const {equipedBait} = rootState.inventory;
      const fishWeight = state.fishToCatch.weight;

      const broke = await dispatch('inventory/calculateWeights', fishWeight, {root: true});

      if (broke) {
        dispatch('escaped');
        commit('setBroken', broke);
        commit('inventory/removeItem', {item: equipedBait}, {root: true});
        return;
      } else {
        if (getRandomChance(50)) {
          commit('inventory/removeItem', {item: equipedBait}, {root: true});
        }
      }

      const qte = await dispatch('generateQTEQueue', {count: 5, difficulty: rootGetters['locations/getDifficulty']});
      commit('setQte', qte);
      commit('nextQte');

      state.intervalId = setInterval(async () => {
        if (state.progress >= 100) {
          await dispatch('startCaught');
        }

        if (state.currentQte) {
          const now = Date.now();
          const elapsed = now - state.qteStartTime;

          commit('updateQteElapsed', elapsed);

          if (elapsed >= state.currentQte.timeLimit) {
            await dispatch('escaped');
          }
        }
      }, 10);
    },

    startCaught({commit, state}) {
      commit('setState', 'caught');
      commit('inventory/addFish', {item: state.fishToCatch}, {root: true});
      commit('setFishToCatch', null);
    },

    completeQTE({commit, state}, perfect = false) {
      if (state.currentQte) {
        state.currentQte.completed = true;
        commit('incrementProgress', perfect ? state.currentQte.cost : state.currentQte.cost * 2);
        commit('updateQteElapsed', 0);
        commit('nextQte');
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