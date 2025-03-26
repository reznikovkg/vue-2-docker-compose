<template>
  <div class="tower">
    <div class="tower__unit">
      <button v-if="!gameOver && !enemyDefeated" class="tower__delete" @click.stop="() => deleteTower(index)">❌</button>
      <div class="tower__dot"
           :class="'tower__dot--grade-' + towerGrade">
        {{ towerGrade }}
      </div>

    </div>
    <div class="tower__health">
      {{ towerHealth }} HP
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
    ...mapGetters(["gameOver", "enemyDefeated"]),
  },
  methods: {
    ...mapActions(["deleteTower"])
  },
}
</script>

<style lang="less" scoped>
  @import '../less/tower.less';
</style>