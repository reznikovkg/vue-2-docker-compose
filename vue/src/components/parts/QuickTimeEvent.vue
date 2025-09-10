<template>
  <div>
    <div class="qte" :class="animationClass" @click="() => performQte()">
      <svg class="qte__circle" :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
        <circle
          :r="radius"
          :cx="size / 2"
          :cy="size / 2"
          stroke="#eee"
          :stroke-width="stroke"
          fill="none"
        />
        <circle
          :r="radius"
          :cx="size / 2"
          :cy="size / 2"
          :stroke="color"
          :stroke-width="stroke"
          fill="none"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          transform="rotate(-90, 50, 50)"
        />
        <circle
          :r="radius"
          :cx="size / 2"
          :cy="size / 2"
          stroke="#00ff0055"
          :stroke-width="stroke"
          fill="none"
          :stroke-dasharray="perfectDashArray"
          :stroke-dashoffset="perfectDashOffset"
          transform="rotate(-90, 50, 50)"
        />
      </svg>
      <h1 class="qte__label">tap</h1>
    </div>
  </div>
</template>


<script>
export default {
  name: "QuickTimeEvent",
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    perfectRangeLow: {type: Number, default: 90},
    perfectRangeHigh: {type: Number, default: 100},
    size: {type: Number, default: 100},
    stroke: {type: Number, default: 20},
    color: {type: String, default: '#ff0000'}
  },
  data() {
    return {
      animation: "pulse"
    }
  },
  watch: {
    percent(_oldValue, newValue) {
      if (newValue >= 90) {
        this.animation = "shake";
      }

      if (newValue >= 100) {
        this.$emit("failed");
      }
    }
  },
  methods: {
    performQte() {
      if (this.percent < 100) {
        this.$emit("completed");
        this.animation = "ok";
      } else if (this.percent >= this.perfectRangeLow && this.percent <= this.perfectRangeHigh) {
        this.$emit("perfect");
        this.animation = "ok";
      } else {
        this.$emit("failed");
        this.animation = "shake";
      }
    }
  },
  emits: ["perfect", "completed", "failed"],
  computed: {
    radius() {
      return (this.size - this.stroke) / 2;
    },

    circumference() {
      return 2 * Math.PI * this.radius;
    },

    dashOffset() {
      return this.circumference * (1 - this.percent / 100)
    },

    perfectDashArray() {
      const range = this.perfectRangeHigh - this.perfectRangeLow;
      const visible = this.circumference * (range / 100);
      const hidden = this.circumference - visible;
      return `${visible} ${hidden}`;
    },

    perfectDashOffset() {
      const offsetPercent = (-this.perfectRangeLow + 100) % 100;
      return this.circumference * (offsetPercent / 100);
    },

    animationClass() {
      return `qte--${this.animation}`;
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes ok {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  33% {
    transform: translateX(5px);
  }
  66% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0px);
  }
}

.qte {
  position: relative;
  width: 100px;
  display: flex;
  place-items: center;
  height: 100px;
  z-index: 10;

  &--pulse {
      animation: pulse 200ms ease;
  }

  &--shake {
    animation: shake 50ms ease-in-out infinite;
  }

  &--ok {
    animation: ok 200ms ease;
  }
}

.qte__label {
  text-align: center;
  width: 100%;
}

.qte__circle {
  position: absolute;
  z-index: 0;
}
</style>