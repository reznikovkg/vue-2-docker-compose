<template>
  <div class="showcase__perspective" :class="[{hovered}]">
    <div
        class="showcase-card"
        :style="style"
        @mouseenter="() => onMouseOver()"
        @mouseleave="() => onMouseLeave()"
        @mousemove="(e) => onMouseMove(e)"
        ref="showcaseCard"
    >
      <div class="showcase-card__content">
        <h3>{{ type }}</h3>
        <p>Score: {{ score }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowcaseCard',
  computed: {
    style() {
      const img = require(`@/assets/cards/${this.imageUri}`);

      if (this.hovered) {
        return {
          backgroundImage: `url(${img})`,
          transform: `scale(1.6, 1.6) rotate3d(1, 0, 0, ${this.cursorRelativePos.y * 45}deg) rotate3d(0, 1, 0, ${this.cursorRelativePos.x * 45}deg)`,
          boxShadow: `inset 100em 100em rgba(0, 0, 0, ${Math.max(-this.cursorRelativePos.y + 0.1, 0)})`,
          position: 'relative',
          zIndex: 1000,
        }
      }

      return {
        backgroundImage: `url(${img})`,
      }
    }
  },
  data() {
    return {
      hovered: false,
      cursorRelativePos: {
        x: null,
        y: null,
      }
    }
  },
  methods: {
    onMouseOver() {
      this.hovered = true;
    },
    onMouseLeave() {
      this.hovered = false;
    },
    onMouseMove(e) {
      const rect = this.$refs.showcaseCard.getBoundingClientRect();
      const { width, height } = rect;
      const { clientX, clientY } = e;
      const y = 0.5 - (clientY - rect.top) / height;
      const x = (clientX - rect.left) / width - 0.5;
      this.cursorRelativePos = { x, y };
    },
  },
  props: {
    score: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    imageUri: {
      type: String,
      required: true,
    },
  }
}
</script>

<style scoped lang="less">
.showcase {
  &-card {
    user-select: none;
    border: 1px solid black;
    text-align: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100px;
    height: 150px;
    transition: all 0.2s ease-out;
    perspective: 200px;

    &__content {
      text-align: center;
      color: white;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
  }

  &__perspective {
    perspective: 500px;
  }
}

.hovered {
  position: relative;
  z-index: 10000;
}
</style>
