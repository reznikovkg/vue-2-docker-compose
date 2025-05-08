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
    value: {
      type: Object,
      required: true,
    },
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
      const deltaX = this.value.endX - this.value.startX;
      const deltaY = this.value.endY - this.value.startY;
      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        this.currentX = this.value.startX + deltaX * progress;
        this.currentY = this.value.startY + deltaY * progress;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          this.$emit("done", this.value.id);
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