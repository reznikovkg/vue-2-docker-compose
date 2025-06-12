import {FISHES} from "@/store/game";

export default {
  namespaced: true,
  state: {
    locations: new Map(),
    activeLocation: "sea",
  },
  getters: {
    getActiveLocation: (state) => state.locations.get(state.activeLocation),
    getDifficulty: (state) => state.locations.get(state.activeLocation).difficulty,
    getWeightMultiplier: (state) => state.locations.get(state.activeLocation).weightMultiplier,
    availableFishes: (state) => { return FISHES.filter(f => f.biome.includes(state.activeLocation)); },
    getCatchChance: (state) => state.locations.get(state.activeLocation).hookChance
  },
  mutations: {
    POPULATE(state) {
      state.locations.set("sea", {
        name: "Море",
        description: "Широкая, бескрайняя морская гладь с лёгким бризом и ритмичными волнами.",
        hookChance: 20,
        weightMultiplier: 1,
        difficulty: 1,
      });

      state.locations.set("river", {
        name: "Река",
        description: "Быстрое течение и каменистое дно создают хорошие условия для ловли хищников.",
        hookChance: 30,
        weightMultiplier: 2,
        difficulty: 2,
      });

      state.locations.set("swamp", {
        name: "Болото",
        description: "Густые заросли, мутная вода. Здесь водятся выносливые рыбы.",
        hookChance: 25,
        weightMultiplier: 3,
        difficulty: 2.5,
      });
    },

    setActiveLocation(state, locationKey) {
      state.activeLocation = locationKey;
    }
  }
}
