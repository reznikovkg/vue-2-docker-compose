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
  data() {
    return {
      gravity: 20,
    };
  },
  mounted() {
    this.gravityEffect = setInterval(() => {
      this.$emit("update:birdPosition", this.birdPosition + this.gravity);
    }, 100);
  },
  beforeDestroy() {
    clearInterval(this.gravityEffect);
  },
  methods: {
    fly() {
      this.$emit("update:birdPosition", this.birdPosition - 150);
    },
  },
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
