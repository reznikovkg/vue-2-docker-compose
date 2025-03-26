<template>
  <div v-if="visible" class="modal">
    <div class="modal__content">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button class="modal__button modal__button--over"
          v-if="gameOver"
          @click="$emit('replay')">
        Играть снова
      </button>
      <button class="modal__button modal__button--victory"
          v-if="enemyDefeated && currentLevel < levels.length-1"
          @click="$emit('next')">
        Следующий уровень
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'GameModal',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      "currentLevel",
      "levels",
      "gameOver",
      "enemyDefeated"
    ])
  }
}
</script>

<style lang="less" scoped>
  @import '@/less/modal.less';
</style>