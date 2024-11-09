<template>
  <div :class="['bird', classList[wingState]]" :style="styles"></div>
</template>

<style>
.bird {
  position: absolute;
  transition: transform 0.5s;
}

.bird-0 {
  background: url("../assets/img/bird0_0.png") 50% 50% no-repeat;
  background-size: 135%;
}
.bird-1 {
  background: url("../assets/img/bird0_1.png") 50% 50% no-repeat;
  background-size: 135%;
}
.bird-2 {
  background: url("../assets/img/bird0_2.png") 50% 50% no-repeat;
  background-size: 135%;
}
</style>

<script>
import Config from "../config.js";
import Game from "../game.js";

export default {
  data() {
    return {
      velocityUpdateCounter: 0,
      velocityUpdateCountMax: 5,
      classList: ["bird-0", "bird-1", "bird-2"],
      heightNow: Config.bird.bottom,
      velocity: Config.bird.flyVector,
      rotateRate: 0.02,
      limitBottom: 0,
      limitTop: Config.app.height,
    };
  },
  computed: {
    wingState() {
      if (this.velocity > 0) return 2;
      if (this.velocity === 0) return 1;
      return 0;
    },
    gameState() {
      return Game.stateNow;
    },
    rotate: {
      cache: false,
      get() {
        switch (Game.stateNow) {
          case Game.stateList.running:
            return (
              (-Math.atan(this.velocity * this.rotateRate) / Math.PI) * 180
            );
          case Game.stateList.over:
            return this.heightNow > Config.land.height ? 90 : 0;
          default:
            return 0;
        }
      },
    },
    styles() {
      return {
        width: Config.bird.width + "px",
        height: Config.bird.height + "px",
        left: Config.bird.left + "px",
        bottom: this.heightNow + "px",
        transform: "rotate(" + this.rotate + "deg)",
      };
    },
  },
  methods: {
    reset() {
      this.velocityUpdateCounter = 0;
      this.velocityUpdateCountMax = 5;
      this.classList = ["bird-0", "bird-1", "bird-2"];
      this.heightNow = Config.bird.bottom;
      this.velocity = Config.bird.flyVector;
      this.rotateRate = 0.02;
      this.limitBottom = 0;
      this.limitTop = Config.app.height;
    },
    update() {
      if (Object.prototype.hasOwnProperty.call(this, Game.stateNow)) {
        this[Game.stateNow]();
      }
    },
    fly() {
      if (Game.stateNow === Game.stateList.running) {
        this.velocity = Config.bird.flyVector;
      }
    },
    stateChange(state) {
      if (state === Game.stateList.reset) {
        this.reset();
      }
    },
    running() {
      this.velocityUpdateCounter++;
      this.heightNow += this.velocity;
      if (this.velocityUpdateCounter === this.velocityUpdateCountMax) {
        this.velocityUpdateCounter = 0;
        this.velocity += Config.bird.gravity;
      }
      if (
        this.heightNow > Game.limits.maxHeight ||
        this.heightNow < Game.limits.minHeight
      ) {
        Game.timer.stop();
        setTimeout(() => Game.timer.start(), 500);
        Game.setState(Game.stateList.over);
      }
    },
    over() {
      if (this.heightNow > Config.land.height) {
        this.velocity = Config.bird.gravity;
        this.heightNow += this.velocity;
      } else if (this.heightNow < Config.land.height) {
        this.heightNow = Config.land.height;
      } else {
        Game.setState(Game.stateList.stop);
        setTimeout(() => Game.init(), 500);
      }
    },
  },
  created() {
    this.reset();
    Game.events.addListener("timer", this.update);
    Game.events.addListener("space", this.fly);
    Game.events.addListener("stateChange", this.stateChange);
  },
  destroyed() {
    Game.events.removeListener("timer", this.update);
    Game.events.removeListener("space", this.fly);
    Game.events.removeListener("stateChange", this.stateChange);
  },
};
</script>
