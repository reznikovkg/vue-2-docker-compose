<template>
  <div class="main-container">
    <BackerHeader text="Магазин"></BackerHeader>
    <p style="margin-top: 1em; margin-bottom: 1em"><img src="../../assets/coin.png"> {{ inventory.money }}</p>

    <TabBar :tabs="['Продать улов', 'Снасти']" :active-page-index="activePageIndex" @tabChange="(index) => rangeChange(index)"/>
    <div class="item-container" v-if="activePageIndex == 0" style="position: relative; margin-top: 1em;">
      <div class="overlay-center" v-if="inventory.fishes.length == 0">
        <p>Нет рыб для продажи</p>
      </div>
      <FishInventoryItem :sell-button="true" v-for="(item, index) in inventory.fishes" @sell="() => sellFish(index)"
                         :key="index" :fish-inventory-item="item.item">
      </FishInventoryItem>
    </div>

    <div v-if="activePageIndex == 1">
      <div class="main-container__heading">
        <h2>Стартовый набор</h2>
        <p>Бесплатный набор для начала, или выхода из конца...</p>
      </div>
      <div class="item-container">
        <InventoryItem @buy="() => buyItem(item)" @sell="() => sellItem(item)" :for-shop="true"
                       :can-buy="item.price <= inventory.money && item.canBuyMore()"
                       :can-sell="item.price > 0 && item.count > 0" :count="item.count" :key="item.name"
                       v-for="item in ITEMS.filter(x => x.price == 0)" :item="item"></InventoryItem>
      </div>

      <h2 class="heading">Снасти</h2>
      <div class="item-container" v-if="activePageIndex == 1">
        <InventoryItem @buy="() => buyItem(item)" @sell="() => sellItem(item)" :for-shop="true"
                       :can-buy="item.price <= inventory.money && item.canBuyMore()" :key="item.name"
                       :can-sell="item.price > 0 && item.count > 0" :count="item.count"
                       v-for="item in ITEMS.filter(x => x.price > 0)" :item="item"></InventoryItem>
      </div>
    </div>
  </div>
</template>

<script>
import InventoryItem from "@/components/parts/InventoryItem.vue";
import TabBar from "@/components/parts/TabBar.vue";
import FishInventoryItem from "@/components/parts/FishInventoryItem.vue";
import BackerHeader from "@/components/parts/BackerHeader.vue";
import {ITEMS} from "@/store/inventory";
import {mapActions, mapState} from "vuex";

export default {
  name: "ShopPage",
  components: {InventoryItem, TabBar, FishInventoryItem, BackerHeader},
  computed:
    {
      ITEMS() {
        return ITEMS
      },
      ...mapState({
        game: state => state.game,
        inventory: state => state.inventory
      }),
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

    ...mapActions({
      sellFish: 'inventory/sellFish',
      sellItem: 'inventory/sellItem',
      buyItem: 'inventory/buyItem',
    }),
  }
}
</script>

<style scoped>
.main-container__heading {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>