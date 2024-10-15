<template>
  <div class="pipe" :style="pipeStyles"></div>
</template>

<script>
export default {
  name: "PipeModel",
  props: {
    direction: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    positionX: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pipeStyles() {
      return {
        height: `${this.height}px`,
        left: `${this.positionX}%`,
        [this.direction === "up" ? "top" : "bottom"]: "0",
      };
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
  transition: left 0.3s linear; /* Плавное движение труб */
}
</style>
