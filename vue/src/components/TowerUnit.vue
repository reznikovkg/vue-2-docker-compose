<template>
  <div class="tower">
    <div class="tower__health">
      {{ towerHealth }} HP
    </div>
    <div class="tower__unit">
      <button v-if="!gameOver && !enemyDefeated" class="tower__delete" @click.stop="() => deleteTower(index)">❌</button>
      <div class="tower__dot"
           :class="'tower__dot--grade-' + towerGrade">
        {{ towerGrade }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: 'EnemyUnit',
  props: {
    towerGrade: {
      type: Number,
      required: true
    },
    towerHealth: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
  },
  computed: {
    ...mapGetters([
      "gameOver",
      "enemyDefeated"
    ]),
  },
  methods: {
    ...mapActions(["deleteTower"])
  },
}
</script>

<style lang="less">
@import '@/less/const.less';
.flex-center-column() {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}
.box-style(@bg-color, @text-color, @font-size: 10px) {
  background-color: @bg-color;
  color: @text-color;
  font-size: @font-size;
  padding: 2px 2px;
  border-radius: 5px;
}
.circle(@size, @radius: 50%) {
  width: @size;
  height: @size;
  border-radius: @radius;
}
.tower {
  position: relative;
  width: 100%;
  height: 100%;
  .flex-center-column();
  &__dot {
    .circle(25px, 25%);
    text-align: center;
    color: white;
    font-weight: bold;
    line-height: 30px;
    cursor: pointer;
    -webkit-text-stroke: 1px black;
    &--grade-1 {
      background-color: hotpink;
    }
    &--grade-2 {
      background-color: aqua;
    }
    &--grade-3 {
      background-color: cornflowerblue;
    }
    &--grade-4 {
      background-color: darkred;
    }
    &--grade-5 {
      background-color: purple;
    }
    &--grade-6 {
      background-color: mediumblue;
    }
  }
  &__health {
    .box-style(rgba(0, 0, 0, 0.7), white, 8px);
  }
  &__unit {
    .flex-center();
  }
  &__delete {
    position: absolute;
    left: -5px;
    .box-style(rgba(0, 0, 0, 0.7), white, 10px);
    border: none;
    padding: 1px;
    &:hover {
      background-color: darkred;
      cursor: pointer;
    }
  }
}
</style>