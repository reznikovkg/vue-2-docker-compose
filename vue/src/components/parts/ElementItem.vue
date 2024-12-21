<template>
  <div>
    <div class="element" :style="colorStyle" />
    <p>{{ name }}</p>
  </div>
</template>

<script>
import { elementColors, emptyColor } from "../../store/colors";

export default {
  name: "ElementItem",
  props: {
    name: String,
  },
  computed: {
    colorStyle() {
      return { "background-color": elementColors[this.name] || emptyColor };
    },
  },
};
</script>

<style scoped lang="less">
.element {
  width: 60px;
  height: 60px;
  cursor: pointer;
}
</style>
