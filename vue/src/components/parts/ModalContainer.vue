<template>
  <div v-if="showModalContainer" class="modal-container">
    <component
        v-for="i in getModals"
        :key="i.hash"
        :is="i.component"
        :isVisible="i.isVisible"
        :params="i.params"
        @close="() => removeModal(i.hash)"
        @restart="() => handleRestart()"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import GameOverModal from '@/components/modals/GameOverModal.vue';
import VictoryModal from '@/components/modals/VictoryModal.vue';

export default {
  name: 'ModalContainer',
  components: {
    GameOverModal,
    VictoryModal,
  },
  computed: {
    ...mapGetters('modals', [
      'getModals',
    ]),
    showModalContainer() {
      return this.getModals.some((modal) => modal.isVisible);
    },
  },
  methods: {
    ...mapMutations('modals', [
      'removeModal',
    ]),
    handleRestart() {
      this.$store.dispatch('game/restartGame');
    },
  },
};
</script>

<style scoped lang="less">
.modal-container {
  width: 0;
  height: 0;
}
</style>
