<template>
  <div class="start-menu" v-if="!isGameStarted">
    <button @click="startGame" class="start-button">Начать игру</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isGameStarted: false,
    };
  },
  methods: {
    startGame() {
      this.isGameStarted = true;
      this.$emit("start-game");
    },
  },
};
</script>

<style scoped>
.start-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  z-index: 1;
}

.start-button {
  background-color: darkgreen;
  color: white;
  padding: 20px 40px;
  font-size: 24px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
}

.start-button:hover {
  background-color: green;
}
</style>
