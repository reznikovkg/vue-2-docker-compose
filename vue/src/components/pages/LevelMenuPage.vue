<template>
  <div class="level-menu">
    <StartScreen>
      <BackButton></BackButton>
      <div class="level-menu__toggle" @click="() => toggleLevels()">
        <CustomButton type="menu">
          {{ showCustomLevels ? 'Показать основные уровни' : 'Показать свои уровни' }}
        </CustomButton>
      </div>
      <div class="level-menu__buttons">
        <RouterLink
          v-for="(button, index) in buttons"
          :key="index"
          :to="button.path"
          class="level-menu__button-link"
        >
          <CustomButton type="level" :disabled="button.disabled">
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
import gameStorage from '@/GameEngine/gameStorage';
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
      showCustomLevels: false,
      levelProgress: 0
    };
  },
  computed: {
    levelsCount() {
      return gameStorage.getNumberOfLevels(false);
    },
    customLevelsCount() {
      return gameStorage.getNumberOfLevels(true);
    },
    buttons() {
      return Array.from({ length: this.showCustomLevels? this.customLevelsCount : this.levelsCount }, (_, index) => ({
        text: `${index + 1}`,
        path: `/${this.showCustomLevels? 'custom-' : ''}level-${index + 1}`,
        type: "level",
        disabled: this.levelProgress < index
      }));
    },
  },
  async mounted() {
    this.levelProgress = await gameStorage.loadProgress();
  },
  methods: {
    toggleLevels() {
      this.showCustomLevels = !this.showCustomLevels;
    },
  },
};
</script>

<style lang="less">
@import "../../assets/styles/variables.less";

.level-menu {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__toggle {
    display: flex;
    text-decoration: none;
    flex-direction: row;
    justify-content: center;
    z-index: 1;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 40px;
    margin: 40px;
  }

  &__button-link {
    text-decoration: none;
    z-index: 1;
  }
}

@media (max-width: 480px) {
  .level-menu {

    &__buttons {
      gap: 24px;
      margin: 24px;
    }
  }
}
</style>
