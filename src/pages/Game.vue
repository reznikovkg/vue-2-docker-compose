<script>
import CatchProgress from "../components/CatchProgress.vue";
import GameViewport from "../components/GameViewport.vue";
import {mapStores} from "pinia";
import {useGameStore} from "../store/game.js";
import Modal from "../components/Modal.vue";
import {useInventoryStore} from "../store/inventory.js";
import InventorySlot from "../components/InventorySlot.vue";
import Notice from "../components/Notice.vue";

export default {
    name: "Game",
    components: {Notice, InventorySlot, Modal, GameViewport, CatchProgress},
    computed: {
        ...mapStores(useGameStore, useInventoryStore),
        caughtFish() {
            // idk why mapStores didn't work so using in data instead
            return this.inventory.fishes[this.inventory.fishes.length - 1];
        },

        brokenText() {
            switch (this.gameStore.brokeSomething) {
                case "Rod":
                    return "Удочка сломалась";
                case "Reel":
                    return "Катушка сломалась";
                case "Line":
                    return "Леска порвалась";
                default:
                    return "Рыба сошла!";
            }
        },


        haveLure() {
            return this.inventoryStore.items.find((x) => x.constructor.name == "Lure");
        },

        rodEquiped() {
            return this.inventoryStore.equipedRod && this.inventoryStore.equipedRod.equiped;
        }
    },

    watch: {
        'store.state'(newValue, _) {
            if (newValue == "escaped") {
                this.$refs.escapeNotice.show(this.brokenText);
                this.reset();
            }
        }
    },

    data() {
        return {store: useGameStore(), inventory: useInventoryStore(), noItemsEquipedModal: false};
    },

    methods: {
        responseModal(index) {
            this.noItemsEquipedModal = false;
            if (index === 1) {
                this.$router.push('/inventory');
            }
        },

        reset() {
            this.store.unequipRod();
            this.store.reset();
            this.noItemsEquipedModal = false;
        },

        equipRod() {
            if (!this.inventoryStore.equipedRod || !this.inventoryStore.equipedReel || !this.inventoryStore.equipedLine || !this.inventoryStore.equipedBait) {
                this.noItemsEquipedModal = true;
                return;
            }
                this.store.equipRod();
        },

        useLure() {
            if (this.haveLure) {
                this.haveLure.use();
                this.inventoryStore.removeItem(this.haveLure, false);
            }
        },

        exit() {
            this.store.reset();
            this.$router.replace('locations');
        }
    }
}
</script>

<template>
    <div class="game">
        <GameViewport></GameViewport>
        <Notice ref="escapeNotice"></Notice>
        <CatchProgress v-if="gameStore.state == 'fighting'" :percent="gameStore.progress"></CatchProgress>
        <Modal :buttons="['Забрать']" :shown="gameStore.state == 'caught'" @close="reset">
            <div class="modal-status">
                <h1>Вы поймали рыбу!</h1>
                <img :src="`/fishes/${caughtFish.fish.type}.png`">
                <h2>{{ caughtFish.fish.name }}</h2>
                <p>Вес: {{ caughtFish.weight.toFixed(2) }} кг</p>
            </div>
        </Modal>

        <Modal :buttons="['Понятно', 'В инвентарь']" :shown="noItemsEquipedModal" @response="responseModal">
            <p>Отсутствуют следующие элементы экипировки, необходимые для рыбалки:</p>
            <ul>
                <li v-if="!inventoryStore.equipedRod">Удилище</li>
                <li v-if="!inventoryStore.equipedReel">Катушка</li>
                <li v-if="!inventoryStore.equipedLine">Леска</li>
                <li v-if="!inventoryStore.equipedBait">Наживка</li>
            </ul>
            <p>Экипируйте эти предметы чтобы начать рыбачить</p>
        </Modal>

        <div class="ui">
            <button @click="store.uncastRod()" v-if="gameStore.state == 'casting'">Смотать удочку</button>
            <button @click="equipRod()" v-if="!rodEquiped">Взять удочку</button>
            <button @click="store.unequipRod()" v-if="rodEquiped && gameStore.state == 'idle'">Убрать удочку</button>

            <button v-if="haveLure" @click="useLure">Прикормить</button>
        </div>

        <button class="exit" @click="exit" v-if="gameStore.state == 'idle' || gameStore.state == 'casting'">← Уйти</button>

        <div class="slots" @click="$router.push('/inventory')">
            <InventorySlot :item="inventoryStore.equipedRod" :active="equipActive == 'rod'"
                           text="удилище"></InventorySlot>
            <InventorySlot :item="inventoryStore.equipedReel" :active="equipActive == 'reel'"
                           text="катушка"></InventorySlot>
            <InventorySlot :item="inventoryStore.equipedLine" :active="equipActive == 'line'"
                           text="леска"></InventorySlot>
            <InventorySlot :item="inventoryStore.equipedBait" :active="equipActive == 'bait'"
                           text="наживка"></InventorySlot>
        </div>
    </div>
</template>

<style scoped>
.game {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
}

.ui {
    margin: 1em;
    display: flex;
    gap: 0.2em;
    position: fixed;
    bottom: 1em;
}

.modal-status {
    text-align: center;
}

.modal-status img {
    margin-top: 1em;
    margin-bottom: 1em;
    width: 64px;
}

.exit {
    position: fixed;
    right: 1em;
    top: 1em;
}

.slots {
    position: fixed;
    top: 1em;
    left: 1em;
    background-color: var(--background);
    padding: 0.5em;
    flex-direction: column;
}

.modal-status p {
    margin: 0;
    padding: 0;
}
</style>