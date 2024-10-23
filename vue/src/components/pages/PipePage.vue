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
        :height="480 - pipe.height"
        :positionX="pipe.positionX"
      />
    </div>
  </div>
</template>

<script>
import PipeModel from "../PipeModel.vue";
import PipeEngine from "../../engine/pipeEngine";

export default {
  name: "PipePage",
  components: { PipeModel },
  data() {
    return {
      pipes: [],
      pipeEngine: null,
      visibilityChangeListener: null, // слушатель видимости
    };
  },
  mounted() {
    this.pipeEngine = new PipeEngine();

    this.pipeEngine.onUpdate((newPipes) => {
      this.pipes = newPipes;
      this.$emit("pipes-update", newPipes);
    });

    this.pipeEngine.startPipeGeneration();
    this.pipeEngine.startGameLoop();

    // Добавим слушатель переключения вкладок
    this.visibilityChangeListener = () => {
      if (document.hidden) {
        this.pipeEngine.stopGame();
      } else {
        this.pipeEngine.startPipeGeneration();
        this.pipeEngine.startGameLoop();
      }
    };
    document.addEventListener(
      "visibilitychange",
      this.visibilityChangeListener
    );
  },
  beforeDestroy() {
    this.pipeEngine?.stopGame();
    document.removeEventListener(
      "visibilitychange",
      this.visibilityChangeListener
    );
  },
};
</script>
