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
        <div
            v-for="(cell, index) in grid"
            :key="index"
            class="grid__cell"
            :class="{
              'grid__cell--road': isRoad(index),
              'grid__cell--road-first': isRoad(index) && isFirstRoadCell(index),
              'grid__cell--road-last': isRoad(index) && isLastRoadCell(index),
              'grid__cell--enemy': enemyPosition === index && enemyHealth > 0,
              'grid__cell--tower': isTower(index),
              'grid__cell--can-place-tower': canPlaceTower(index)
            }"
            @click="() => handleCellClick(index)"
        >
          <EnemyUnit
              v-if="enemyPosition === index && enemyHealth > 0"
              :enemyHealth="enemyHealth"
          />
          <TowerUnit
              v-if="isTower(index)"
              :towerGrade="getTower(index).grade"
              :towerHealth="getTower(index).health"
              :index="index"
          />
        </div>
      </div>
      <GameModal
          :visible="gameOver || enemyDefeated"
          :title="gameOver ? 'Игра окончена!' : 'Поздравляем!'"
          :message="gameOver ? 'Попробуйте еще раз!' : 'Вы победили врага!'"
          @replay="() => changeLevel(currentLevel)"
          @next="() => changeLevel(currentLevel + 1)"
      />
      <div v-if="message && !gameOver && !enemyDefeated" class="game__message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import EnemyUnit from "@/components/EnemyUnit.vue"
import TowerUnit from "@/components/TowerUnit.vue"
import GameModal from "@/components/GameModal.vue";
export default {
  name: 'GameMap',
  components: {GameModal, TowerUnit, EnemyUnit},
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
    ]),
    grid() {
      return new Array(this.rows * this.cols).fill(null)
    },
    path() {
      return this.levels[this.currentLevel].path
    },
    towers() {
      return this.levels[this.currentLevel].towers
    },
    buildableCells() {
      return this.levels[this.currentLevel].buildableCells
    }
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
  },
}
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.game__level {
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin: 0;
  background-color: #222222;
  padding: 10px;
  border-radius: 5px;
}
.game__level-buttons {
  margin-top: 5px;
  margin-bottom: 5px;
}
.game__level-button {
  margin: 5px;
  padding: 10px;
  background-color: dimgray;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.game__level-button:hover {
  background-color: dimgray;
}
.game__coins {
  font-size: 18px;
  font-weight: bold;
  color: gold;
  margin-bottom: 10px;
  background-color: #222222;
  padding: 10px;
  border-radius: 5px;
}
.game__status {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #222222;
  padding: 10px;
  border-radius: 5px;
  width: 500px;
  h3 {
    margin: 0;
    font-size: 18px;
  }
}
.game__controls {
  display: flex;
  flex-direction: column;
  width: 650px;
  align-items: center;
}
.game__message {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 8px;
  text-align: center;
  z-index: 1000;
}
.grid {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-template-rows: repeat(10, 40px);
  gap: 2px;
  background-color: darkgreen;
  border: 5px solid black;
  padding: 5px;
}
.grid__cell {
  width: 40px;
  height: 40px;
  background-color: green;
  border: 1px solid darkgreen;
  position: relative;
}
.grid__cell--road {
  /*background-color: #c4a642;*/
  background-color: peru;
}
.grid__cell--road-first {
  background-color: dodgerblue;
}
.grid__cell--road-last {
  background-color: rebeccapurple;
}
.grid__cell--can-place-tower {
  background-color: olivedrab;
  cursor: pointer;
}
</style>