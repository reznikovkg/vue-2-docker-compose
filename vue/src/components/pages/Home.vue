<template>
  <div class="game">
    <div class="header">
      <div class="header-content">
        <h1 class="game-title">2048</h1>
        <div class="score-box">
          <span class="score-label">Счет:</span>
          <span class="score-value">{{ score }}</span>
        </div>
        <button class="new-game-btn" @click="init">Новая игра</button>
      </div>
    </div>
    <div class="board">
      <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="row">
        <GameTile
            v-for="(cell, colIndex) in row"
            :key="`${rowIndex}-${colIndex}`"
            :tile="cell"
        />
      </div>
      <div v-if="gameOver" class="game-over">Конец игры</div>
      <div v-if="victory" class="victory">Победа!</div>
    </div>
  </div>
</template>
<script>
import GameTile from '@/components/Tile.vue';

export default {
  name: 'HomePage',
  components: { GameTile },
  data() {
    return {
      cells: [],
      score: 0,
      gameOver: false,
      victory: false,
    };
  },
  computed: {
    rows() {
      const rows = [];
      for (let i = 0; i < 4; i++) {
        rows.push(this.cells.slice(i * 4, (i + 1) * 4));
      }
      return rows;
    },
  },
  methods: {
    init() {
      this.cells = Array(16).fill(0);
      this.addRandomTile();
      this.addRandomTile();
      this.gameOver = false;
      this.victory = false;
      this.score = 0;
    },
    addRandomTile() {
      const emptyCells = this.cells
          .map((value, index) => (value === 0 ? index : -1))
          .filter(index => index !== -1);
      if (emptyCells.length > 0) {
        const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.cells[index] = 2;
      }
    },
    move(direction) {
      const moved = this[`move${direction}`]();
      if (moved) {
        this.addRandomTile();
        this.checkGameState();
      }
    },
    moveArrowLeft() {
      return this.moveRow('left');
    },
    moveArrowRight() {
      return this.moveRow('right');
    },
    moveArrowUp() {
      return this.moveColumn('up');
    },
    moveArrowDown() {
      return this.moveColumn('down');
    },
    moveRow(direction) {
      let moved = false;
      for (let row = 0; row < 4; row++) {
        const start = row * 4;
        const end = start + 4;
        const currentRow = this.cells.slice(start, end);
        const newRow = this.compressAndMerge(currentRow, direction);
        if (JSON.stringify(currentRow) !== JSON.stringify(newRow)) {
          this.cells.splice(start, 4, ...newRow);
          moved = true;
        }
      }
      return moved;
    },
    moveColumn(direction) {
      let moved = false;
      for (let col = 0; col < 4; col++) {
        const column = [this.cells[col], this.cells[col + 4], this.cells[col + 8], this.cells[col + 12]];
        const newColumn = this.compressAndMerge(column, direction);
        if (JSON.stringify(column) !== JSON.stringify(newColumn)) {
          this.$set(this.cells, col, newColumn[0]);
          this.$set(this.cells, col + 4, newColumn[1]);
          this.$set(this.cells, col + 8, newColumn[2]);
          this.$set(this.cells, col + 12, newColumn[3]);
          moved = true;
        }
      }
      return moved;
    },
    compressAndMerge(array, direction) {
      const compressed = array.filter(cell => cell !== 0);
      if (direction === 'right' || direction === 'down') {
        compressed.reverse();
      }
      for (let i = 0; i < compressed.length - 1; i++) {
        if (compressed[i] === compressed[i + 1]) {
          compressed[i] *= 2;
          this.score += compressed[i];
          if (compressed[i] === 2048) this.victory = true;
          compressed.splice(i + 1, 1);
        }
      }
      while (compressed.length < 4) {
        compressed.push(0);
      }
      if (direction === 'right' || direction === 'down') {
        compressed.reverse();
      }
      return compressed;
    },
    checkGameState() {
      if (!this.cells.includes(0)) {
        this.gameOver = !this.hasPossibleMoves();
      }
    },
    hasPossibleMoves() {
      for (let i = 0; i < 16; i++) {
        if (i % 4 < 3 && this.cells[i] === this.cells[i + 1]) return true;
        if (i < 12 && this.cells[i] === this.cells[i + 4]) return true;
      }
      return false;
    },
    handleKeyDown(event) {
      console.log('Key pressed:', event.key);
      event.preventDefault();
      const keyMap = {
        ArrowUp: 'ArrowUp',
        ArrowDown: 'ArrowDown',
        ArrowLeft: 'ArrowLeft',
        ArrowRight: 'ArrowRight'
      };
      const direction = keyMap[event.key];
      if (direction) this.move(direction);
    },
  },
  created() {
    this.init();
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.game-title {
  color: #bb8213;
  margin-left: 200px;
  font-weight: 900;
  font-size: 100px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.board {
  display: flex;
  flex-direction: column;
  background-color: #d0d6da;
  border-radius: 8px;
  position: relative;
}

.row {
  display: flex;
}

.new-game-btn {
  margin-right: 200px;
  background: indianred;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
  padding: 20px 30px;
  border-radius: 5px;
  transition: transform 0.1s ease;
}

.new-game-btn:active {
  transform: scale(0.95);
}

.game-over,
.victory {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  font-weight: bold;
  text-align: center;
}

.game-over {
  color: red;
}

.victory {
  color: green;
}

.score-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3bb4c;
  border-radius: 10px;
  width: 150px;
  height: 65px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.score-label {
  font-size: 18px;
  margin-bottom: 8px;
}

.score-value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}
</style>
