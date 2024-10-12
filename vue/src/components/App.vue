<template>
  <div>
    <div v-for="(pipe, index) in pipes" :key="index">
      <PipeModel
        :direction="pipe.direction"
        :height="pipe.height"
        :positionX="pipe.positionX"
      />
      <PipeModel
        :direction="pipe.direction === 'up' ? 'down' : 'up'"
        :height="640 - pipe.height"
        :positionX="pipe.positionX"
      />
    </div>
  </div>
</template>

<script>
import PipeModel from "../components/PipeModel.vue";
import PipeEngine from "../engine/pipeEngine";

export default {
  name: "App",
  components: { PipeModel },
  data() {
    return {
      pipes: [],
      pipeEngine: null,
    };
  },
  mounted() {
    this.pipeEngine = new PipeEngine();

    this.pipeEngine.onUpdate((newPipes) => {
      this.pipes = newPipes;
    });

    this.pipeEngine.startPipeGeneration();
    this.pipeEngine.startGameLoop();
  },
  beforeDestroy() {
    this.pipeEngine?.stopGame();
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
