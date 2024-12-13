<template>
  <div class="game-page">
    <LevelBackground>
      <h2 class="game-page__title">Level {{ levelNumber }}</h2>
      <GameGrid />
      <p v-if="message" class="game-page__message">{{ message }}</p>
      <KeyboardController @key-action="handleKeyAction" />
    </LevelBackground>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GameGrid from "../parts/GameGrid.vue";
import KeyboardController from "../parts/KeyboardController.vue";
import mapValidator from "@/GameEngine/GridValidationFunctions";
import { RouteNames } from "@/router/routes";
import gameLogic from "@/GameEngine/GameLogic";
import gameStorage from "@/GameEngine/gameStorage";
import { KeyboardEvents } from "@/GameEngine/GameEvents";
import LevelBackground from "../parts/LevelBackground.vue";

export default {
  name: "GamePage",
  components: {
    GameGrid,
    KeyboardController,
    LevelBackground,
  },
  props: {
    levelNumber: {
      type: Number,
      required: true,
    },
    isCustom: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      message: null,
    };
  },
  computed: {
    ...mapGetters("game", ["getGrid", "getHasWon", "getHasLost"]),
  },
  watch: {
    getHasWon(newVal) {
      if (newVal) {
        this.message = "Ура! Вы победили! Запуск следующего уровня...";
        setTimeout(() => {
          this.message = null;
          const nextLevel = this.levelNumber + 1;
          const maxLevels = gameStorage.getNumberOfLevels(this.isCustom);

          if (nextLevel <= maxLevels) {
            this.$router.push({
              name: this.isCustom ? RouteNames.CUSTOM_GAME : RouteNames.GAME,
              params: { level_number: nextLevel },
            });
          } else {
            this.$router.push({ name: RouteNames.LEVEL_MENU });
          }
        }, 5000);
      }
    },
    getHasLost(newVal) {
      if (newVal) {
        this.message = " Вы проиграли, перезапуск уровня...";
        setTimeout(() => {
          this.message = null;
          this.loadLevel({
            levelNumber: this.levelNumber,
            isCustom: this.isCustom,
          });
        }, 5000);
      }
    },
    "$route.params.level_number"(newLevel) {
      this.loadLevel({
        levelNumber: Number(newLevel),
        isCustom: this.isCustom,
      });
    },
  },
  mounted() {
    this.loadLevel({ levelNumber: this.levelNumber, isCustom: this.isCustom });
  },
  methods: {
    ...mapActions("game", [
      "loadLevel",
      "moveFlower",
      "expandFlower",
      "win",
      "lose",
    ]),

    handleKeyAction(action) {
      if (this.getHasWon || this.getHasLost) {
        return;
      }
      switch (action) {
        case KeyboardEvents.MOVE_UP:
          this.moveFlower([-1, 0]);
          break;

        case KeyboardEvents.MOVE_DOWN:
          this.moveFlower([1, 0]);
          break;

        case KeyboardEvents.MOVE_LEFT:
          this.moveFlower([0, -1]);
          break;

        case KeyboardEvents.MOVE_RIGHT:
          this.moveFlower([0, 1]);
          break;

        case KeyboardEvents.ACTION_SPACE:
          this.expandFlower();
          break;

        case KeyboardEvents.RESTART_LEVEL:
          this.loadLevel({
            levelNumber: this.levelNumber,
            isCustom: this.isCustom,
          });
          break;

        case KeyboardEvents.RETURN_TO_MENU:
          this.$router.push({ name: RouteNames.LEVEL_MENU });
          break;

        default:
          break;
      }
      const result = mapValidator.validateFlower(this.getGrid);
      if (result !== "Всё ок") {
        this.lose();
      } else if (gameLogic.hasWon(this.getGrid)) {
        gameStorage.saveProgress(this.levelNumber);
        this.win();
      }
    },
  },
};
</script>

<style scoped lang="less">
.game-page {
  &__message {
    font-size: 1.5em;
    color: red;
    text-align: center;
  }

  &__title {
    color: var(--level-title-color);
    font-size: 40px;
    font-family: "Adigiana Ultra", sans-serif;
    margin: 0;
    padding-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .game-page {
    &__title {
      padding-bottom: 20px;
    }
  }
}
</style>
