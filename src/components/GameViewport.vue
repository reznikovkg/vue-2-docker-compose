<script>
import Rod from "./Rod.vue";
import {nextTick} from "vue";
import {useGameStore} from '../store/game';
import {mapStores} from "pinia";
import Qte from "./Qte.vue";
import {getRandomInt} from "../utils.js";
import {useLocationsStore} from "../store/locations.js";
import {useInventoryStore} from "../store/inventory.js";

export default {
    name: "GameViewport",
    components: {Qte, Rod},
    data() {
        return {
            qtePosX: getRandomInt(30, 60),
            qtePosY: getRandomInt(30, 50),
            waterRect: new DOMRect(0, 0, 0,0)
        }
    },
    computed: {
        fightQtePercent() {
            if (!this.gameStore.currentQte) return 0;
            return Math.min(
                100,
                (this.gameStore.qteElapsed / this.gameStore.currentQte.timeLimit) * 100
            );
        },


        floatIntensity() {
            switch (this.gameStore.state) {
                case "hooked":
                    return 1.0;
                case "fighting":
                    return 2.0;
                default:
                    return 0.0;
            }
        },

        sinkLevel() {
            //console.log((this.gameStore.getAwayLevel / 100) * 28);
            return (this.gameStore.getAwayLevel / 100) * 28;
        },

        qteStyle() {
            return `left: ${this.qtePosX}%; top: ${this.qtePosY}%`;
        },

        sceneryStyle() {
            const locationsStore = useLocationsStore();
            return `background-image: url("/backgrounds/${locationsStore.activeLocation}/scenery.png")`;
        },

        waterStyle() {
            const locationsStore = useLocationsStore();
            return `background-image: url("/backgrounds/${locationsStore.activeLocation}/water.png")`;
        },

        ...mapStores(useGameStore, useInventoryStore)
    },

    methods: {
        nextQtePos() {
            this.qtePosX = getRandomInt(30, 60);
            this.qtePosY = getRandomInt(10, 50);
        },

        async castRodEvent(event) {
            const game = useGameStore();
            const locations = useLocationsStore();

            if (!this.inventoryStore.equipedRod || !this.inventoryStore.equipedRod.equiped) {
                console.warn("Rod is not equiped!");
                return;
            }

            if (game.state == "idle") {
                this.waterRect = event.target.getBoundingClientRect();

                const x = event.clientX - this.waterRect.left;
                const y = event.clientY - this.waterRect.top;

                game.castRod();
                await nextTick();
                this.$refs.rod.setFloatPosition(x, y);
            }

            if (game.state == "hooked") {
                this.gameStore.startFight()
            }
        },

        fightQTESuccess(perfect = false) {
            const game = useGameStore();
            game.completeQTE(perfect);
            this.nextQtePos();
        },

        fightQTEFailed() {
            this.nextQtePos();
        }
    },
}
</script>

<template>
    <div class="game">
        <div class="playfield scenery" :style="sceneryStyle">
        </div>
        <div class="playfield water" @click="castRodEvent" :style="waterStyle">
            <Rod v-if="inventoryStore.equipedRod && inventoryStore.equipedRod.equiped" :is-catched="gameStore.state == 'fighting' || gameStore.state == 'hooked'" :water-rect="waterRect"
                 :float-intensity="floatIntensity" :sink-level="sinkLevel"
                 :is-cast="gameStore.state != 'idle'" ref="rod"/>

            <Qte class="game-qte" :style="qteStyle" @completed="fightQTESuccess" @perfect="fightQTESuccess(true)"
                 @failed="fightQTEFailed"
                 v-if="fightQtePercent > 0"
                 :percent="fightQtePercent"></Qte>
        </div>
    </div>
</template>

<style scoped>
.game {
    width: 100%;
    height: 100%;
}

.game-qte {
    position: absolute; transform: translate(-50%, -50%);
    z-index: 10;
}

.playfield {
    position: relative;
    width: 100%;
    image-rendering: pixelated;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.playfield.scenery {
    background-position: 50% 100%;
}
</style>
