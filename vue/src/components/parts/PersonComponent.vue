<template>
  <div class="person" :style="{ top: x * cellSize + 10 + 'px', left: y * cellSize + 10 + 'px' }">🤖</div>
</template>

<script>
export default {
  props: {
    x: Number,
    y: Number,
  },
  computed: {
    cellSize() {
      return 40; // размер ячейки, можно передавать через props
    },
  },
};
</script>

<style scoped>
.person {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: blue;
  transition: all 1s linear;
  z-index: 1000;
}
</style>
