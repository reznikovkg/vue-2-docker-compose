<template>
  <PageLayout>
    <div class="game-page">
      <InventoryPanel
        :items="inventoryItems"
        @select="(item) =>handleItemSelect(item)"
        @toggle-craft="() =>toggleCraftPanel()"
      />
      <CraftPanel
        v-if="showCraftPanel"
        :selected-items="selectedCraftItems"
        :available-items="availableCraftItems"
        @add-to-craft="(itemId) =>addToCraft(itemId)"
        @remove-from-craft="(index) =>removeFromCraft(index)"
        @craft="() =>tryCraft()"
        @show-dictionary="() => showDictionary()"
        @close="() =>closeCraftPanel()"
      />
      <CraftDictionary
          v-if="showDictionaryPanel"
          :recipes="craftingRecipes"
          @close="() => closeDictionary()"
      />
      <GameSceneView
        :scene="currentScene"
        @click-spot="(spot) =>handleSpotClick(spot)"
      />
      <HelpModal
        v-if="dialog && dialog.show"
        :params="dialog.params"
        @close="(action) =>handleDialogClose(action)"
      />
    </div>
  </PageLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PageLayout from '@/components/parts/PageLayout.vue';
import GameSceneView from '@/components/parts/GameSceneView.vue';
import InventoryPanel from '@/components/parts/InventoryPanel.vue';
import HelpModal from '@/components/modals/HelpModal.vue';
import {RouteNames} from "@/router/routes";
import CraftPanel from "@/components/parts/CraftPanel.vue";
import CraftDictionary from "@/components/parts/CraftDictionary.vue";

export default {
  components: {
    CraftDictionary,
    CraftPanel,
    PageLayout,
    GameSceneView,
    InventoryPanel,
    HelpModal
  },
  data: () => ({
    showCraftPanel: false,
    showDictionaryPanel: false,
    selectedCraftItems: []
  }),
  computed: {
    ...mapGetters('game', [
      'currentScene',
      'inventoryItems',
      'dialog',
      'getItemId',
      'craftingRecipes'
    ]),
    availableCraftItems() {
      console.log("Available items:", this.inventoryItems);
      return this.inventoryItems.filter(item =>
          !this.selectedCraftItems.includes(item.id)
      );
    }
  },
  methods: {
    ...mapActions('game', [
      'moveToTarget',
      'interactWithSpot',
      'showDialog',
      'closeDialog',
      'selectItem',
      'craftItems'
    ]),

    handleSpotClick(spot) {
      this.moveToTarget({
        id: spot.id,
        x: parseInt(spot.x.replace('%', '')),
        y: parseInt(spot.y.replace('%', ''))
      });
    },

    handleItemSelect(item) {
      this.selectItem(item);
      this.showDialog({
        title: item.name,
        message: item.description
      });
    },

    handleDialogClose(action) {
      this.closeDialog();
      if (action === true) {
        this.$router.push({ name: RouteNames.HOME });
      }
    },

    toggleCraftPanel() {
      this.showCraftPanel = !this.showCraftPanel;
      if (!this.showCraftPanel) {
        this.selectedCraftItems = [];
      }
    },
    closeCraftPanel() {
      this.showCraftPanel = false;
      this.selectedCraftItems = [];
    },
    addToCraft(itemId) {
      console.log("Adding item to craft:", itemId);
      this.selectedCraftItems = [...this.selectedCraftItems, itemId];
    },
    removeFromCraft(index) {
      this.selectedCraftItems = this.selectedCraftItems.filter((_, i) => i !== index);
    },
    tryCraft() {
      console.log("Selected items for craft:", this.selectedCraftItems);
      this.craftItems(this.selectedCraftItems).then(success => {
        if (success) {
          this.closeCraftPanel();
        }
      });
    },

    showDictionary() {
      this.showDictionaryPanel = true;
    },

    closeDictionary() {
      this.showDictionaryPanel = false;
    }
  },
  mounted() {
    this.$store.dispatch('game/initGame');
  }
};
</script>

<style lang="less">
.game-page {
  position: relative;
  height: calc(100vh - 40px);
  overflow: hidden;
}
</style>

