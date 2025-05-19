<template>
  <div class="game-controller">
    <div class="info">
      <div class="score">Score: {{ score }}</div>
      <div class="combo" v-if="comboCount > 0">Combo x{{ comboCount }}</div>
      <div class="misses">Misses: {{ misses }}/{{ maxMisses }}</div>
    </div>

    <div
        class="status"
        :class="{ hidden: !statusMessage }"
    >
      {{ statusMessage || ' ' }}
    </div>

    <div class="grid">
      <GridCell
          v-for="index in 9"
          :key="index"
          :hasMole="activeCell === index"
          @cell-click="handleCellClick(index)"
      />
    </div>

    <button
        v-if="gameOver"
        class="button"
        @click="restartGame"
    >
      Restart Game
    </button>

    <button v-if="!gameStarted"
            class="button"
            @click="startGame"
    >
      Start Game
    </button>

  </div>
</template>

<script>
import GridCell from './GridCell.vue';

export default {
  name: 'GameController',
  components: { GridCell },
  data() {
    return {
      gameStarted: false,
      activeCell: null,
      moleTimeout: null,
      moleInterval: null,
      statusMessage: null,
      score: 0,
      comboCount: 0,
      comboBonus: 0,
      misses: 0,
      maxMisses: 5,
      gameOver: false,
      statusTimeout: null,
      moleWasMissed: false,
      moleWasHit: false,
    };
  },
  methods: {
    // Начинаем игру
    startGame() {
      this.gameStarted = true;
      this.restartGame();
    },
    // Сбрасывает игру к начальному состоянию и запускает цикл кротов заново
    restartGame() {
      this.score = 0;
      this.comboCount = 0;
      this.comboBonus = 0;
      this.misses = 0;
      this.statusMessage = '';
      this.gameOver = false;
      if (this.statusTimeout) {
        clearTimeout(this.statusTimeout);
      }
      this.activeCell = null;
      this.startMoleCycle();
    },

    // Вычисляет текущие задержки появления крота и длительности его нахождения,
    // которые уменьшаются с ростом комбо
    getCurrentDelays() {
      const speedFactor = 0.1;
      const baseInterval = 3000;
      const baseDuration = 1500;
      const factor = 1 + this.comboCount * speedFactor;
      return {
        spawnInterval: Math.max(500, baseInterval / factor),
        moleDuration: Math.max(300, baseDuration / factor),
      };
    },

    // Запускает цикл появления кротов
    startMoleCycle() {
      this.scheduleNextMole();
    },

    // Планирует следующее появление крота с рандомным интервалом
    scheduleNextMole() {
      const { spawnInterval } = this.getCurrentDelays();
      this.moleInterval = setTimeout(() => {
        this.spawnMole();
        this.scheduleNextMole();
      }, this.randomTime(spawnInterval * 0.7, spawnInterval));
    },

    // Появление крота в случайной ячейке и установка таймаута на его исчезновение.
    // Если крот не был пойман, увеличивает счетчик промахов и показывает сообщение.
    spawnMole() {
      this.activeCell = Math.floor(Math.random() * 9) + 1;
      this.moleWasHit = false;
      this.moleWasMissed = false;

      const { moleDuration } = this.getCurrentDelays();
      clearTimeout(this.moleTimeout);
      this.moleTimeout = setTimeout(() => {
        if (!this.moleWasHit && !this.moleWasMissed && !this.gameOver) {
          this.score += this.comboBonus;
          this.comboBonus = 0;
          this.comboCount = 0;
          this.misses += 1;
          this.statusMessage = `⏱️ Too slow! (${this.misses}/${this.maxMisses})`;

          if (this.statusTimeout) clearTimeout(this.statusTimeout);
          this.statusTimeout = setTimeout(() => {
            if (!this.gameOver) this.statusMessage = null;
          }, 1000);

          if (this.misses >= this.maxMisses) {
            this.statusMessage = `💀 Game Over! Final Score: ${this.score}`;
            this.gameOver = true;
            clearInterval(this.moleInterval);
            clearTimeout(this.moleTimeout);
          }
        }
        this.activeCell = null;
      }, this.randomTime(moleDuration * 0.7, moleDuration));
    },

    // Обработка клика по ячейке
    handleCellClick(index) {
      if (!this.gameStarted || this.misses >= this.maxMisses || this.gameOver) return;

      const isHit = index === this.activeCell;
      if (isHit) {
        // Если клик по активной ячейке — увеличиваем комбо и очки
        this.moleWasHit = true;
        this.comboCount += 1;
        const multiplier = 1 + this.comboCount * 0.05;
        const points = Math.round(100 * multiplier);
        this.comboBonus += points;
        this.statusMessage = `✅ Hit! +${points} pts (Combo x${this.comboCount})`;
      } else {
        // Если промах — сбрасываем комбо и увеличиваем количество промахов
        this.moleWasMissed = true;
        this.score += this.comboBonus;
        this.comboBonus = 0;
        this.comboCount = 0;
        this.misses += 1;
        this.statusMessage = `❌ Miss! (${this.misses}/${this.maxMisses})`;
      }

      this.activeCell = null;

      if (!this.gameOver) {
        if (this.statusTimeout) clearTimeout(this.statusTimeout);
        this.statusTimeout = setTimeout(() => {
          if (!this.gameOver) this.statusMessage = null;
        }, 1000);
      }

      if (this.misses >= this.maxMisses && !this.gameOver) {
        // Завершаем игру, если превышен лимит промахов
        this.statusMessage = `💀 Game Over! Final Score: ${this.score}`;
        this.gameOver = true;
        clearInterval(this.moleInterval);
        clearTimeout(this.moleTimeout);
      }
    },

    // Возвращает случайное число между min и max включительно
    randomTime(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },

  beforeDestroy() {
    clearInterval(this.moleInterval);
    clearTimeout(this.moleTimeout);
  },
};
</script>

<style scoped>
.game-controller {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info {
  margin-bottom: 10px;
  display: flex;
  gap: 20px;
  font-size: 1.2rem;
  justify-content: center;
}

.status {
  font-size: 1rem;
  text-align: center;
  margin-bottom: 10px;
  padding: 6px;
  width: 320px;
  height: 2rem;
  background-color: #eee;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
  justify-content: center;
}

.button {
  margin-top: 20px;
  padding: 10px 20px;
  width: 320px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
}

.button:hover {
  background-color: #45a049;
}
</style>