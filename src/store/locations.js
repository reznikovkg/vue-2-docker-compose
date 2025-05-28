import { defineStore } from "pinia";

export const useLocationsStore = defineStore('locations', {
    state: () => ({
        locations: new Map(),
        activeLocation: "sea",
    }),

    actions: {
        populate() {
            this.locations.set("sea", {
               name: "Море",
               description: "Широкая, бескрайняя морская гладь с лёгким бризом и ритмичными волнами.",
               hookChance: 20,
               weightMultiplier: 1,
               difficulty: 1,
            });


            this.locations.set("river", {
                name: "Река",
                description: "Быстрое течение и каменистое дно создают хорошие условия для ловли хищников.",
                hookChance: 30,
                weightMultiplier: 2,
                difficulty: 2,
            });


            this.locations.set("swamp", {
                name: "Болото",
                description: "Густые заросли, мутная вода. Здесь водятся выносливые рыбы.",
                hookChance: 25,
                weightMultiplier: 3,
                difficulty: 2.5,
            });
        },

        getDifficulty() {
            return this.locations.get(this.activeLocation).difficulty;
        },

        getWeightMultiplier() {
            return this.locations.get(this.activeLocation).weightMultiplier;
        },

        getCatchChance() {
            return this.locations.get(this.activeLocation).hookChance;
        }
    },
});