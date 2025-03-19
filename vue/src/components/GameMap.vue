<template>
  <div class="game-container">
    <div class="controls">
      <StatusBar :currentLevel="currentLevel" :totalLevels="levels.length" :coins="coins" />

      <GameLevels @levels-loaded="setInitialLevel" @level-selected="changeLevel" />

    </div>

    <div class="game-content">

      <div class="grid">

        <div
            v-for="(cell, index) in grid"
            :key="index"
            class="cell"
            :class="{
              'road': isRoad(index),
              'enemy': enemyPosition === index && enemyHealth > 0,
              'tower': isTower(index),
              'can-place-tower': canPlaceTower(index)
            }"
            @click="() => handleCellClick(index)"
        >

          <EnemyUnit
                     :enemyHealth="enemyHealth"
                     :enemyPosition="enemyPosition"
                     :index="index" />

          <TowerUnit
              v-if="isTower(index)"
              :tower="getTower(index)"
              :towerNumber="getTowerNumber(index)"
              :gameOver="gameOver"
              :enemyDefeated="enemyDefeated"
              :coins="coins"
              @updateCoins="updateCoins"
              @updateTower="handleTowerUpdate"
              @deleteTower="deleteTower"
              @showMessage="showMessage"
          />

        </div>

      </div>

      <GameEnd/>
      <GameMessage :message="message" :gameOver="gameOver" :enemyDefeated="enemyDefeated" />

    </div>

  </div>
</template>

<script>
import TowerUnit from "@/components/TowerUnit.vue";
import GameLevels from "@/components/GameLevels.vue";
import EnemyUnit from "@/components/EnemyUnit.vue";
import GameMessage from "@/components/GameMessage.vue";
import GameEnd from "@/components/GameEnd.vue";
import StatusBar from "@/components/StatusBar.vue";
import { mapState, mapActions } from 'vuex';

export default {
  components: {StatusBar, GameEnd, GameMessage, EnemyUnit, TowerUnit, GameLevels},

  data() {
    return {
      towerCost: 20, // стоимость башни
      upgradeCost: 10, // стоимость улучшения
      sellRefund: 0.8, // 80% стоимости при продаже возвращается

      startHealth: 10,
      startDamage: 1,
      startFireRate: 5,
      startRange: 1,

      rows: 10,
      cols: 10,

      levels: [
        {
          path: [],
          buildableCells: [],
          towers: []
        },
      ],

      attackIntervals: [],
      enemyAttackInterval: null,
      enemyInterval: null,

      currentLevel: 0,

      message: "",
      messageTimeout: null,
      showGameInfo: false,
    };
  },
  computed: {
    ...mapState({
      enemyPosition: state => state.enemyPosition,
      enemyHealth: state => state.enemyHealth,
      coins: state => state.coins,
      gameOver: state => state.gameOver,
      enemyDefeated: state => state.enemyDefeated,
    }),
    grid() {
      return new Array(this.rows * this.cols).fill(null);
    },
    path() {
      return this.levels[this.currentLevel].path;
    },
    towers() {
      return this.levels[this.currentLevel].towers;
    },
    buildableCells() {
      return this.levels[this.currentLevel].buildableCells;
    }
  },
  beforeCreate() {

  },
  methods: {
    ...mapActions(['updateEnemyPosition', 'updateEnemyHealth', 'updateCoins', 'updateGameOver', 'updateEnemyDefeated']),

    updateTower(updatedTower) {
      let index = this.towers.findIndex(t => t.position === updatedTower.position);
      if (index !== -1) {
        this.$set(this.towers, index, updatedTower);
      }
    },
    handleTowerUpdate(updatedTower) {
      this.updateTower(updatedTower);
      this.startTowerAttacks();
    },

    isRoad(index) {
      return this.path.includes(index);
    },
    isTower(index) {
      return this.towers.some(tower => tower.position === index);
    },
    getTower(index) {
      return this.towers.find(tower => tower.position === index);
    },
    getTowerNumber(index) {
      return this.towers.findIndex(tower => tower.position === index) + 1;
    },
    handleCellClick(index) {
      if (this.gameOver || this.enemyDefeated) return; // взаимодействие с ячейками после окончания игры запрещено

      if (!this.isTower(index)) {
        this.placeTower(index);
      }
    },
    canPlaceTower(index) {
      return this.buildableCells.includes(index) && !this.isTower(index);
    },
    placeTower(index) {

      if (this.canPlaceTower(index)) {
        if (this.coins >= this.towerCost) {
          this.updateCoins(-this.towerCost);

          this.towers.push({
            position: index,
            health: this.startHealth,
            damage: this.startDamage,
            fireRate: this.startFireRate,
            range: this.startRange,
            grade: 1
          });

          this.startTowerAttacks();
        } else {
          this.showMessage("❌ Недостаточно монет для новой башни!");
        }
      }
    },

    stopAllAttacks() {
      this.stopTowerAttacks();  // остановка атак башен
      this.stopEnemyAttacks();  // остановка атак врага
    },
    moveEnemy() {
      let step = 0;
      this.enemyHealth = 100;
      this.updateEnemyDefeated(false);
      this.updateGameOver(false);


      if (this.enemyInterval) {
        clearInterval(this.enemyInterval);
      }
      this.enemyInterval = setInterval(() => {
        if (step < this.path.length) {
          const newPosition = this.path[step];
          this.updateEnemyPosition(newPosition);
          step++;
        } else {
          clearInterval(this.enemyInterval);
          this.enemyInterval = null;
          this.updateGameOver(true);
          this.stopEnemyAttacks(); // Остановить атаки, если враг дошел до конца
        }
      }, 500);

      this.startEnemyAttacks(); // Запуск атаки врага
    },
    startEnemyAttacks() {
      this.stopEnemyAttacks(); // Очищаем старые атаки

      this.enemyAttackInterval = setInterval(() => {
        if (this.enemyHealth > 0 && !this.gameOver) {
          this.enemyAttack();
        } else {
          this.stopEnemyAttacks();
        }
      }, 200); // Атака со стороны врага каждые ... мс
    },

    startTowerAttacks() {
      this.stopTowerAttacks(); // очищаю все старые атаки

      this.towers.forEach((tower) => {
        let attackSpeed = 1000 / tower.fireRate;
        let attackInterval = setInterval(() => {
          // существует ли башня перед атакой
          if (!this.towers.includes(tower)) {
            clearInterval(attackInterval); // останавливаем атаку башни, которую враг одолел
            return;
          }

          if (this.enemyHealth > 0 && !this.gameOver && this.isInRange(tower, this.enemyPosition, false)) {
            let newHealth = this.enemyHealth - tower.damage;
            this.updateEnemyHealth(newHealth);

            if (newHealth <= 0) {
              clearInterval(this.enemyInterval);
              this.enemyInterval = null;
              this.enemyPosition = -1;
              this.updateEnemyDefeated(true);
              this.updateCoins(150);
              this.stopAllAttacks();
            }
          }
        }, attackSpeed);

        this.attackIntervals.push(attackInterval);
      });
    },

    stopTowerAttacks() {
      this.attackIntervals.forEach(interval => clearInterval(interval));
      this.attackIntervals = [];
    },
    stopEnemyAttacks() {
      if (this.enemyAttackInterval) {
        clearInterval(this.enemyAttackInterval);
        this.enemyAttackInterval = null;
      }
    },
    enemyAttack() {
      this.towers.forEach((tower, index) => {
        if (this.isInRange(tower, this.enemyPosition, true)) {
          tower.health -= 1;
          if (tower.health <= 0) {
            this.towers.splice(index, 1);
          }
        }
      });
    },
    isInRange(tower, enemy, isEnemy) {
      const enemyRow = Math.floor(enemy / this.cols);
      const enemyCol = enemy % this.cols;
      const towerRow = Math.floor(tower.position / this.cols);
      const towerCol = tower.position % this.cols;
      if (isEnemy) {
        return Math.abs(enemyRow - towerRow) <= 1 && Math.abs(enemyCol - towerCol) <= 1;
      } else {
        return Math.abs(enemyRow - towerRow) <= tower.range && Math.abs(enemyCol - towerCol) <= tower.range;
      }
    },
    changeLevel(level) {
      if (this.enemyInterval) {
        clearInterval(this.enemyInterval);
        this.enemyInterval = null;
      }
      this.stopAllAttacks(); // все атаки перед сменой уровня нужно остановить

      this.currentLevel = level;
      this.updateEnemyPosition(this.path[0])
      this.updateEnemyHealth(100);

      this.levels[this.currentLevel].towers = [];

      this.startTowerAttacks();
      this.moveEnemy();
    },
    deleteTower(index) {
      if (this.gameOver || this.enemyDefeated) return; // удаление башни после окончания игры запрещено

      const towerIndex = this.towers.findIndex(tower => tower.position === index);

      if (towerIndex !== -1) {

        const refundAmount = Math.floor((this.towerCost + (this.towers.at(towerIndex).grade - 1) * this.upgradeCost) * this.sellRefund);

        this.updateCoins(-refundAmount);

        this.showMessage("Башня продана! +" + refundAmount + " монет");

        this.$delete(this.towers, towerIndex);
      }

      this.startTowerAttacks();
    },
    showMessage(text) {
      this.message = text;
      clearTimeout(this.messageTimeout);
      this.messageTimeout = setTimeout(() => {
        this.message = ""; // сообщение через 2 секунды скроем
      }, 2000);
    },
    setInitialLevel(levels) {
      this.levels = levels;
    },
  },
  created() {
    this.changeLevel(0);
  },


  mounted() {
    this.startTowerAttacks();
    this.moveEnemy();
  },

};
</script>

<style>

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-template-rows: repeat(10, 40px);
  gap: 2px;
  background-color: #444;
  padding: 5px;
}

.cell {
  width: 40px;
  height: 40px;
  background-color: #258e0a;
  border: 1px solid #555;
  position: relative;
}

.road {
  background-color: #c4a642;
}

.cell.can-place-tower {
  background-color: #40c61e;
  cursor: pointer;
}

.status-bar h3 {
  margin: 0;
  font-size: 18px;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>