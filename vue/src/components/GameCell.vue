<template>
  <div
      class="cell"
      :class="cellClasses"
      @click="() => handleClick()"
      @mouseenter="$emit('cellHover', index)"
      @mouseleave="$emit('cellHoverLeave')"
  >
    <TowerUnit
        v-if="isTower"
        :tower="tower"
        :index="index"
    />
  </div>
</template>

<script>
import TowerUnit from "@/components/TowerUnit.vue"
export default {
  name: "GameCell",
  components: { TowerUnit },
  props: {
    index: Number,
    isRoad: Boolean,
    isFirstRoadCell: Boolean,
    isLastRoadCell: Boolean,
    isTower: Boolean,
    canPlaceTower: Boolean,
    tower: Object,
    isInRange: Boolean
  },
  computed: {
    cellClasses() {
      return {
        "cell--road": this.isRoad,
        "cell--road-first": this.isRoad && this.isFirstRoadCell,
        "cell--road-last": this.isRoad && this.isLastRoadCell,
        "cell--tower": this.isTower,
        "cell--can-place-tower": this.canPlaceTower,
        "cell--in-range": this.isInRange
      };
    }
  },
  methods: {
    handleClick() {
      this.$emit("cellClick", this.index);
    }
  },
};
</script>

<style lang="less">
.cell.cell--in-range {
  background-image: repeating-linear-gradient(
      45deg,
      rgb(200, 1, 1),
      transparent 2px,
      transparent 6px
  );
}
.cell.cell--in-range::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
.cell {
  width: 40px;
  height: 40px;
  background-color: #028502;
  border: 1px solid #023902;
  position: relative;
  &--road {
    background-color: #b66f2a;
    &-first {
      background-color: #f2aaff;
    }
    &-last {
      background-color: #ff5722;
    }
  }
  &--can-place-tower {
    background-color: #86b526;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
  }
  &--tower {
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
