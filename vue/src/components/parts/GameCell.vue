<template>
  <div
    class="cell"
    :class="[cell.activeClass]"
    @click="() => onCellClick()"
    @mouseleave="() => handleLeave()"
    @mouseover="() => handleHover()"
  >
    <div @click="() => onBuildingClick()">
      <component
        :style="{ position: 'absolute', pointerEvents: selectedItem == null ? 'auto' : 'none' }"
        :is="cell.children"
        :counter="cell.counter"
      />
    </div>

    <component :style="{ opacity: '0.5', pointerEvents: 'none', position: 'absolute' }" :is="cell.temp" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    cell: Object,
  },
  computed: {
    ...mapState("selection", ["selectedItem"]),
  },
  methods: {
    onCellClick() {
      this.$emit("click", { x: this.cell.x, y: this.cell.y });
    },
    handleHover() {
      this.$emit("hover", { x: this.cell.x, y: this.cell.y });
    },
    handleLeave() {
      this.$emit("leave", { x: this.cell.x, y: this.cell.y });
    },

    onBuildingClick() {
      if (this.selectedItem == null) {
        this.$emit("delete", { x: this.cell.x, y: this.cell.y });
      }
    },
  },
};
</script>

<style scoped lang="less">
.cell {
  position: relative;

  width: 40px;
  height: 40px;

  &.active_blue {
    background-color: rgba(0, 128, 255, 0.5);
  }
  &.active_red {
    background-color: rgba(172, 52, 52, 0.5);
  }
  &.active_green {
    background-color: rgba(66, 172, 52, 0.5);
  }
}
</style>
