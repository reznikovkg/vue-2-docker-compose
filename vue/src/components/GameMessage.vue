<template>
  <div v-if="message && !gameOver && !enemyDefeated" class="game-message">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    gameOver: {
      type: Boolean,
      required: true
    },
    enemyDefeated: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
.game-message {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 8px;
  text-align: center;
  z-index: 1000;
}

</style>
