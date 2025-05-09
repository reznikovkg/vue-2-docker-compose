<template>
  <PageLayout>
    <div class="game-page">
      <InventoryPanel
        :items="inventory"
        :selected-item="selectItem"
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
        @close="dialog.show = false"
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

export default {
  components: {
    PageLayout,
    GameSceneView,
    InventoryPanel,
    HelpModal
  },
  data() {
    return {
      dialog: {
        show: false,
        params: {
          title: 'Информация',
          message: '',
          buttons: [{ text: 'OK', afterClick: 'emitClose' }]
        }
      }
    };
  },
  computed: {
    ...mapGetters('game', ['currentScene', 'inventory', 'selectedItem'])
  },
  methods: {
    ...mapActions('game', ['selectItem', 'takeItem', 'interactWithSpot']),

    handleItemSelect(item) {
      this.selectItem(item);
      this.showItemDescription(item);
    },

    async handleItemClick(item) {
      const itemTaken = await this.takeItem(item);
      this.showDialog(itemTaken ? `Вы подобрали: ${item.name}` : item.description);
    },

    async interact(spot) {
      const message = await this.interactWithSpot(spot);
      this.showDialog(message);
    },

    showItemDescription(item) {
      this.dialog.params.title = item.name;
      this.dialog.params.message = item.description || 'Описание отсутствует';
      this.dialog.show = true;
    },

    showDialog(message) {
      this.dialog.params.title = 'Информация';
      this.dialog.params.message = message;
      this.dialog.show = true;
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