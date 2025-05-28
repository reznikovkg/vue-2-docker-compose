<script>
import Backer from "../components/Backer.vue";
import {mapStores} from "pinia";
import {useGameStore} from "../store/game.js";
import FishInventoryItem from "../components/FishInventoryItem.vue";
import TabBar from "../components/TabBar.vue";
import InventoryItem from "../components/InventoryItem.vue";
import {ITEMS} from "../registry.js";
import {useInventoryStore} from "../store/inventory.js";

export default {
    name: "Shop",
    components: {InventoryItem, TabBar, FishInventoryItem, Backer},
    computed:
        {
            ITEMS() {
                return ITEMS
            },
            ...mapStores(useGameStore, useInventoryStore)
        },
    data() {
        return {
            activePageIndex: 0,
        }
    },
    methods: {
        rangeChange(index) {
            this.activePageIndex = index;
        },
    }
}
</script>

<template>
    <div class="menu-container">
        <Backer text="Магазин"></Backer>
        <p style="margin-top: 1em; margin-bottom: 1em"><img src="../assets/coin.png"> {{ inventoryStore.money }}</p>

        <TabBar :tabs="['Продать улов', 'Снасти']" :active-page-index="activePageIndex" @tab-change="rangeChange"/>
        <div class="inventory-items" v-if="activePageIndex == 0" style="position: relative; margin-top: 1em;">
            <div class="overlay-center" v-if="inventoryStore.fishes.length == 0">
                <p style="color: var(--muted)">Нет рыб для продажи</p>
            </div>
            <FishInventoryItem :sell-button="true" v-for="(item, index) in inventoryStore.fishes"
                               @sell="inventoryStore.sellFish(index)" :fish-inventory-item="item">

            </FishInventoryItem>
        </div>

        <div  v-if="activePageIndex == 1">
            <div class="heading">
                <h2>Стартовый набор</h2>
                <p>Бесплатный набор для начала, или выхода из конца...</p>
            </div>
            <div class="inventory-items">
                <InventoryItem @buy="inventoryStore.buyItem(item)" @sell="inventoryStore.removeItem(item)" :for-shop="true" :can-buy="item.price <= inventoryStore.money && item.canBuyMore()"
                               :can-sell="item.price > 0 && item.count > 0" :count="inventoryStore.getItemCount(item)" v-for="(item, index) in ITEMS.filter(x => x.price == 0)" :item="item"></InventoryItem>
            </div>

            <h2 class="heading">Снасти</h2>
            <div class="inventory-items" v-if="activePageIndex == 1">
                <InventoryItem @buy="inventoryStore.buyItem(item)" @sell="inventoryStore.removeItem(item)" :for-shop="true" :can-buy="item.price <= inventoryStore.money && item.canBuyMore()"
                               :can-sell="item.price > 0 && item.count > 0" :count="inventoryStore.getItemCount(item)" v-for="(item, index) in ITEMS.filter(x => x.price > 0)" :item="item"></InventoryItem>
            </div>
        </div>
    </div>
</template>

<style scoped>
.heading {
    margin-top: 1em;
    margin-bottom: 1em;
}
</style>