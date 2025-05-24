<template>
  <div v-if="showModalContainer" class="modal-container">
    <component
        v-for="modal in modalsList"
        :key="modal.hash"
        :is="modal.component"
        :params="modal.params"
        @close="() => removeModal(modal.hash)"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ModalContainer',
  computed: {
    ...mapGetters('modals', [
      'getModals'
    ]),
    modalsList() {
      return Object.values(this.getModals);
    },
    showModalContainer() {
      return this.modalsList.length > 0;
    }
  },
  methods: {
    ...mapMutations('modals', [
      'removeModal'
    ])
  }
}
</script>

<style scoped lang="less">
.modal-container {
  width: 0;
  height: 0;
}
</style>
