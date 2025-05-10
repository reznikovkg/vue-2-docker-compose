<template>
  <PageLayout>
    <div class="game-page">
      <InventoryPanel
        :items="inventory"
        :selected-item="selectedItem"
        @select="handleItemSelect"
      />
      <GameSceneView
        :scene="currentScene"
        :selected-item="selectedItem"
        @click-item="handleItemClick"
        @click-spot="interact"
      />
      <HelpModal
        v-if="dialog.show"
        :params="dialog.params"
        @close="handleDialogClose"
      />
    </div>
  </PageLayout>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import PageLayout from '@/components/parts/PageLayout.vue';
import GameSceneView from '@/components/parts/GameSceneView.vue';
import InventoryPanel from '@/components/parts/InventoryPanel.vue';
import HelpModal from '@/components/modals/HelpModal.vue';

export default {
  components: {
    PageLayout,
    GameSceneView,
    InventoryPanel,
    HelpModal
  },
  computed: {
    ...mapGetters('game', ['currentScene', 'inventory', 'selectedItem']),
    ...mapState('game', ['dialog'])
  },
  methods: {
    ...mapActions('game', ['selectItem', 'takeItem', 'interactWithSpot', 'restartGame', 'showDialog', 'closeDialog', 'handleGameComplete']),

    handleItemSelect(item) {
      this.selectItem(item);
      this.showDialog({
        title: item.name,
        message: item.description || 'Описание отсутствует'
      });
    },

    async handleItemClick(item) {
      const itemTaken = await this.takeItem(item);
      this.showDialog({
        message: itemTaken ? `Вы подобрали: ${item.name}` : item.description
      });
    },

    async interact(spot) {
      const result = await this.interactWithSpot(spot);
      console.log('Interaction result:', result);
      if (result?.gameCompleted) {
        console.log('Game completed! Flags:', this.$store.state.game.gameFlags);
        await this.handleGameComplete(result.message);
      } else {
        this.showDialog({ message: result });
      }
    },

    handleDialogClose(action) {
      this.closeDialog();
      if (action === 'restart') {
        this.restartGame();
      }
    }
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
