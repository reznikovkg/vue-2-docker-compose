<template>
  <div id="app">
    <RouterView />
    <ModalContainer />
  </div>
</template>

<script>
import ModalContainer from '@/components/parts/ModalContainer.vue';

export default {
  components: { ModalContainer }
};
</script>

<style lang="less">
@import '@/less/const.less';

#app {
  font-family: 'Jost', sans-serif;
  background-color: @cBaseTwo;
  min-height: 100vh;
}
</style>
