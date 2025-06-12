<template>
  <div>
    <div ref="float" class="fishing-ui__float" v-if="isCast">
      <img ref="float-inner" src="../../assets/floats/float2.png" :style="animatedSinkLevel">
    </div>

    <div class="fishing-ui__rod" ref="rod" :class="{ 'fishing-ui__rod--cast': isCast }">
      <img src="../../assets/rod.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'FishingRod',
  data() {
    return {
      floatPositionX: 0,
      floatPositionY: 0,
      rodPositionX: 0,
      rodPositionY: 0,
      animationIntervalId: 0,
    }
  },

  props: {
    isCast: Boolean,
    sinkLevel: {
      type: Number,
      default: 0,
    },
    floatIntensity: {
      type: Number,
      default: 0,
    },
    floatWaveIntensity: {
      type: Number,
      default: 1
    },
    waterRect: {
      type: DOMRect,
      required: true
    }
  },

  computed: {
    floatPositionPercentX() {
      return (this.floatPositionX / this.waterRect.width) * 100;
    },

    floatPositionPercentY() {
      return (this.floatPositionY / this.waterRect.height) * 100;
    },

    animatedSinkLevel() {
      const randValue = Math.random() * 2 - 1;

      const sinkY = this.sinkLevel + randValue;
      return `transform: translateY(${sinkY}px)`;
    }
  },

  methods: {
    setFloatPosition(x, y) {
      const rod = this.$refs.rod;
      const float = this.$refs.float;

      rod.style.left = `${(x / this.waterRect.width) * 100}%`;

      this.floatPositionX = x;
      this.floatPositionY = this.waterRect.height - 100;

      const rect = rod.getBoundingClientRect();
      this.rodPositionX = rect.left;
      this.rodPositionY = rect.top;


      setTimeout(() => {
        this.floatPositionX = x;
        this.floatPositionY = y;
        float.style.opacity = 1;
        this.updateStyles(this.floatPositionPercentX, this.floatPositionPercentY);
      }, 300);
    },

    updateStyles(x, y) {
      const float = this.$refs.float;

      if (!float) {
        return;
      }

      float.style.left = `${x}%`;
      float.style.top = `${y.clamp(0, 40)}%`;

      const minScale = 0.6;
      const maxScale = 1;

      const scale = minScale + (y / 100) * (maxScale - minScale);
      float.style.width = `${32 * scale}px`;
    }
  },

  beforeUnmount() {
    clearInterval(this.animationIntervalId);
  },

  mounted() {
    // animation
    this.animationIntervalId = setInterval(() => {
      const float = this.$refs.float;
      const randValue = Math.random() * 2 - 1;

      if (float) {
        this.updateStyles(this.floatPositionPercentX,
          this.floatPositionPercentY + (Math.random() * this.floatIntensity) + (this.floatWaveIntensity * randValue));
      }
    }, 100);
  }
}
</script>

<style scoped lang="less">
@keyframes fishing-ui__cast {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.fishing-ui__rod {
  position: absolute;
  bottom: 0;
  left: 50%;
  transition: left 200ms;

  &--cast {
    animation: fishing-ui__cast 500ms ease-in-out;
  }

  img {
    image-rendering: pixelated;
    height: 200px;
  }
}

.fishing-ui__float {
  position: absolute;
  width: 32px;
  height: 32px;
  bottom: 80px;
  image-rendering: pixelated;
  transition: left 200ms, top 1s, opacity 1s;
  overflow-y: hidden;
  opacity: 0;
  z-index: 1;

  img {
    width: 100%;
  }
}
</style>
