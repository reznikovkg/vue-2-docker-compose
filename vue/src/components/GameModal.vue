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

<style scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
.modal__button {
  cursor: pointer;
  font-weight: bold;
  color: white;
  font-size: 16px;
}
.modal__button--over {
  background-color: red;
}
.modal__button--victory {
  background-color: green;
}
</style>