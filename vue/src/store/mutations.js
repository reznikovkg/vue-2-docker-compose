const towers = (state) => state.levels[state.currentLevel].towers;
export default {
    setCoins: (state, amount) => {
        state.coins += amount;
    },
    setCurrentLevel: (state, level) => {
        state.currentLevel = level;
    },
    setGameOver: (state, value) => {
        state.gameOver = value;
    },
    setEnemyDefeated: (state, value) => {
        state.enemyDefeated = value;
    },
    setEnemyPosition: (state, position) => {
        state.enemyPosition = position;
    },
    setEnemyHealth: (state, health) => {
        state.enemyHealth = health;
    },
    pushTower: (state, index) => {
        towers(state).push({
            position: index,
            health: state.startHealth,
            damage: state.startDamage,
            fireRate: state.startFireRate,
            range: state.startRange,
            grade: 1
        });
    },
    stopTowerAttacks: (state) => {
        state.attackIntervals.forEach(interval => clearInterval(interval));
        state.attackIntervals = [];
    },
    setEnemyAttackInterval: (state, interval) => {
        state.enemyAttackInterval = interval;
    },
    damageTower: (state, index) => {
        if (towers(state)[index]) {
            towers(state)[index].health -= 1;
            if (towers(state)[index].health <= 0) {
                towers(state).splice(index, 1);
            }
        }
    },
    setEnemyInterval: (state, interval) => {
        state.enemyInterval = interval;
    },
    clearEnemyInterval: (state) => {
        if (state.enemyInterval) {
            clearInterval(state.enemyInterval);
            state.enemyInterval = null;
        }
    },
    setMessage: (state, text) => {
        state.message = text;
        setTimeout(() => {
            state.message = "";
        }, 2000);
    },
    updateCoins: (state, amount) => {
        state.coins += amount;
    },
    removeTower: (state, index) => {
        towers(state).splice(index, 1); // Удаляем башню
    },
    upgradeTowerStats: (state, tower) => {
        tower.health += state.healthIncrease;
        if (tower.grade >= 2) {
            tower.damage += state.damageIncrease;
        }
        if (tower.grade >= 3) {
            tower.fireRate += state.fireRateIncrease;
        }
        if (tower.grade >= 5) {
            tower.range += state.rangeIncrease;
        }
        tower.grade += 1;
    },
    clearTowers: (state) => {
        state.levels[state.currentLevel].towers = []
    },
}