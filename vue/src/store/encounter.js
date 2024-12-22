import rarity from "@/components/common/rarity";

export default {
  namespaced: true,
  state: {
    currentEncounter: null,
    encounters: [
      {
        enemies: [
          {
            id: -1,
            rarity: rarity.COMMON,
          },
          {
            id: -1,
            rarity: rarity.COMMON,
          },
        ],
        rewards: [
          {
            type: "card",
            minRarity: rarity.COMMON,
          },
        ],
        heal: 15,
      },
      {
        enemies: [
          {
            id: 0,
            rarity: rarity.COMMON,
          },
        ],
        rewards: [
          {
            type: "card",
            minRarity: rarity.RARE,
          },
        ],
        heal: 0,
      },
    ],
  },
  getters: {
    getCurrentEncounter: (state) => state.currentEncounter,
    getEncounters: (state) => state.encounters,
  },
  mutations: {
    setCurrentEncounter: (state, payload) => {
      state.currentEncounter = payload;
    },
    removeReward: (state, payload) => {
      state.currentEncounter.rewards = state.currentEncounter.rewards.filter(reward => reward != payload);
    },
  },
  actions: {
    setCurrentEncounter: ({ commit }, payload) => {
      commit("setCurrentEncounter", payload);
    },
    removeReward: ({ commit }, payload) => {
      commit("removeReward", payload);
    },
  },
};
