<template>
  <div
      class="projectile"
      :style="{
      left: `${currentX}px`,
      top: `${currentY}px`,
    }"
  ></div>
</template>

<script>
export default {
  props: {
    id: Number,
    startX: Number,
    startY: Number,
    endX: Number,
    endY: Number,
  },
  data() {
    return {
      currentX: this.startX,
      currentY: this.startY,
    };
  },
  mounted() {
    this.animate();
  },
  methods: {
    animate() {
      const duration = 200;
      const startTime = performance.now();
      const deltaX = this.endX - this.startX;
      const deltaY = this.endY - this.startY;
      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        this.currentX = this.startX + deltaX * progress;
        this.currentY = this.startY + deltaY * progress;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          this.$emit("done", this.id);
        }
      };
      requestAnimationFrame(step);
    },
  },
};
</script>

<style scoped>
.projectile {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #000000;
  border-radius: 50%;
  pointer-events: none;
}
</style>