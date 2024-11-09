<template>
  <div id="app" :style="{ width: width + 'px', height: height + 'px' }">
    <LandModel />
    <PipeGroup />
    <BirdModel />
    <GamePanel />
    <AudioManager />
  </div>
</template>

<script>
import Config from "./config.js";
import LandModel from "./components/LandModel.vue";
import BirdModel from "./components/BirdModel.vue";
import GamePanel from "./components/GamePanel.vue";
import PipeGroup from "./components/PipeGroup.vue";
import AudioManager from "./components/AudioManager.vue";

export default {
  data() {
    return {
      width: Config.app.width,
      height: Config.app.height,
      pipes: [],
    };
  },
  components: {
    LandModel,
    PipeGroup,
    BirdModel,
    GamePanel,
    AudioManager,
  },
  methods: {},
};
</script>

<style>
@import "assets/css/normalize.css";

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

#app {
  display: block;
  border: 5px solid #000;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url("./assets/img/bg_day.png") 100% 100% no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
</style>
