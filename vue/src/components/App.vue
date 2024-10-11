<template>
  <div>
    <BirdModel :birdPosition="birdHeight" />
  </div>
</template>

<script>
import BirdModel from "../components/BirdModel.vue";
import BirdEngine from "../engine/birdEngine";

export default {
  name: "App",
  components: { BirdModel },
  data() {
    return {
      birdHeight: 300,
      birdEngine: null,
    };
  },
  mounted() {
    this.birdEngine = new BirdEngine();

    // Подписываемся на обновления положения птички
    this.birdEngine.onUpdate((newHeight) => {
      this.birdHeight = newHeight;
    });

    document.addEventListener("keyup", this.handleKeyup);

    // Запускаем игровой цикл
    this.birdEngine.startGameLoop();
  },
  beforeDestroy() {
    this.birdEngine.stopGameLoop();
  },
  methods: {
    handleKeyup(event) {
      if (event.key === " ") {
        this.birdEngine.birdFly();
      }
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
