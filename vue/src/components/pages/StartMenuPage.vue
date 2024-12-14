<template>
  <div class="menu">
    <StartScreen>
      <BackButton></BackButton>
      <div class="menu__buttons">
        <RouterLink :to="{ name: RouteNames.GAME, params: { level_number: currentLevel } }" class="menu__button-link">
          <CustomButton type="menu">Продолжить</CustomButton>
        </RouterLink>
        <RouterLink :to="{ name: RouteNames.LEVEL_MENU }" class="menu__button-link">
          <CustomButton type="menu">Выбрать уровень</CustomButton>
        </RouterLink>
        <RouterLink :to="{ name: RouteNames.EDITOR }" class="menu__button-link">
          <CustomButton type="menu">Открыть редактор</CustomButton>
        </RouterLink>
      </div>
    </StartScreen>
  </div>
</template>

<script>
// Импортируем компонент StartScreen
import StartScreen from "../parts/PageBackground.vue";
import CustomButton from "../parts/CustomButton.vue";
import gameStorage from "@/GameEngine/gameStorage";
import { RouteNames } from "@/router/routes";
import BackButton from "../parts/BackButton.vue";

export default {
  name: "StartMenuView",
  components: {
    StartScreen,
    CustomButton,
    BackButton,
  },
  data() {
    return {
      RouteNames
    }
  },
  computed: {
    currentLevel() {
      return Math.min(gameStorage.loadProgress() + 1, gameStorage.getNumberOfLevels(false));
    }
  }
};
</script>

<style lang="less">
@import "../../assets/styles/variables.less";

.menu {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__button-link {
    text-decoration: none;
    z-index: 1;
  }
}
</style>
