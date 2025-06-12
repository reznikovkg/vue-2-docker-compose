<template>
  <div class="game">
    <div class="game__playfield game__playfield--scenery" :style="sceneryStyle" />
    <div class="game__playfield game__playfield--water" @click="event => castRodEvent(event)" :style="waterStyle">
      <FishingRod
        v-if="inventory.equipedRod?.equiped"
        :is-catched="game.state === 'fighting' || game.state === 'hooked'"
        :water-rect="waterRect"
        :float-intensity="floatIntensity"
        :sink-level="sinkLevel"
        :is-cast="game.state !== 'idle'"
        ref="rod"
      />

      <QuickTimeEvent
        v-if="fightQtePercent > 0"
        class="game__qte"
        :style="qteStyle"
        :percent="fightQtePercent"
        @completed="() => fightQTESuccess()"
        @perfect="() => fightQTESuccess(true)"
        @failed="() => fightQTEFailed()"
      />
    </div>
  </div>
</template>

<script>
import FishingRod from "./FishingRod.vue";
import QuickTimeEvent from "./QuickTimeEvent.vue";
import {mapState} from "vuex";
import {getRandomInt} from "@/utils";

export default {
  name: "GameViewport",
  components: {QuickTimeEvent, FishingRod},
  data() {
    return {
      qtePosX: getRandomInt(30, 60),
      qtePosY: getRandomInt(30, 50),
      waterRect: new DOMRect(0, 0, 0, 0)
    }
  },
  computed: {
    ...mapState({
      game: state => state.game,
      inventory: state => state.inventory,
      locations: state => state.locations
    }),

    fightQtePercent() {
      if (!this.game.currentQte) return 0;
      return Math.min(
        100,
        (this.game.qteElapsed / this.game.currentQte.timeLimit) * 100
      );
    },

    floatIntensity() {
      switch (this.game.state) {
        case "hooked":
          return 1.0;
        case "fighting":
          return 2.0;
        default:
          return 0.0;
      }
    },

    sinkLevel() {
      return (this.game.getAwayLevel / 100) * 28;
    },

    qteStyle() {
      return `left: ${this.qtePosX}%; top: ${this.qtePosY}%`;
    },

    sceneryStyle() {
      return `background-image: url("/backgrounds/${this.locations.activeLocation}/scenery.png")`;
    },

    waterStyle() {
      return `background-image: url("/backgrounds/${this.locations.activeLocation}/water.png")`;
    },
  },

  methods: {
    nextQtePos() {
      this.qtePosX = getRandomInt(30, 60);
      this.qtePosY = getRandomInt(10, 50);
    },

    async castRodEvent(event) {
      if (!this.inventory.equipedRod || !this.inventory.equipedRod.equiped) {
        console.warn("Rod is not equipped!");
        return;
      }

      if (this.game.state === "idle") {
        this.waterRect = event.target.getBoundingClientRect();
        const x = event.clientX - this.waterRect.left;
        const y = event.clientY - this.waterRect.top;

        await this.$store.dispatch("game/castRod");
        this.$nextTick(() => {
          this.$refs.rod.setFloatPosition(x, y);
        });
      }

      if (this.game.state === "hooked") {
        await this.$store.dispatch("game/startFight");
      }
    },

    async fightQTESuccess(perfect = false) {
      await this.$store.dispatch("game/completeQTE", perfect);
      this.nextQtePos();
    },

    fightQTEFailed() {
      this.nextQtePos();
    }
  },
}
</script>

<style lang="less" scoped>
.game {
  width: 100%;
  height: 100%;

  &__qte {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  &__playfield {
    position: relative;
    width: 100%;
    image-rendering: pixelated;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    &--scenery {
      background-position: 50% 100%;
    }

    &--scenery {
      height: @sizeScenery;
    }

    &--water {
      height: @sizeWater;
    }
  }
}
</style>
