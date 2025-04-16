<template>
  <div
      class="cell"
      :class="cellClasses"
      @click="() => handleClick()"
  >
    <EnemyUnit
        v-if="isEnemy"
        :enemyHealth="enemyHealth"
    />
    <TowerUnit
        v-if="isTower"
        :tower="tower"
        :index="index"
    />
  </div>
</template>

<script>
import EnemyUnit from "@/components/EnemyUnit.vue"
import TowerUnit from "@/components/TowerUnit.vue"
export default {
  name: "GameCell",
  components: { EnemyUnit, TowerUnit },
  props: {
    index: Number,
    isRoad: Boolean,
    isFirstRoadCell: Boolean,
    isLastRoadCell: Boolean,
    isEnemy: Boolean,
    isTower: Boolean,
    canPlaceTower: Boolean,
    enemyHealth: Number,
    tower: Object
  },
  computed: {
    cellClasses() {
      return {
        "cell--road": this.isRoad,
        "cell--road-first": this.isRoad && this.isFirstRoadCell,
        "cell--road-last": this.isRoad && this.isLastRoadCell,
        "cell--enemy": this.isEnemy,
        "cell--tower": this.isTower,
        "cell--can-place-tower": this.canPlaceTower
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
