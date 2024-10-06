<template>
  <div class="level-menu">
    <StartScreen>
      <div class="level-menu__buttons">
        <RouterLink
            v-for="(button, index) in buttons"
            :key="index"
            :to="button.path"
            class="level-menu__button-link"
          >
            <CustomButton type="level">
              {{ button.text }}
            </CustomButton>
        </RouterLink>
      </div>
    </StartScreen>
  </div>
</template>

<script>
import StartScreen from "../parts/PageBackground.vue";
import CustomButton from "../parts/CustomButton.vue";
import levels from "../../assets/levels.json";

export default {
  name: "StartMenuView",
  components: {
    StartScreen,
    CustomButton,
  },
  data() {
    return {
      levelsCount: Object.keys(levels.levels).filter(key => key !== "editor").length,
    };
  },
  computed: {
    buttons() {
      return Array.from({ length: this.levelsCount }, (_, index) => ({
        text: `${index + 1}`,
        path: `/level-${index + 1}`,
        type: "level",
      }));
    },
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
