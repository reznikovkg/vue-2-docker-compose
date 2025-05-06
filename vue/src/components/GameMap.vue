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
            :key="level"
            @click="() => changeLevel(level-1)"
            class="game__level-button">
          Уровень {{level}}
        </button>
      </p>
    </div>
    <div class="game__content">
      <div class="game__grid grid">
        <GameCell
            v-for="(cell, index) in grid"
            :key="index"
            :index="index"
            :isRoad="isRoad(index)"
            :isFirstRoadCell="isFirstRoadCell(index)"
            :isLastRoadCell="isLastRoadCell(index)"
            :isTower="isTower(index)"
            :canPlaceTower="canPlaceTower(index)"
            :tower="getTower(index)"
            :isInRange="inRangeIndices.includes(index)"
            @cellClick="(index) => handleCellClick(index)"
            @cellHover="(index) => handleCellHover(index)"
            @cellHoverLeave="() => handleCellHoverLeave()"
        />
        <EnemyUnit
            v-for="enemy in enemies"
            :key="enemy.id"
            :enemyHealth="enemy.health"
            :enemyPixelPosition="enemy.pixel"
            :isDead="enemy.isDead"
            :enemyType="enemy.type"
        />
        <ProjectileUnit
            v-for="projectile in projectiles"
            :key="projectile.id"
            :id="projectile.id"
            :startX="projectile.startX"
            :startY="projectile.startY"
            :endX="projectile.endX"
            :endY="projectile.endY"
        />
      </div>
    </div>
    <dialog ref="modal" class="game__modal modal">
      <p>{{ gameOver ? "GAME OVER!" : "ENEMY DEFEATED!" }}</p>
      <button class="modal__button modal__button--ok"
              v-if="enemyDefeated"
              @click="() => closeModal()">
        OK
      </button>
      <button class="modal__button modal__button--ok"
              v-if="gameOver"
              @click="() => switchLevel(currentLevel)">
        Играть снова
      </button>
    </dialog>
    <div v-if="message && !gameOver && !enemyDefeated"
         class="game__message">
      {{ message }}
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import GameCell from "@/components/GameCell.vue"
import EnemyUnit from "@/components/EnemyUnit.vue";
import ProjectileUnit from "@/components/ProjectileUnit.vue";
export default {
  name: 'GameMap',
  components: {ProjectileUnit, EnemyUnit, GameCell},
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
      "towers",
      "inRangeIndices",
      "projectiles",
      "enemies",
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
    this.spawnEnemies()
  },
  methods: {
    ...mapActions([
      "startTowerAttacks",
      "placeTower",
      "upgradeTower",
      "changeLevel",
      "handleCellHoverLeave",
      "setHoveredTowerData",
      "spawnEnemies"
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
    },
    handleCellHover(index) {
      if (this.isTower(index)) {
        const tower = this.getTower(index);
        if (tower) {
          this.setHoveredTowerData({ index, tower });
        }
      }
    },
  },
}
</script>

<style lang="less">
.game {
  position: relative;
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
    border-radius: @border-radius;
  }
  &__level {
    font-size: @font-size-base;
    margin: 0;
  }
  &__coins {
    font-size: @font-size-base;
    color: gold;
    margin: 0;
  }
  &__level-buttons {
    margin: 5px 0;
  }
  &__level-button {
    margin: 5px;
    padding: 10px;
    background-color: #636161;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: @border-radius;
  }
  &__level-button:hover {
    background-color: #4e4b4b;
  }
  &__status {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #222222;
    padding: 10px;
    border-radius: @border-radius;
    width: 500px;
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
    border-radius: @border-radius;
    text-align: center;
    z-index: 1000;
  }
}
.modal {
  background-color: #ffffff;
  padding: 20px;
  border-radius: @border-radius;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 1000;
  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
  &__button {
    margin-top: 10px;
    padding: 10px 15px;
    background: #222;
    color: white;
    border: none;
    border-radius: @border-radius;
    cursor: pointer;
  }
  &__button:hover {
    background: #444;
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
  position: relative;
  height: 420px;
}
</style>