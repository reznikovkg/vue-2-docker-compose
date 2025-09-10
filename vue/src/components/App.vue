<template>
  <div>
    <RouterView />
    <ModalContainer />
    <NoticeContainer />
  </div>
</template>

<script>
import ModalContainer from "@/components/parts/ModalContainer";
import NoticeContainer from "@/components/parts/NoticeContainer.vue";

export default {
  components: {
    NoticeContainer,
    ModalContainer
  },

  async mounted() {
    this.$store.commit('locations/populate');
    await this.$store.dispatch('inventory/setStartingGear');
    //await this.$store.dispatch('inventory/debugAddFishes');
  }
}
</script>

<style lang="less">
  @import '@/less/style.less';
</style>