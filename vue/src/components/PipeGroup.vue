<template>
  <ul class="pipe-group">
    <li v-for="(pipe, index) in pipes" :key="index">
      <pipe
        :position="pipe.position"
        :topPipeHeight="pipe.topPipeHeight"
      ></pipe>
    </li>
  </ul>
</template>

<style>
.pipe-group {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.pipe-group li {
  text-decoration: none;
}
</style>

<script>
import Config from "../config.js";
import Game from "../game.js";
import Pipe from "./PipeModel.vue";

export default {
  name: "PipeGroup",
  data() {
    return {
      pipes: [], // {position, topPipeHeight}
      isPassing: false,
    };
  },
  components: {
    Pipe,
  },
  methods: {
    newPipe(position, topHeight) {
      return {
        position: position,
        topPipeHeight:
          topHeight ||
          Config.pipe.topPipeHeightMin +
            Math.random() *
              (Config.pipe.topPipeHeightMax - Config.pipe.topPipeHeightMin),
      };
    },
    update() {
      if (Object.prototype.hasOwnProperty.call(this, Game.stateNow)) {
        this[Game.stateNow](); // call update function according to current state
      }
    },
    changeLimit(height) {
      if (this.isPassing) {
        Game.limits.maxHeight = Config.app.height - height - Config.bird.height;
        Game.limits.minHeight =
          Config.app.height - height - Config.pipe.spaceHeight;
      } else {
        Game.limits.maxHeight = Config.app.height - Config.bird.height;
        Game.limits.minHeight = Config.land.height;
      }
    },
    running() {
      let passPos = -1; // index of current passing pipe
      for (let i = 0; i < this.pipes.length; i++) {
        let pos = this.pipes[i].position;
        let topHeight = this.pipes[i].topPipeHeight;
        pos -= Config.pipe.speed;
        if (pos < -Config.pipe.width) {
          pos +=
            (Config.pipe.width + Config.pipe.distance) * Config.pipe.pipeCount;
          this.pipes.splice(i, 1, this.newPipe(pos));
        } else {
          this.pipes.splice(i, 1, this.newPipe(pos, topHeight));
        }
        if (
          this.pipes[i].position <= Config.bird.left + Config.bird.width &&
          Config.bird.left <= this.pipes[i].position + Config.pipe.width
        ) {
          passPos = i;
        }
      }
      if (passPos != -1) {
        if (!this.isPassing) {
          this.isPassing = true;
          this.changeLimit(this.pipes[passPos].topPipeHeight);
        }
      } else {
        if (this.isPassing) {
          Game.score.addScore();
        }
        this.isPassing = false;
        this.changeLimit();
      }
    },
    stateChange(state) {
      if (state == Game.stateList.reset) {
        this.reset();
      }
    },
    reset() {
      while (this.pipes.length) this.pipes.pop();
      for (let i = 0; i < Config.pipe.pipeCount; i++) {
        this.pipes.push(
          this.newPipe(
            Config.app.width + i * (Config.pipe.width + Config.pipe.distance)
          )
        );
      }
      this.isPassing = false;
    },
  },
  created() {
    this.reset();
    Game.events.addListener("timer", this.update);
    Game.events.addListener("stateChange", this.stateChange);
  },
  destroyed() {
    Game.events.removeListener("timer", this.update);
    Game.events.removeListener("stateChange", this.stateChange);
  },
};
</script>
