<template>
  <PageLayout>
    <div class="game-page">
      <InventoryPanel
        :items="inventoryItems"
        @select="(item) =>handleItemSelect(item)"
      />
      <CraftPanel
        v-if="showCraftPanel"
        :selected-items="selectedCraftItems"
        :available-items="availableCraftItems"
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
  computed: {
    ...mapGetters('game', [
      'currentScene',
      'inventoryItems',
      'dialog',
      'getItemId',
      'craftingRecipes',
      'showCraftPanel',
      'showDictionaryPanel',
      'selectedCraftItems'
    ]),
    availableCraftItems() {
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
      'craftItems',
      'toggleCraftPanel',
      'closeCraftPanel',
      'addToCraft',
      'removeFromCraft',
      'showDictionary',
      'closeDictionary'
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

    tryCraft() {
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

