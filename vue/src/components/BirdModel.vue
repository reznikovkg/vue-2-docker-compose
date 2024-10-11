<template>
  <img
    src="@/assets/bird.png"
    alt="bird"
    :style="'top:' + birdPosition + 'px'"
  />
</template>

<script>
export default {
  name: "BirdModel",
  props: ["birdPosition"],
};
</script>

<style scoped>
img {
  height: 100px;
  position: absolute;
  left: 250px;
  top: 0;
  transition: top 300ms;
}
</style>
