<template>
  <div
      class="game__tile"
      :class="[tileClass, { 'tornado-effect': tornado }]"
      :style="tileStyle"
  >
    {{ formattedValue }}
    <div v-if="freezeEffect" class="game__tile__frost-effect">
      <div class="freeze-progress" :style="{ width: `${freezeEffect.progress}%` }"></div>
      <span class="freeze-counter" v-if="freezeEffect.expiresIn > 0">
        {{ freezeEffect.expiresIn }}
      </span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'GameTile',
  props: {
    tile: {
      type: Number,
      required: true
    },
    formattedValue: {
      type: String,
      required: true
    },
    isFrozen: {
      type: Boolean,
      default: false
    },
    position: {
      type: Object,
      required: true
    },
    moveFrom: {
      type: Object,
      default: null
    },
    tornado: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('game', [
        'getFreezeEffectByPosition',
        'getGridSize',
        ]),
    freezeEffect() {
      return this.getFreezeEffectByPosition({ x: this.position.x, y: this.position.y });
    },
    tileClass() {
      if (this.tile === 0) {
        return 'game__tile--0';
      }
      let baseValue = this.tile;
      while (baseValue > 2048) baseValue /= 1024;
      const powersOfTwo = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
      const closestPowerOfTwo = powersOfTwo.find(power => power >= baseValue) || 2048;

      const classes = [
        `game__tile--${closestPowerOfTwo}`,
        {
          'game__tile--frozen': this.isFrozen,
          'game__tile--moving': this.moveFrom
        }
      ];
      return classes;
    },
    tileStyle() {
      const gridSize = this.getGridSize;
      const cellSize = 100 / gridSize;

      return {
        position: 'absolute',
        left: `${this.position.x * cellSize}%`,
        top: `${this.position.y * cellSize}%`,
        width: `${cellSize - 2}%`,
        height: `${cellSize - 2}%`,
        fontSize: `${Math.max(14, cellSize * 0.7)}px`,
        transition: this.moveFrom ? 'transform 0.15s ease-out' : 'none',
        zIndex: this.moveFrom ? 10 : 'auto'
      };
    }
  }
};
</script>

<style lang="less" scoped>
.game__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  aspect-ratio: 1;
  font-weight: bold;
  text-align: center;
  box-sizing: border-box;
  will-change: transform;
  position: relative;
  overflow: hidden;

  &--moving {
    transition: transform 0.1s ease-out;
  }

  @media (max-width: 400px) {
    font-size: clamp(10px, 3vw, 18px);
  }

  &--0 {
    background-color: #cec0b3;
  }

  &--2 {
    background-color: #eee4da;
  }

  &--4 {
    background-color: #ece0ca;
  }

  &--8 {
    background-color: #f3b07a;
  }

  &--16 {
    background-color: #f59462;
  }

  &--32 {
    background-color: #f57b5f;
  }

  &--64 {
    background-color: #f55d3b;
  }

  &--128 {
    background-color: #eccd71;
  }

  &--256 {
    background-color: #eccb61;
  }

  &--512 {
    background-color: #edc53f;
  }

  &--1024 {
    background-color: #edc52f;
  }

  &--2048 {
    background-color: #edc12e;
  }

  &--default {
    background-color: #3c3a32;
  }

  &--frozen {
    position: relative;
    box-shadow: inset 0 0 15px rgba(52, 152, 219, 0.7);

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0) 50%,
          rgba(255, 255, 255, 0.3) 100%
      );
      border-radius: 5px;
    }
  }

  &__frost-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0) 50%,
        rgba(255, 255, 255, 0.4) 100%
    );
    border-radius: 5px;
    z-index: 1;
    animation: frostGlow 2s infinite alternate;
  }
  &.tornado-effect {
    animation: spinShuffle 0.5s ease-in-out infinite alternate;
    transform-origin: center;
    z-index: 2;
  }
}

@keyframes spinShuffle {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  50% { transform: translate(2px, -2px) rotate(5deg); opacity: 0.8; }
  100% { transform: translate(-2px, 2px) rotate(-5deg); opacity: 1; }
}

@keyframes frostGlow {
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.9;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
