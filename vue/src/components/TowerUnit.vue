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

<style>
@import '@/less/styles.less';
.tower {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.tower__dot {
  width: 25px;
  height: 25px;
  border-radius: 25%;
  text-align: center;
  color: white;
  font-weight: bold;
  line-height: 30px;
  cursor: pointer;
  -webkit-text-stroke: 1px black;
}
.tower__dot--grade-1 {
  background-color: hotpink;
}
.tower__dot--grade-2 {
  background-color: aqua;
}
.tower__dot--grade-3 {
  background-color: cornflowerblue;
}
.tower__dot--grade-4 {
  background-color: darkred;
}
.tower__dot--grade-5 {
  background-color: purple;
}
.tower__dot--grade-6 {
  background-color: mediumblue;
}

.tower__health {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 8px;
  padding: 2px 2px;
  border-radius: 5px;
}

.tower__unit {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tower__delete {
  position: absolute;
  left: -5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 10px;
  padding: 1px;
  border-radius: 5px;
  border: none;

  :hover {
    background-color: darkred;
    cursor: pointer;
  }
}
</style>