<template>
  <div class="score-display__wrapper">
    <span>Score: {{ score }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ScoreDisplay',
  computed: {
    ...mapGetters('board', ['getScore']),
    score() {
      return this.getScore;
    }
  }
};
</script>

<style lang="less" scoped>
.score-display__wrapper {
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
}
</style>
