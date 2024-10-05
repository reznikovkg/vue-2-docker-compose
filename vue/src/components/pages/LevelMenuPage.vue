<template>
    <div class="level-menu">
      <StartScreen>
        <div class="level-menu__buttons">
          <router-link
            v-for="(button, index) in buttons"
            :key="index"
            :to="button.path"
            class="level-menu__button-link"
          >
            <CustomButton type="level">
              {{ button.text }}
            </CustomButton>
          </router-link>
        </div>
      </StartScreen>
    </div>
  </template>
  
  <script>
  import StartScreen from "../parts/PageBackground.vue";
  import CustomButton from "../parts/CustomButton.vue";

  export default {
    name: "StartMenuView",
    components: {
      StartScreen,
      CustomButton,
    },
    data() {
      const levelsCount = 5;
      const buttons = Array.from({ length: levelsCount }, (_, index) => ({
        text: `${index + 1}`,
        path: `/level-${index + 1}`,
        type: "level",
      }));
      return {
        buttons,
      };
    },
  };
  </script>
  
  <style lang="less">
  @import "../../assets/styles/variables.less";
  
  .level-menu {
    background-color: var(--main-background-color);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  
    &__buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 40px;
      margin: 40px;
    }
  
    &__button-link {
      text-decoration: none;
      z-index: 1;
    }
  }
  </style>
  