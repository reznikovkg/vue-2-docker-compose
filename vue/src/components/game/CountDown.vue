<template>
  <div class="count-down">
    <svg class="count-down__progress-ring" width="120" height="120">
      <circle :class="['count-down__progress-ring__circle', circumferenceColor]" :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset" stroke="currentColor" stroke-width="4" fill="transparent" :r="radius"
        cx="60" cy="60" />
    </svg>
    <div class="count-down__timer">{{ currentValue }}</div>
  </div>
</template>

<script>
export default {
  name: 'GameCountDown',
  props: {
    initialValue: {
      type: Number,
      required: true,
    },
  },
  emits: [
    "elapsed",
  ],
  data() {
    const radius = 52;

    return {
      intervalId: null,
      currentValue: this.initialValue,
      radius: radius,
      circumference: 2 * Math.PI * radius,
    };
  },
  computed: {
    strokeDashoffset() {
      const progress = this.currentValue / this.initialValue;
      return this.circumference * (1 - progress);
    },
    circumferenceColor() {
      const progress = this.currentValue / this.initialValue;

      if (progress > 0.67) {
        return "count-down__progress-ring__circle--high";
      } else if (progress > 0.33) {
        return "count-down__progress-ring__circle--medium";
      } else {
        return "count-down__progress-ring__circle--low";
      }
    }
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const stepMilliseconds = 1000;

      this.intervalId = setInterval(() => {
        if (this.currentValue > 0) {
          this.currentValue--;
        } else {
          this.$emit('elapsed');
          clearInterval(this.intervalId);
        }
      }, stepMilliseconds);
    },
  },
};
</script>

<style scoped lang="less">
.count-down {
  position: relative;
  display: flex;

  width: 120px;
  height: 120px;

  justify-content: center;
  align-items: center;

  &__progress-ring {
    position: absolute;
    transform: rotate(-90deg);

    &__circle {
      &--high {
        color: #47be46;
      }

      &--medium {
        color: #bdbe46;
      }

      &--low {
        color: #be4646;
      }

      transition: stroke-dashoffset 0.5s linear;
    }
  }

  &__timer {
    position: absolute;

    font-size: 32px;
    font-weight: bold;

    color: #333;
  }
}
</style>
