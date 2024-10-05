<template>
  <div class="home">
    <StartScreen>
      <div class="home__buttons">
        <RouterLink to="/menu" class="home__button-link">
          <CustomButton type="menu">Начать игру</CustomButton>
        </RouterLink>
      </div>
    </StartScreen>
  </div>
</template>

<script>
import StartScreen from "../parts/PageBackground.vue";
import CustomButton from "../parts/CustomButton.vue";

export default {
  name: "HomeView",
  components: {
    StartScreen,
    CustomButton,
  },
};
</script>

<style lang="less">
@import "../../assets/styles/variables.less";

.home {
  background-color: var(--main-background-color);
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
