<template>
  <div v-if="showModalContainer" class="modal-container">
    <component
        v-for="i in getModals"
        :key="i.hash"
        :is="i.component"
        :params="i.params"
        :isVisible="true"
        @close="() => removeModal(i.hash)"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters('modals', ['getModals']),
    showModalContainer() {
      return Object.keys(this.getModals).length > 0;
    },
  },
  methods: {
    ...mapMutations('modals', ['removeModal']),
  },
};
</script>

<style scoped lang="less">
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
</style>