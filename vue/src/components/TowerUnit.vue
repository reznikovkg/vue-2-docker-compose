<template>
  <div class="tower">
    <div class="tower__health">
      {{ tower.health }} HP
    </div>
    <div class="tower__unit">
      <button v-if="!gameOver && !enemyDefeated"
              class="tower__delete"
              @click.stop="() => deleteTower(index)">
        ❌
      </button>
      <div class="tower__dot"
           :class="'tower__dot--grade-' + tower.grade">
        {{ tower.grade }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: 'TowerUnit',
  props: {
    tower: {
      type: Object,
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
.tower {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &__dot {
    width: 25px;
    height: 25px;
    border-radius: 25%;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
    line-height: 30px;
    cursor: pointer;
    -webkit-text-stroke: 1px #000000;
    &--grade {
      &-1 { background-color: @pink-color; }
      &-2 { background-color: @cyan-color; }
      &-3 { background-color: @lightblue-color; }
      &-4 { background-color: @darkred-color; }
      &-5 { background-color: @purple-color; }
      &-6 { background-color: @darkblue-color; }
    }
  }
  &__health {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 8px;
    padding: 2px;
    border-radius: 5px;
  }
  &__unit {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__delete {
    position: absolute;
    left: -5px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    font-size: 10px;
    padding: 1px;
    border-radius: 5px;
    border: none;
    &:hover {
      background-color: #8b0000;
      cursor: pointer;
    }
  }
}
</style>