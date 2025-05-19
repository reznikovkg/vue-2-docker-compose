<template>
  <div class="game-controller">
    <div class="info">
      <div class="score">Score: {{ score }}</div>
      <div class="combo" v-if="comboCount > 0">Combo x{{ comboCount }}</div>
      <div class="misses">Misses: {{ misses }}/{{ maxMisses }}</div>
    </div>

    <div class="status" :class="{ hidden: !statusMessage }">
      {{ statusMessage || ' ' }}
    </div>

    <div class="grid">
      <GridCell
          v-for="index in 9"
          :key="index"
          :index="index"
          :hasMole="activeCell === index"
          :wasHit="hitIndex === index"
          :wasMissed="missedIndex === index"
          @cell-click="(index) => handleCellClick(index)"
      />
    </div>

    <button v-if="gameOver" class="button" @click="restartGame">
      Restart Game
    </button>

    <button v-if="!gameStarted" class="button" @click="startGame">
      Start Game
    </button>
  </div>
</template>

<script>
import GridCell from './GridCell.vue';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'GameController',
  components: { GridCell },
  computed: {
    ...mapState([
      'score',
      'comboCount',
      'misses',
      'maxMisses',
      'statusMessage',
      'activeCell',
      'gameStarted',
      'gameOver',
      'hitIndex',
      'missedIndex'
    ]),
    ...mapGetters(['isGameActive']),
  },
  methods: {
    ...mapActions(['handleCellClick', 'startGame', 'restartGame']),
  },
  beforeDestroy() {
    // Очистка таймеров теперь в store, но если надо — можно вызвать action очистки
    this.$store.dispatch('clearTimeouts');
  },
};
</script>

<style lang="less" scoped>
@import '@/less/const.less';

.game-controller {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info {
  margin-bottom: 10px;
  display: flex;
  gap: 20px;
  font-size: @font-size-info;
  justify-content: center;
}

.status {
  font-size: @font-size-status;
  text-align: center;
  margin-bottom: 10px;
  padding: @padding-status;
  width: 320px;
  height: 2rem;
  background-color: @color-status-bg;
  border-radius: @border-radius-status;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, @size-cell);
  gap: 10px;
  justify-content: center;
}

/* Общие базовые стили для кнопок */
.button-base {
  margin-top: 20px;
  padding: @button-padding;
  width: 320px;
  border: none;
  border-radius: @border-radius-button;
  cursor: pointer;
  font-size: @font-size-button;
  color: @color-button-text;
  transition: @transition-base;
}

/* Наследуем базовые стили и добавляем цвета */
.button {
  .button-base;
  background-color: @color-button-bg;

  &:hover {
    background-color: @color-button-bg-hover;
  }
}
</style>