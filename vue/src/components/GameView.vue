<template>
  <div class="guitar-hero">
    <div class="guitar-hero__container">
      <div class="guitar-hero__status">
        <div class="guitar-hero__stat">
          <span class="guitar-hero__stat-label">Score:</span>
          <span class="guitar-hero__stat-value">{{ score }}</span>
        </div>
        <div class="guitar-hero__stat">
          <span class="guitar-hero__stat-label">Lives:</span>
          <span class="guitar-hero__stat-value">{{ lives }}</span>
        </div>
        <div class="guitar-hero__stat">
          <span class="guitar-hero__stat-label">Speed:</span>
          <span class="guitar-hero__stat-value">{{ Math.round(noteSpeed * 10) / 10 }}x</span>
        </div>
      </div>

      <div class="guitar-hero__speed-indicator">
        <div class="guitar-hero__speed-bar">
          <div 
            class="guitar-hero__speed-fill" 
            :style="{ width: speedPercentage + '%' }"
          ></div>
        </div>
      </div>

      <div class="guitar-hero__track">
        <div
            v-for="(lane, index) in lanes"
            :key="index"
            class="guitar-hero__lane"
            :class="{
            'guitar-hero__lane--active': activeLanes[index]
          }"
            @click="() => hitNote(index)"
        >
          <div
              class="guitar-hero__hit-zone"
              :class="{
              'guitar-hero__hit-zone--active': activeLanes[index]
            }"
          ></div>

          <div
              v-for="note in lane.notes"
              :key="note.id"
              class="guitar-hero__note"
              :class="{
              'guitar-hero__note--hit': note.hit,
              'guitar-hero__note--miss': note.miss
            }"
              :style="{ top: note.position + '%' }"
          ></div>
        </div>
      </div>

      <div class="guitar-hero__controls">
        <div
            v-for="(key, index) in keys"
            :key="index"
            class="guitar-hero__key"
            :class="{
            'guitar-hero__key--active': activeLanes[index]
          }"
            @mousedown="() => pressKey(index)"
            @mouseup="() => releaseKey(index)"
            @touchstart="() => pressKey(index)"
            @touchend="() => releaseKey(index)"
        >
          <span class="guitar-hero__key-text">{{ key }}</span>
        </div>
      </div>

      <div class="guitar-hero__actions">
        <button
            class="guitar-hero__button"
            :class="{'guitar-hero__button--disabled': !canStartGame}"
            @click="() => startGame()"
        >
          Start
        </button>
        <button
            class="guitar-hero__button guitar-hero__button--reset"
            @click="() => resetGame()"
        >
          Reset
        </button>
      </div>

      <div v-if="gameOver" class="guitar-hero__game-over">
        <h2>Game Over</h2>
        <p>Your Score: {{ score }}</p>
        <button class="guitar-hero__button guitar-hero__button--restart"
                @click="() => resetGame()"
        >
          Play Again
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'GameView',
  computed: {
    ...mapGetters([
      'lanes',
      'keys',
      'activeLanes',
      'gameOver',
      'score',
      'lives',
      'noteSpeed',
      'speedPercentage',
      'canStartGame'
    ])
  },
  methods: {
    ...mapActions([
      'startGame',
      'pauseGame',
      'resetGame',
      'pressKey',
      'releaseKey',
      'hitNote',
      'handleKeyDown',
      'handleKeyUp'
    ])
  },
  
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  },
  
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}
</script>

<style lang="less">
@import '../less/const.less';
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.guitar-hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: @gray;
  font-family: Arial, sans-serif;
  padding: 10px;

  &__container {
    width: 100%;
    max-width: 400px;
    background: @white;
    border: 2px solid @gray;
    border-radius: 5px;
    padding: 15px;
    position: relative;
  }

  &__status {
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
    padding: 0 10px;
  }

  &__stat {
    text-align: center;

    &-label {
      display: block;
      font-size: 14px;
      color: @darkGray;
      margin-bottom: 3px;
    }

    &-value {
      display: block;
      font-size: 18px;
      font-weight: bold;
      color: @black;
    }
  }

  &__speed-indicator {
    margin-bottom: 15px;
    padding: 0 10px;

    &-bar {
      height: 8px;
      background: @gray;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 5px;
    }

    &-fill {
      height: 100%;
      background: @red;
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    &-labels {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: @darkGray;
    }
  }

  &__track {
    display: flex;
    height: @trackHeight;
    background: @gray;
    border: @sizeBorderDefault;
    border-radius: 3px;
    margin-bottom: 15px;
  }

  &__lane {
    flex: 1;
    border-right: @sizeBorderDefault;
    position: relative;
    background: @white;

    &:last-child {
      border-right: none;
    }

    &--active {
      background: @gray;
    }
  }

  &__hit-zone {
    position: absolute;
    top: @hitZonePosition;
    left: 50%;
    transform: translate(-50%, -50%);
    width: @hitZoneSize;
    height: @hitZoneSize;
    border-radius: 50%;
    border: 2px solid @darkGray;
    z-index: 1;

    &--active {
      border-color: @black;
      background: @gray;
    }
  }

  &__note {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: @noteSize;
    height: @noteSize;
    top: 0;
    background: @darkGray;
    border-radius: 50%;
    border: @sizeBorderDefault;
    z-index: 2;

    &--hit {
      opacity: 0;
    }

    &--miss {
      background: @red;
      border-color: @red;
      opacity: 0.5;
    }
  }

  &__controls {
    display: flex;
    gap: 8px;
    margin-bottom: 15px;
  }

  &__key {
    flex: 1;
    height: @keyHeight;
    background: @darkGray;
    border: 2px solid @gray;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;

    &--active {
      background: @gray;
      border-color: @darkGray;
    }

    &-text {
      font-size: 18px;
      font-weight: bold;
      color: @black;
    }
  }

  &__actions {
    display: flex;
    gap: 8px;
  }

  &__button {
    flex: 1;
    padding: 10px;
    border: 2px solid @darkGray;
    border-radius: 3px;
    background: @white;
    font-weight: bold;
    cursor: pointer;
    color: @black;

    &--reset {
      border-color: @darkGray;
    }

    &--restart {
      border-color: @green;
      color: @green;
      margin-top: 10px;
    }

    &--disabled {
      background: @gray;
      color: @darkGray;
      border-color: @darkGray;
      cursor: not-allowed;
    }

    &:hover:not(&--disabled) {
      background: @gray;
    }
  }

  &__game-over {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: @white;
    padding: 30px;
    border: 2px solid @red;
    border-radius: 5px;
    text-align: center;
    color: @black;
    z-index: 10;
    width: 90%;
    max-width: 300px;

    h2 {
      color: @red;
      margin-bottom: 15px;
      font-size: 24px;
    }

    p {
      margin: 10px 0;
      font-size: 20px;
      font-weight: bold;
    }
  }
}

</style>
