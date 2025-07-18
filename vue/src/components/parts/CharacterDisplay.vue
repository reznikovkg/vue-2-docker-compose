<template>
  <div class="character__container">
    <img 
    class="character__hat-display" 
    v-if="currentHatName" 
    :src="currentHatIconSrc">
    <img :src="require('@/assets/img/character.png')" class="character__display">
    <div class="character__action-text__container">
      <h2 class="character__action-text">{{ displayedActiontext }}</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { hats, actions } from '@/store/const';
import { capitalizeFirstLetter } from '@/tools/text';

export default {
  name: 'CharacterDisplay',
  computed: {
    ...mapGetters('game', [
      'currentAction',
      'currentHatName'
    ]),
    currentHatIconSrc () {
      return hats[this.currentHatName].iconPath
    },
    displayedActiontext () {
      if (this.currentAction) {
        let verbString = actions[this.currentAction].verb;
        return capitalizeFirstLetter(verbString);
      }
      else {
        return 'Doing nothing';
      }
    }
  }
}
</script>

<style scoped lang="less">
.character {
  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__action-text__container {
    margin-top: 20px;
  }

  &__hat-display {
    position: absolute;
    top: -100px;
    right: -70px;
  }
}
</style>