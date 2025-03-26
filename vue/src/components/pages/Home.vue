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
  height: 100vh;
  padding: 20px;
  background-color: #faf8ef;
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
  font-size: 5vw;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    font-size: 12vw;
  }
}
.score-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3bb4c;
  border-radius: 10px;
  width: 120px;
  height: 60px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  .score-label {
    font-size: 14px;
    margin-bottom: 4px;

    @media (max-width: 200px) {
      font-size: 10px;
    }
  }
  .score-value {
    font-size: 24px;
    font-weight: bold;

    @media (max-width: 200px) {
      font-size: 18px;
    }
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

.board {
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  grid-gap: 10px;
  width: 100%;
  max-width: 430px;
  padding: 10px;
  background-color: #d0d6da;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: 200px) {
    grid-gap: 5px;
    width: 100%;
    padding: 5px;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  grid-gap: 8px;
  width: 100%;
  height: 100%;

  @media (max-width: 200px) {
    grid-gap: 5px;
  }
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10;

  h2 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    color: #666;
  }
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
