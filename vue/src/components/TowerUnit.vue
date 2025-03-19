<template>
  <div class="tower-unit">
    <div class="tower-dot" :class="'tower-grade-' + tower.grade" @click="upgradeTower">
      {{ tower.grade }}
      <button v-if="!gameOver && !enemyDefeated" class="delete-tower" @click.stop="deleteTower">❌</button>
    </div>
    <div class="tower-health">{{ tower.health }} HP</div>
  </div>
</template>

<script>
export default {
  props: {
    tower: {
      type: Object,
      required: true
    },
    towerNumber: {
      type: Number,
      required: true
    },
    gameOver: {
      type: Boolean,
      required: true
    },
    enemyDefeated: {
      type: Boolean,
      required: true
    },
    coins: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      localTower: { ...this.tower }, // Создаем локальную копию башни
      healthIncrease: 20,
      damageIncrease: 1,
      fireRateIncrease: 2,
      rangeIncrease: 1,
    }
  },
  methods: {
    upgradeTower() {
      if (this.gameOver) return; // ❌ Запрещаем улучшение после gameOver

      const upgradeCost = 10; // 💰 Стоимость улучшения
      if (this.coins < upgradeCost) {
        this.$emit("showMessage", "❌ Недостаточно монет для улучшения!");
        return;
      }

      if (this.localTower.grade < 6) {
        this.$emit("updateCoins", -upgradeCost); // Вычитаем монеты
        this.localTower.health += 20;

        if (this.localTower.grade >= 3) {
          this.localTower.damage += this.damageIncrease;
        }
        if (this.localTower.grade >= 4) {
          this.localTower.fireRate += this.fireRateIncrease;
        }
        if (this.localTower.grade >= 5) {
          this.localTower.range += this.rangeIncrease;
        }
        this.localTower.grade += 1;

        this.$emit("updateTower", this.localTower);
        this.$emit("showMessage", `Башня улучшена до уровня ${this.tower.grade}!`);
        this.$emit("updateTower", this.localTower);
      } else {
        this.$emit("showMessage", "Максимальный уровень башни!");
      }
    },

    deleteTower() {
      this.$emit("deleteTower", this.tower.position);
    },
  },
};
</script>

<style scoped>
.tower-dot {
  width: 35px;
  height: 35px;
  background-color: #000013;
  border-radius: 25%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 35px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.delete-tower {
  position: absolute;
  bottom: -7px;
  left: -8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 12px;
  padding: 1px 1px;
  border-radius: 25%;
  cursor: pointer;
}
.delete-tower:hover {
  background-color: darkred;
}

.tower-health {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 5px;
}

/* Уровень 1 */
.tower-grade-1 {
  background-color: #f48352;
}

/* Уровень 2 */
.tower-grade-2 {
  background-color: #34a878;
}

/* Уровень 3 */
.tower-grade-3 {
  background-color: #2B5A8A;
}

/* Уровень 4 */
.tower-grade-4 {
  background-color: #701717;
}

/* Уровень 5 */
.tower-grade-5 {
  background-color: #73198e;
}

/* Уровень 6 */
.tower-grade-6 {
  background-color: #ff00ec;
}
</style>