<template>
  <div
      class="game__tile"
      :class="[tileClass, {
      'game__tile--tornado': tornado && !isBlackhole,
      'game__tile__blackhole': isBlackhole,
      'game__tile--lightning': isLightningStrike,
      'game__tile--lightning-neighbor': isLightningNeighbor,
      'game__tile--with-crack': hasCrack
    }]"
      :style="tileStyle"
  >
    <div v-if="hasCrack" class="game__tile__crack"></div>

    <span v-if="isBlackhole"></span>
    <span v-else>{{ formattedValue }}</span>

    <div v-if="freezeEffect" class="game__tile__frost-effect">
      <div class="freeze-progress" :style="{ width: `${freezeEffect.progress}%` }"></div>
      <span class="freeze-counter" v-if="freezeEffect.expiresIn > 0">
        {{ freezeEffect.expiresIn }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'GameTile',
  props: {
    tile: { type: Number, required: true },
    formattedValue: { type: String, required: true },
    isFrozen: { type: Boolean, default: false },
    position: { type: Object, required: true },
    moveFrom: { type: Object, default: null },
    tornado: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters('game', [
      'getFreezeEffectByPosition',
      'getBlackholeEffectByPosition',
      'isTornadoAnimating',
      'tornadoTiles',
      'getGridSize',
      'getLightningStrike',
      'getCrackEffects'
    ]),
    hasCrack() {
      return this.getCrackEffects.some(c => c.x === this.position.x && c.y === this.position.y);
    },
    isLightningStrike() {
      const strike = this.getLightningStrike;
      return strike && strike.x === this.position.x && strike.y === this.position.y;
    },
    isLightningNeighbor() {
      const strike = this.getLightningStrike;
      if (!strike) {
        return false;
      }
      const dx = Math.abs(strike.x - this.position.x);
      const dy = Math.abs(strike.y - this.position.y);
      return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
    },

    blackholeEffect() {
      return this.getBlackholeEffectByPosition(this.position);
    },
    isBlackhole() {
      return !!this.blackholeEffect;
    },
    freezeEffect() {
      return this.getFreezeEffectByPosition(this.position);
    },
    tileClass() {
      const classes = [];
      if (this.tornado) {
        classes.push('tornado-effect');
      }
      if (this.isBlackhole) {
        classes.push('game__tile--blackhole');
      } else if (this.tile === 0) {
        classes.push('game__tile--0');
      } else {
        let baseValue = this.tile;
        while (baseValue > 2048) baseValue /= 1024;
        const powersOfTwo = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
        const closestPowerOfTwo = powersOfTwo.find(power => power >= baseValue) || 2048;
        classes.push(`game__tile--${closestPowerOfTwo}`);
      }
      if (this.isFrozen) {
        classes.push('game__tile--frozen');
      }
      if (this.moveFrom) {
        classes.push('game__tile--moving');
      }
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

  &.tornado-effect {
    animation: tornadoSpin 0.5s ease-out;
    z-index: 20;
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
      background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.3) 100%);
      border-radius: 5px;
    }
  }

  &__frost-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.4) 100%);
    border-radius: 5px;
    z-index: 1;
    animation: frostGlow 2s infinite alternate;
  }

  &__blackhole {
    background-color: #1a1a1a;
    color: white;
    font-size: 24px;
    animation: pulse 1s infinite alternate;

    span {
      animation: rotate 2s linear infinite;
    }
  }

  &.lightning-effect {
    animation: lightningStrike 0.5s ease-out;
    z-index: 30;

    &-neighbor {
      animation: lightningNeighbor 0.5s ease-out;
      z-index: 20;
    }
  }
  &--with-crack {
    position: relative;
    background-color: darken(#cec0b3, 10%);

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.1);
    }
  }

  &__crack {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
        linear-gradient(45deg, transparent 45%, rgba(0,0,0,0.7) 46%, transparent 47%),
        linear-gradient(-45deg, transparent 45%, rgba(0,0,0,0.7) 46%, transparent 47%);
    z-index: 2;
    pointer-events: none;
  }

}

@keyframes pulse {
  from {
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    transform: scale(1);
  }
  to {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
    transform: scale(1.05);
  }
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

@keyframes tornadoSpin {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: rotate(180deg) scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 1;
  }
}

@keyframes lightningStrike {
  0% { box-shadow: 0 0 10px #ff0; }
  50% { box-shadow: 0 0 30px #ff0, 0 0 60px #ff0; transform: scale(1.1); }
  100% { box-shadow: 0 0 10px #ff0; }
}

@keyframes lightningNeighbor {
  0% { box-shadow: 0 0 5px #ff0; }
  50% { box-shadow: 0 0 15px #ff0; transform: scale(1.05); }
  100% { box-shadow: 0 0 5px #ff0; }
}
</style>
