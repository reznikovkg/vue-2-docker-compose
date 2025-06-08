<template>
  <PageLayout>
    <div class="game-page">
      <InventoryPanel
        :items="inventoryItems"
        @select="() =>handleItemSelect()"
        @toggle-craft="() =>toggleCraftPanel()"
      />
      <CraftPanel
        v-if="showCraftPanel"
        :selected-items="selectedCraftItems"
        :available-items="availableCraftItems"
        @add-to-craft="addToCraft"
        @remove-from-craft="() =>removeFromCraft()"
        @craft="() =>tryCraft()"
        @close="() =>closeCraftPanel()"
      />
      <GameSceneView
        :scene="currentScene"
        @click-spot="() =>handleSpotClick()"
      />
      <HelpModal
        v-if="dialog && dialog.show"
        :params="dialog.params"
        @close="() =>handleDialogClose()"
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

export default {
  components: {
    CraftPanel,
    PageLayout,
    GameSceneView,
    InventoryPanel,
    HelpModal
  },
  data: () => ({
    showCraftPanel: false,
    selectedCraftItems: []
  }),
  computed: {
    ...mapGetters('game', [
      'currentScene',
      'inventoryItems',
      'dialog',
      'getItemId'
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

