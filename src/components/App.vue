<template>
  <div>
    <MemoryRouterView />
    <ModalContainer />
    <NoticeContainer />
  </div>
</template>

<script>
import ModalContainer from "@/components/parts/ModalContainer";
import NoticeContainer from "@/components/parts/NoticeContainer.vue";
import MemoryRouterView from "@/components/MemoryRouterView.vue";

export default {
  components: {
    MemoryRouterView,
    NoticeContainer,
    ModalContainer
  },

  async mounted() {
    this.$store.commit('locations/POPULATE');
    await this.$store.dispatch('inventory/setStartingGear');
    //await this.$store.dispatch('inventory/debugAddFishes');
  }
}
</script>
