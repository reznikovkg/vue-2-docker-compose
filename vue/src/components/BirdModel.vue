<template>
  <img src="@/assets/bird.png" alt="bird" :style="birdStyles" />
</template>

<script>
export default {
  name: "BirdModel",
  props: ["birdPosition"],
  computed: {
    birdStyles() {
      return {
        top: `${this.birdPosition}px`,
        left: "250px",
        height: "100px",
        position: "absolute",
        transition: "top 300ms",
      };
    },
  },
};
</script>

<style scoped></style>
