<template>
  <div class="game-container">
    <StartMenu @start-game="startGame" v-if="!isGameStarted" />
    <div v-if="isGameStarted">
      <BirdPage ref="bird" @collision="handleCollision" />
      <PipePage @pipes-update="updatePipes" />
      <div class="lives">
        <img
          v-for="n in lives"
          :key="n"
          src="@/assets/heart.png"
          alt="heart"
          class="heart"
        />
      </div>
    </div>
    <div v-if="isGameOver">
      <button @click="restartGame" class="restart-button">Начать снова</button>
    </div>
  </div>
</template>

<script>
import BirdPage from "./BirdPage.vue";
import PipePage from "./PipePage.vue";
import StartMenu from "./StartMenu.vue";

export default {
  components: {
    BirdPage,
    PipePage,
    StartMenu,
  },
  data() {
    return {
      isGameStarted: false,
      isGameOver: false,
      lives: 3,
    };
  },
  methods: {
    startGame() {
      this.isGameStarted = true;
      this.isGameOver = false;
      this.lives = 3;
    },
    updatePipes(pipes) {
      this.$refs.bird.checkCollision(pipes);
    },
    handleCollision() {
      if (this.lives > 1) {
        this.lives--;
      } else {
        this.endGame();
      }
    },
    endGame() {
      this.isGameOver = true;
      this.$refs.bird.fall();
      document.querySelector(".game-container").classList.add("shake");
      setTimeout(() => {
        document.querySelector(".game-container").classList.remove("shake");
      }, 500);
    },
    restartGame() {
      this.isGameStarted = false;
      this.isGameOver = false;
    },
  },
};
</script>

<style scoped>
.game-container {
  background-image: url("@/assets/background.png");
  background-size: cover;
  height: 100vh;
  position: relative;
}

.lives {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
}

.heart {
  width: 50px;
  margin-right: 20px;
}

.restart-button {
  background-color: darkgreen;
  color: white;
  padding: 20px 40px;
  font-size: 24px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
