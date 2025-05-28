<script>
import Backer from "../components/Backer.vue";
import {mapStores} from "pinia";
import {useGameStore} from "../store/game.js";
import FishInventoryItem from "../components/FishInventoryItem.vue";
import TabBar from "../components/TabBar.vue";
import InventoryItem from "../components/InventoryItem.vue";
import {ITEMS} from "../registry.js";
import {useInventoryStore} from "../store/inventory.js";
import InventorySlot from "../components/InventorySlot.vue";

export default {
    name: "Inventory",
    components: {InventorySlot, InventoryItem, TabBar, FishInventoryItem, Backer},
    computed:
        {
            displayItems() {
                if (this.equipActive) {
                    return this.inventoryStore.items.filter((x) => x.constructor.name.toLowerCase() == this.equipActive)
                }

                return this.inventoryStore.items;
            },
            ...mapStores(useGameStore, useInventoryStore)
        },
    data() {
        return {
            activePageIndex: 0,
            equipActive: null,
        }
    },
    methods: {
        rangeChange(index) {
            this.activePageIndex = index;
        },
        equipChange(type) {
            if (this.equipActive == type) {
                this.equipActive = null;
            } else {
                this.equipActive = type;
            }
        },

        isEquiped(item) {
            if (item == this.inventoryStore.equipedRod) {
                return true;
            }

            if (item == this.inventoryStore.equipedReel) {
                return true;
            }

            if (item == this.inventoryStore.equipedLine) {
                return true;
            }

            if (item == this.inventoryStore.equipedBait) {
                return true;
            }

            return false;
        }
    }
}
</script>

<template>
    <div class="menu-container">
        <Backer text="Инвентарь"></Backer>
        <p style="margin-top: 1em; margin-bottom: 1em"><img src="../assets/coin.png"> {{ inventoryStore.money }}</p>

        <TabBar :tabs="['Экипировка', 'Улов']" :active-page-index="activePageIndex" @tab-change="rangeChange"/>
        <div class="inventory-items" v-if="activePageIndex == 1" style="position: relative; margin-top: 1em;">
            <div class="overlay-center" v-if="inventoryStore.fishes.length == 0">
                <p style="color: var(--muted)">Нет рыб для продажи</p>
            </div>
            <FishInventoryItem v-for="(item, index) in inventoryStore.fishes"
                               :fish-inventory-item="item"></FishInventoryItem>
        </div>

        <div class="inventory" v-if="activePageIndex == 0">
            <div class="inventory-top" style="position: relative; margin-top: 1em;">
                <div class="slots">
                    <InventorySlot :item="inventoryStore.equipedRod" :active="equipActive == 'rod'"
                                   @click="equipChange('rod')" text="удилище"></InventorySlot>
                    <InventorySlot :item="inventoryStore.equipedReel" :active="equipActive == 'reel'"
                                   @click="equipChange('reel')" text="катушка"></InventorySlot>
                    <InventorySlot :item="inventoryStore.equipedLine" :active="equipActive == 'line'"
                                   @click="equipChange('line')" text="леска"></InventorySlot>
                    <InventorySlot :item="inventoryStore.equipedBait" :active="equipActive == 'bait'"
                                   @click="equipChange('bait')" text="наживка"></InventorySlot>
                </div>
            </div>
            <button style="margin-top: 1em; margin-bottom: 1em; width: 100%" v-if="equipActive"
                    @click="equipChange(null)">Вернуться в инвентарь
            </button>
            <div class="inventory-items">
                <div class="overlay-center" v-if="displayItems.length == 0">
                    <p style="color: var(--muted)">Нет предметов</p>
                </div>
                <InventoryItem :count="inventoryStore.getItemCount(item)" v-for="(item, index) in displayItems"
                               :item="item" :active="equipActive && isEquiped(item)" @click="inventoryStore.equipItem(item)"></InventoryItem>
            </div>
        </div>
    </div>
</template>

<style scoped>
.heading {
    margin-top: 1em;
    margin-bottom: 1em;
}

.inventory-top {
    margin-bottom: 1em;
}
</style>