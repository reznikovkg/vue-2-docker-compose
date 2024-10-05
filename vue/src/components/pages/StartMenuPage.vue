<template>
    <div class="menu">
      <StartScreen>
        <div class="menu__buttons">
          <router-link
            v-for="(button, index) in buttons"
            :key="index"
            :to="button.path"
            class="menu__button-link"
          >
            <CustomButton type="menu">
              {{ button.text }}
            </CustomButton>
          </router-link>
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
    data() {
      return {
        buttons: [
          { text: "Продолжить", path: "/", type: "menu" },
          { text: "Выбрать уровень", path: "/levels", type: "menu" },
          { text: "Открыть редактор", path: "/", type: "menu" },
        ],
      };
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
  