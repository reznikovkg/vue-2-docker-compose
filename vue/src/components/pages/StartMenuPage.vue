<template>
  <div class="menu">
    <StartScreen>
      <div class="menu__buttons">
        <RouterLink to="/" class="menu__button-link">
          <CustomButton type="menu">Продолжить</CustomButton>
        </RouterLink>
        <RouterLink to="/levels" class="menu__button-link">
          <CustomButton type="menu">Выбрать уровень</CustomButton>
        </RouterLink>
        <RouterLink to="/" class="menu__button-link">
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

export default {
  name: "StartMenuView",
  components: {
    StartScreen,
    CustomButton,
  },
};
</script>

<style lang="less">
@import "../../assets/styles/variables.less";

.menu {
  background-color: var(--main-background-color);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

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
