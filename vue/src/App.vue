<template>
  <div id="app">
    <FifteenPuzzle />
  </div>
</template>

<script>
import FifteenPuzzle from "./components/FifteenPuzzle.vue";

export default {
  name: "App",
  components: {
    FifteenPuzzle,
  },
};
</script>

<style lang="less" scoped>
@import "@/assets/styles/main.less";
</style>
