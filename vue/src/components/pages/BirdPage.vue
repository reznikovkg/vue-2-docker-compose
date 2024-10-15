<template>
  <div>
    <BirdModel :birdPosition="birdHeight" />
  </div>
</template>

<script>
import BirdModel from "../BirdModel.vue";
import BirdEngine from "../../engine/birdEngine";

export default {
  name: "BirdPage",
  components: { BirdModel },
  data() {
    return {
      birdHeight: 300,
      birdEngine: null,
    };
  },
  mounted() {
    this.birdEngine = new BirdEngine();

    this.birdEngine.onUpdate((newHeight) => {
      this.birdHeight = newHeight;
    });

    document.addEventListener("keyup", this.handleKeyup);

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
