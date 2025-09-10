<template>
  <div class="main-container">
    <BackerHeader text="Инвентарь"></BackerHeader>
    <p style="margin-top: 1em; margin-bottom: 1em"><img src="../../assets/coin.png"> {{ inventory.money }}</p>

    <TabBar :tabs="['Экипировка', 'Улов']" :active-page-index="activePageIndex"
            @tabChange="(index) => rangeChange(index)"/>
    <div class="item-container" v-if="activePageIndex == 1" style="position: relative; margin-top: 1em;">
      <div class="overlay-center" v-if="inventory.fishes.length == 0">
        <p>Нет улова</p>
      </div>
      <FishInventoryItem v-for="(item, index) in inventory.fishes"
                         :fish-inventory-item="item.item" :key="`${item.name}${index}`"></FishInventoryItem>
    </div>

    <div v-if="activePageIndex == 0">
      <div class="inventory-top" style="position: relative; margin-top: 1em; margin-bottom: 1em;">
        <div class="inventory-slots">
          <InventorySlot :item="inventory.equipedRod" :active="equipActive == 'rod'"
                         @click="() => equipChange('rod')" text="удилище"></InventorySlot>
          <InventorySlot :item="inventory.equipedReel" :active="equipActive == 'reel'" text="катушка"
                         @click="() => equipChange('reel')"></InventorySlot>
          <InventorySlot :item="inventory.equipedLine" :active="equipActive == 'line'" text="леска"
                         @click="() => equipChange('line')"></InventorySlot>
          <InventorySlot :item="inventory.equipedBait" :active="equipActive == 'bait'" text="наживка"
                         @click="() => equipChange('bait')"></InventorySlot>
        </div>
      </div>
      <button style="margin-top: 1em; margin-bottom: 1em; width: 100%" v-if="equipActive"
              @click="() => equipChange(null)">Вернуться в инвентарь
      </button>
      <div class="item-container">
        <div class="overlay-center" v-if="displayItems.length == 0">
          <p>Нет предметов</p>
        </div>
        <InventoryItem :count="item.count" v-for="item in displayItems" :item="item" :key="item.id"
                       @click="() => equipItem(item)" :active="equipActive && isEquiped(item)"></InventoryItem>
      </div>
    </div>
  </div>
</template>

<script>
import InventorySlot from "@/components/parts/InventorySlot.vue";
import InventoryItem from "@/components/parts/InventoryItem.vue";
import TabBar from "@/components/parts/TabBar.vue";
import FishInventoryItem from "@/components/parts/FishInventoryItem.vue";
import BackerHeader from "@/components/parts/BackerHeader.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "InventoryPage",
  components: {InventorySlot, InventoryItem, TabBar, FishInventoryItem, BackerHeader},
  computed: {
    ...mapState({
      inventory: state => state.inventory
    }),

    displayItems() {
      if (this.equipActive) {
        return this.inventory.items.filter((x) => x.constructor.name.toLowerCase() === this.equipActive);
      }
      return this.inventory.items;
    },
  },

  data() {
    return {
      activePageIndex: 0,
      equipActive: null,
    };
  },

  methods: {
    ...mapActions('inventory', ['equipItem']),

    rangeChange(index) {
      this.activePageIndex = index;
    },

    equipChange(type) {
      this.equipActive = this.equipActive === type ? null : type;
    },

    isEquiped(item) {
      return [
        this.equipedRod,
        this.equipedReel,
        this.equipedLine,
        this.equipedBait
      ].includes(item);
    },
  }
}
</script>