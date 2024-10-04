<template>
  <div>
    <BirdModel
      :birdPosition="birdHeight"
      @update:birdPosition="updateBirdHeight"
    />
  </div>
</template>

<script>
import BirdModel from "../components/BirdModel.vue";

export default {
  name: "App",
  components: { BirdModel },
  data() {
    return {
      birdHeight: 300,
      pipes: [],
    };
  },
  mounted() {
    document.addEventListener("keyup", this.handleKeyup);
    this.startPipeGeneration();
    this.startGameLoop();
  },
  beforeDestroy() {
    clearInterval(this.pipeInterval);
    clearInterval(this.gameInterval);
  },
  methods: {
    handleKeyup(event) {
      if (event.key === " ") {
        this.birdHeight -= 150;
      }
    },
    startPipeGeneration() {
      this.pipeInterval = setInterval(() => {
        const direction = Math.random() < 0.5 ? "up" : "down";
        const height = this.getRandomInt(200, 600);
        this.pipes.push({ direction, height });
      }, 1500);
    },
    startGameLoop() {
      this.gameInterval = setInterval(() => {
        this.updateGame();
      }, 100);
    },
    updateGame() {
      if (this.birdHeight + 185 < window.outerHeight) {
        this.birdHeight += 20;
      }
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 6em;
  position: fixed;
  top: 45vh;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
