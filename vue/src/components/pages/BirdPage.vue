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
    // fall() {
    //   this.birdHeight = window.innerHeight;
    // },
    // checkCollision(pipes) {
    //   const birdTop = this.birdHeight;
    //   const birdBottom = birdTop + 100; // Высота птички 100px
    //   const birdLeft = 250;
    //   const birdRight = birdLeft + 100;

    //   pipes.forEach((pipe) => {
    //     const pipeLeft = (pipe.positionX * window.innerWidth) / 100;
    //     const pipeRight = pipeLeft + 120; // Ширина трубы
    //     const pipeTop =
    //       pipe.direction === "up" ? 0 : window.innerHeight - pipe.height;
    //     const pipeBottom = pipeTop + pipe.height;

    //     const collision =
    //       birdRight > pipeLeft &&
    //       birdLeft < pipeRight &&
    //       (birdBottom > pipeBottom || birdTop < pipeTop);

    //     if (collision) {
    //       this.$emit("collision");
    //     }
    //   });
    // },
  },
};
</script>
