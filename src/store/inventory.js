import { defineStore } from "pinia";
import {ITEMS} from "../registry.js";
import {getRandomInt} from "../utils.js";

export const useInventoryStore = defineStore("inventory", {
    state: () => ({
        items: [],
        fishes: [],
        equipedRod: null,
        equipedReel: null,
        equipedLine: null,
        equipedBait: null,
        money: 1000,
    }),

    actions: {
        buyItem(item) {
            if (this.money >= item.price) {
                let index = this.items.findIndex((x) => x.id === item.id);

                if (index === -1) {
                    index = this.items.push(item) - 1;
                }

                if (!this.items[index].stackable) {
                    this.items[index].count = 1;
                } else {
                    this.items[index].count += 1;
                }

                this.money -= item.price;
                return true;
            } else {
                console.warn("Not enough money");
                return false;
            }
        },


        removeItem(item, sell = true) {
            let foundItem = this.items.find((x) => x.id === item.id);

            if (foundItem) {
                if (foundItem.count == 1) {
                    // TODO: Remove this splice
                    this.items.splice(this.items.indexOf(foundItem), 1);

                    if (this.equipedRod.id == foundItem.id) {
                        this.equipedRod = null;
                    }

                    if (this.equipedReel.id == foundItem.id) {
                        this.equipedReel = null;
                    }

                    if (this.equipedLine.id == foundItem.id) {
                        this.equipedLine = null;
                    }

                    if (this.equipedBait.id == foundItem.id) {
                        this.equipedBait = null;
                    }

                }

                foundItem.count = (foundItem.count - 1).clamp(0, Number.MAX_SAFE_INTEGER);
            } else {
                console.warn(`${item.name} ${item.id} not found in inventory!`);
                return false;
            }

            if (sell) {
                this.money += item.price;
            }
            return true;
        },

        equipItem(item) {
            switch (item.constructor.name) {
                case "Rod":
                    this.equipedRod = item;
                    break;
                case "Line":
                    this.equipedLine = item;
                    break;
                case "Bait":
                    this.equipedBait = item;
                    break;
                case "Reel":
                    this.equipedReel = item;
                    break;
                default:
                    console.error(`Item with class ${item.constructor.name} cannot be equip!`);
                    break;
            }
        },


        /**
         * Calculates damage for equiped items.
         * @param {number} weight - current fish weight
         */
        calculateWeights(weight) {



            if (this.equipedRod.handleWeight * getRandomInt(1, 3) < weight) {
                this.removeItem(this.equipedRod, false);
                return "Rod";
            }
            if (this.equipedReel.handleWeight * getRandomInt(1, 2) < weight) {
                this.removeItem(this.equipedReel, false);
                return "Reel";
            }

            if (this.equipedLine.handleWeight < weight) {
                this.removeItem(this.equipedLine, false);
                return "Line";
            }

            return null;
        },


        getItemCount(item) {
            const value = this.items.find((x) => x.id === item.id);

            if (value) {
                return value.count;
            } else {
                return 0;
            }
        },

        debugAddFishes() {
            // for (let i = 0; i < 10; i++) {
            //     const fish = FISHES[Math.floor(Math.random() * FISHES.length)];
            //     this.fishes.push({
            //         fish: fish,
            //         weight: getRandomFloat(0.3, fish.maxWeight)
            //     });
            // }

            this.buyItem(ITEMS[1]);
            this.buyItem(ITEMS[5]);
            this.buyItem(ITEMS[8]);
            this.buyItem(ITEMS[11]);
        },

        sellFish(fishIndex) {
            this.money += Math.floor(this.fishes[fishIndex].weight * this.fishes[fishIndex].fish.pricePerKg);
            this.fishes.splice(fishIndex, 1);
        }
    },
});