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
      <!-- Модальное окно -->
      <dialog ref="modal" class="game__modal">
        <p>{{ gameOver ? "GAME OVER!" : "ENEMY DEFEATED!" }}</p>
        <button v-if="enemyDefeated" @click="() => closeModal()">
          OK
        </button>
        <button v-if="gameOver" @click="() => {
          closeModal()
          changeLevel(currentLevel)
        }">Играть снова
        </button>
      </dialog>
      <div v-if="message && !gameOver && !enemyDefeated" class="game__message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import EnemyUnit from "@/components/EnemyUnit.vue"
import TowerUnit from "@/components/TowerUnit.vue"
export default {
  name: 'GameMap',
  components: {TowerUnit, EnemyUnit},
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
  },
}
</script>

<style lang="less">
@import '@/less/const.less';
.flex-column-center() {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-style(@bg-color, @text-color, @font-size: 16px) {
  font-size: @font-size;
  font-weight: bold;
  color: @text-color;
  margin: 0;
  background-color: @bg-color;
  padding: 10px;
  border-radius: 5px;
}
.grid-cell(@color) {
  background-color: @color;
  width: 40px;
  height: 40px;
  border: 1px solid darkgreen;
  position: relative;
}
.game {
  .flex-column-center();
  &__content {
    .flex-column-center();
    gap: 10px;
  }
  &__level {
    .box-style(#222222, white, 16px);
  }
  &__coins {
    .box-style(#222222, gold, 18px);
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
    h3 {
      margin: 0;
      font-size: 18px;
    }
  }
  &__controls {
    .flex-column-center();
    width: 650px;
  }
  &__message {
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 8px;
    text-align: center;
    z-index: 1000;
  }
  &__modal {
    background-color: white;
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
  background-color: darkgreen;
  border: 5px solid black;
  padding: 5px;
  &__cell {
    .grid-cell(green);
    &--road {
      .grid-cell(peru);
    }
    &--road-first {
      .grid-cell(dodgerblue);
    }
    &--road-last {
      .grid-cell(rebeccapurple);
    }
    &--can-place-tower {
      .grid-cell(olivedrab);
      cursor: pointer;
    }
  }
}
</style>