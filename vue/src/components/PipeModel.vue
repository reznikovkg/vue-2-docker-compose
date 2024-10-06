<template>
  <div class="pipe" :style="pipeStyles"></div>
</template>

<script>
export default {
  name: "PipeModel",
  props: ["direction", "height"],
  data() {
    return {
      positionX: 100,
    };
  },
  mounted() {
    this.startMoving();
  },
  beforeDestroy() {
    clearInterval(this.movementInterval);
  },
  methods: {
    startMoving() {
      this.movementInterval = setInterval(() => {
        this.positionX -= 3;
      }, 300);
    },
  },
  computed: {
    pipeStyles() {
      const topOrBottom = this.direction === "up" ? "top: 0;" : "bottom: 0;";
      return `height: ${this.height}px; left: ${this.positionX}%; ${topOrBottom}`;
    },
  },
};
</script>

<style scoped>
.pipe {
  min-height: 10px;
  width: 120px;
  position: fixed;
  border: 5px solid rgba(0, 255, 53, 1);
  background: linear-gradient(
    90deg,
    rgba(0, 255, 53, 1) 0%,
    rgba(0, 134, 27, 1) 18%,
    rgba(0, 113, 23, 1) 75%,
    rgba(0, 255, 53, 1) 100%
  );
  transition: left 300ms;
}
</style>
