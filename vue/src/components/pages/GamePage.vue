<template>
  <PageLayout>
    <div class="game-page">
      <InventoryPanel
          :items="inventoryItems"
          @select="() =>handleItemSelect()"
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

export default {
  components: {
    PageLayout,
    GameSceneView,
    InventoryPanel,
    HelpModal
  },
  computed: {
    ...mapGetters('game', [
      'currentScene',
      'inventoryItems',
      'dialog'
    ])
  },
  methods: {
    ...mapActions('game', [
      'moveToTarget',
      'interactWithSpot',
      'showDialog',
      'closeDialog',
      'selectItem'
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

