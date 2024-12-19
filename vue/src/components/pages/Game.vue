<template>
  <div class="game-page">
    <LevelBackground>
      <BackButton></BackButton>
      <h2 class="game-page__title">Level {{ levelNumber }}</h2>
      <GameGrid />
      <KeyboardController @key-action="handleKeyAction" />
      <GameResultModal
        v-if="showResultModal"
        :result="result"
        :levelNumber="levelNumber"
        @close-modal="hideGameResultModal"
        @restart-level="restartLevel"
      >
      </GameResultModal>
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
import BackButton from "../parts/BackButton.vue";
import GameResultModal from "../parts/GameResultModal.vue";

export default {
  name: "GamePage",
  components: {
    GameGrid,
    KeyboardController,
    LevelBackground,
    BackButton,
    GameResultModal,
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
      showResultModal: false,
      result: "",
    };
  },
  computed: {
    ...mapGetters("game", ["getGrid", "getHasWon", "getHasLost"]),
  },
  watch: {
    getHasWon(newVal) {
      if (newVal) {
        this.result = "won";
        this.showResultModal = true;
      }
    },
    getHasLost(newVal) {
      if (newVal) {
        this.result = "lost";
        this.showResultModal = true;
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

    async handleKeyAction(action) {
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
        await gameStorage.saveProgress(this.levelNumber);
        this.win();
      }
    },

    hideGameResultModal() {
      this.showResultModal = false;
    },

    restartLevel() {
      this.loadLevel({
        levelNumber: this.levelNumber,
        isCustom: this.isCustom,
      });
    },
  },
};
</script>

<style scoped lang="less">
.game-page {
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
