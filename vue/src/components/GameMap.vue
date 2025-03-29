<template>
  <div class="game">
    <div class="game__controls">
      <div class="game__status">
        <h3 class="game__level">
          Уровень: {{ currentLevel + 1 }} / {{ levels.length }}
        </h3>
        <h3 class="game__coins">
          Монеты: {{ coins }}
        </h3>
      </div>
      <p class="game__level-buttons">
        <button
            v-for="level in levels.length"
            :key="level" @click="() => changeLevel(level-1)"
            class="game__level-button">
          Уровень {{level}}
        </button>
      </p>
    </div>
    <div class="game__content">
      <!-- Игровая сетка -->
      <div class="game__grid grid">
        <GameCell
            v-for="(cell, index) in grid"
            :key="index"
            :index="index"
            :isRoad="isRoad(index)"
            :isFirstRoadCell="isFirstRoadCell(index)"
            :isLastRoadCell="isLastRoadCell(index)"
            :isEnemy="enemyPosition === index && enemyHealth > 0"
            :isTower="isTower(index)"
            :canPlaceTower="canPlaceTower(index)"
            :enemyHealth="enemyHealth"
            :tower="getTower(index)"
            @cellClick="handleCellClick"
        />
      </div>
      </div>
      <!-- Модальное окно -->
      <dialog ref="modal" class="game__modal">
        <p>{{ gameOver ? "GAME OVER!" : "ENEMY DEFEATED!" }}</p>
        <button v-if="enemyDefeated" @click="() => closeModal()">
          OK
        </button>
        <button v-if="gameOver" @click="() => switchLevel(currentLevel)">
          Играть снова
        </button>
      </dialog>
      <div v-if="message && !gameOver && !enemyDefeated" class="game__message">{{ message }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import GameCell from "@/components/GameCell.vue";
export default {
  name: 'GameMap',
  components: {GameCell},
  data() {
    return {
      rows: 10,
      cols: 10,
    }
  },
  computed: {
     ...mapGetters([
      "coins",
      "currentLevel",
      "levels",
      "enemyDefeated",
      "gameOver",
      "enemyPosition",
      "enemyHealth",
      "message",
      "canPlaceTower",
      "path",
      "buildableCells",
      "towers"
    ]),
    grid() {
      return new Array(this.rows * this.cols).fill(null)
    }
  },
  watch: {
    gameOver(newValue) {
      if (newValue)
        this.$refs.modal.showModal();
    },
    enemyDefeated(newValue) {
      if (newValue)
        this.$refs.modal.showModal();
    },
  },
  mounted() {
    this.startTowerAttacks()
    this.moveEnemy()
  },
  methods: {
    ...mapActions([
      "moveEnemy",
      "startTowerAttacks",
      "placeTower",
      "upgradeTower",
      "changeLevel",
    ]),
    isRoad(index) {
      return this.path.includes(index)
    },
    isTower(index) {
      return this.towers.some(tower => tower.position === index)
    },
    getTower(index) {
      return this.towers.find(tower => tower.position === index)
    },
    isFirstRoadCell(index) {
      return this.path[0] === index
    },
    isLastRoadCell(index) {
      return this.path[this.path.length - 1] === index
    },
    handleCellClick(index) {
      if (this.gameOver || this.enemyDefeated) return
      if (this.isTower(index)) {
        this.upgradeTower(index)
      } else {
        this.placeTower(index)
      }
    },
    closeModal() {
      this.$refs.modal.close();
    },
    switchLevel(level) {
      this.closeModal();
      this.changeLevel(level)
    }
  },
}
</script>

<style lang="less">
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  &__level,
  &__coins {
    font-size: 16px;
    font-weight: bold;
    color: white;
    margin: 0;
    background-color: #222222;
    padding: 10px;
    border-radius: 5px;
  }
  &__level {
    font-size: 16px;
  }
  &__coins {
    font-size: 18px;
    color: gold;
    margin-bottom: 10px;
  }
  &__level-buttons {
    margin: 5px 0;
  }
  &__status {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #222222;
    padding: 10px;
    border-radius: 5px;
    width: 500px;
    & h3 {
      margin: 0;
      font-size: 18px;
    }
  }
  &__controls {
    display: flex;
    flex-direction: column;
    width: 650px;
    align-items: center;
  }
  &__message {
    background-color: rgba(0, 0, 0, 0.8);
    color: #ffffff;
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 8px;
    text-align: center;
    z-index: 1000;
  }
  &__modal {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-template-rows: repeat(10, 40px);
  gap: 2px;
  background-color: #023902;
  border: 5px solid #000000;
  padding: 5px;
}
.game__modal {
  text-align: center;
  z-index: 1000;
  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
  & button {
    margin-top: 10px;
    padding: 10px 15px;
    background: #222;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  & button:hover {
    background: #444;
  }
}
</style>