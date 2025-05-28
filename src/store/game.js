import { defineStore } from "pinia";
import {getRandomChance, getRandomFloat, getRandomInt} from "../utils.js";
import {useLocationsStore} from "./locations.js";
import {FISHES, ITEMS} from "../registry.js";
import {useInventoryStore} from "./inventory.js";

export const useGameStore = defineStore('game', {
    state: () => ({
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
    }),

    actions: {
        equipRod() {
            const inventoryStore = useInventoryStore();
            inventoryStore.equipedRod.equiped = true;
        },

        unequipRod() {
            const inventoryStore = useInventoryStore();

            if (inventoryStore.equipedRod) {
                inventoryStore.equipedRod.equiped = false;
            }

            this.reset();
        },

        castRod() {
            const inventoryStore = useInventoryStore();
            if (!inventoryStore.equipedRod || !inventoryStore.equipedRod.equiped) return;

            let count = 0;

            this.setState('casting');
            const locationStore = useLocationsStore();

            let baseDelay = 300 + inventoryStore.equipedRod.baseDelay * locationStore.getDifficulty();

            if (this.lureTime > 0) {
                baseDelay -= getRandomInt(100, 300);
            }

            const delay = (baseDelay * (1.1 - inventoryStore.equipedBait.effectiveness)).clamp(300, Number.MAX_SAFE_INTEGER);

            this.intervalId = setInterval(() => {
                if (getRandomChance(locationStore.getCatchChance()) && count > 2) {
                    clearInterval(this.intervalId);
                    this.startHook();
                }

                this.lureTime -= 1;

                count += 1;
            }, delay);
        },

        startHook() {
            this.getAwayLevel = 0;
            this.setState('hooked');
            const locationStore = useLocationsStore();
            const inventoryStore = useInventoryStore();

            const availableFishes = FISHES.filter((x) =>
                x.biome.includes(locationStore.activeLocation)
                && (inventoryStore.equipedBait.type == "omnivorous" || x.type == inventoryStore.equipedBait.type)
            );

            if (!availableFishes.length) {
                this.escaped();
                return;
            }


            const fish = availableFishes[Math.floor(Math.random() * availableFishes.length)];
            this.fishToCatch = {
                fish: fish,
                weight: getRandomFloat(0.3 * locationStore.getWeightMultiplier(), fish.maxWeight).clamp(0.3, fish.maxWeight)
            };

            this.intervalId = setInterval(() => {
                this.getAwayLevel += 1 * locationStore.getDifficulty();

                if (this.getAwayLevel >= 100) {
                    this.escaped();
                }
            }, inventoryStore.equipedReel.timeLimit);
        },

        escaped() {
            this.setState('escaped');
        },


        startFight() {
            this.progress = 0;
            this.setState('fighting');

            const inventoryStore = useInventoryStore();

            this.brokeSomething = inventoryStore.calculateWeights(this.fishToCatch.weight);

            if (this.brokeSomething) {
                this.escaped();
                inventoryStore.removeItem(inventoryStore.equipedBait, false);
                return;
            } else {
                if (getRandomChance(50)) {
                    inventoryStore.removeItem(inventoryStore.equipedBait, false);
                }
            }

            this.qte = this.generateQTEQueue(5);
            this.nextQTE();


            this.intervalId = setInterval(() => {
                //console.log(this.progress);
                if (this.progress >= 100) {
                    this.startCaught();
                }

                const now = Date.now();

                if (this.currentQte) {
                    this.qteElapsed = now - this.qteStartTime;

                    if (this.qteElapsed >= this.currentQte.timeLimit) {
                        this.escaped();
                    }
                }

            }, 10);
        },

        startCaught() {
            this.setState('caught');
            const inventoryStore = useInventoryStore();
            inventoryStore.fishes.push(this.fishToCatch);

            this.fishToCatch = null;
        },

        nextQTE() {
            if (this.qte.length === 0) {
                this.currentQte = null;
                return;
            }

            const qte = this.qte.shift();
            this.currentQte = qte;
            this.qteStartTime = Date.now();
        },

        completeQTE(perfect = false) {
            if (this.currentQte) {
                this.currentQte.completed = true;
                this.progress += perfect ? this.currentQte.cost : this.currentQte.cost * 2;
                this.qteElapsed = 0;
                this.nextQTE();
            }
        },

        generateQTEQueue(count) {
            const locationStore = useLocationsStore();

            return Array.from({ length: count }, (_, i) => ({
                id: i,
                timeLimit: 700 + (Math.random() * 1000 / locationStore.getDifficulty()),
                cost: 100 / count,
                completed: false,
            }));
        },

        uncastRod() {
            clearInterval(this.intervalId);
            this.reset();
        },

        reset() {
            this.state = 'idle';
            this.getAwayLevel = 0;
            this.progress = 0;
            this.qte = [];
            this.currentQte = null;
            this.qteStartTime = null;
            this.qteElapsed = null;
            this.intervalId = null;
            this.brokeSomething = false;
        },

        setState(newState) {
            clearInterval(this.intervalId);
            this.state = newState;
            this.qte = [];
            this.currentQte = null;
            console.log(`state changed to: ${newState}`);
        },
    },
});