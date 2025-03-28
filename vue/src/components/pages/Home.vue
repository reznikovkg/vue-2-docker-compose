<template>
  <div class="game">
    <div class="header">
      <div class="header-content">
        <h1 class="game-title">2048</h1>
        <div class="score-box">
          <span class="score-label">Счет:</span>
          <span class="score-value">{{ score }}</span>
        </div>
      </div>
    </div>
    <div class="board">
      <div class="grid">
        <GameTile
            v-for="(cell, index) in cells"
            :key="index"
            :tile="cell"
            :style="getTilePosition(index)"
        />
      </div>
    </div>
    <GameOverModal
        :isVisible="gameOver"
        @restart="() => restartGame()"
    />
    <VictoryModal
        :isVisible="victory"
        @restart="() => restartGame()"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import GameTile from '@/components/Tile.vue';
import GameOverModal from "@/components/modals/GameOverModal.vue";
import VictoryModal from "@/components/modals/VictoryModal.vue";

export default {
  name: 'HomePage',
  components: { GameTile, GameOverModal, VictoryModal },
  computed: {
    ...mapState('game', ['cells', 'score', 'gameOver', 'victory']),
    ...mapGetters('game', ['rows', 'keyMap']),
  },
  methods: {
    ...mapActions('game', [
      'initGame',
      'addRandomTile',
      'move',
      'checkGameState',
      'restartGame',
    ]),
    handleKeyDown(event) {
      event.preventDefault();
      const direction = this.keyMap[event.key];
      if (direction) {
        this.move(direction);
      }
    },
    getTilePosition(index) {
      const row = Math.floor(index / 4);
      const col = index % 4;
      return {
        gridRow: row + 1,
        gridColumn: col + 1,
      };
    },
  },
  created() {
    this.initGame();
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>
<style scoped lang="less">
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #eee4da;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 620px;
  margin-bottom: 20px;

  .header-content {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}

.game-title {
  color: #bb8213;
  font-weight: 900;
  font-size: clamp(24px, 5vw, 48px);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 400px) {
    font-size: clamp(18px, 6vw, 36px);
  }
}
.score-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3bb4c;
  border-radius: 10px;
  width: clamp(100px, 20vw, 150px);
  height: clamp(50px, 10vw, 80px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .score-label {
    font-size: clamp(12px, 2vw, 16px);
    margin-bottom: 4px;
  }

  .score-value {
    font-size: clamp(16px, 3vw, 24px);
    font-weight: bold;
  }
}

.new-game-btn {
  background: indianred;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: transform 0.1s ease, background-color 0.3s ease;

  &:hover {
    background-color: darken(indianred, 10%);
  }

  &:active {
    transform: scale(0.95);
  }
}
:root {
  --gap: clamp(5px, 1vw, 10px);
}

.board {
  display: grid;
  gap: clamp(5px, 1vw, 10px);
  width: clamp(200px, 80vw, 430px);
  padding: clamp(8px, 1vw, 15px);
  background-color: #d0d6da;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: 400px) {
    gap: 5px;
    padding: 5px;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(5px, 1vw, 10px);
  width: 100%;
  max-width: 100%;
  max-height: calc(100% - 50px);
  height: auto;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.tile-enter-active {
  animation: pop-in 0.4s ease;
}

@keyframes pop-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
