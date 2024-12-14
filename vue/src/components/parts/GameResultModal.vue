<template>
  <div class="game-result-modal">
    <div class="game-result-modal__content">
      <div class="game-result-modal__content__text">{{ resultMessage }}</div>
      <div class="game-result-modal__content__buttons">
        <CustomButton 
          @click="goToMenu" 
          type="modal"
        > 
          В меню 
        </CustomButton>
        <CustomButton 
          @click="goToLevel" 
          type="modal"
        >
          {{ buttonName }}
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "./CustomButton.vue";
import { RouteNames } from "@/router/routes";
import gameStorage from "@/GameEngine/gameStorage";

export default {
  name: "GameResultModal",
  components: {
    CustomButton,
  },
  props: {
    result: {
      type: String,
      required: true,
    },
    levelNumber: {
      type: Number,
      required: true,
    },
  },
  computed: {
    resultMessage() {
      if (this.result === "won") {
        return `Вы победили! Уровень ${this.levelNumber} пройден!`;
      } else {
        return `Вы проиграли... Уровень ${this.levelNumber} провален!`;
      }
    },
    buttonName() {
      if (this.result === "won") {
        return "Дальше";
      } else {
        return "Переиграть";
      }
    },
  },
  methods: {
    goToLevel() {
      this.$emit("close-modal");
      if (this.result === "won") {
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
      } else {
        this.$emit("restart-level");
      }
    },
    goToMenu() {
      this.$router.push({ name: RouteNames.LEVEL_MENU });
    },
  },
};
</script>

<style scoped lang="less">
@import "../../assets/styles/variables.less";

.game-result-modal {
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  &__content {
    background-color: var(--flower-cell-color);
    border-radius: 30px;
    width: 400px;
    height: 400px;
    border: 4px solid var(--button-background-color);

    &__text {
      padding-top: 60px;
      font-family: "Adigiana Ultra", sans-serif;
      color: var(--button-background-color);
      text-align: center;
      font-size: 50px;
    }

    &__buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 40px;
      padding-top: 70px;
    }
  }
}
</style>
