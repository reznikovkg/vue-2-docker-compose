const towers = (state) => state.levels[state.currentLevel].towers
export default {
    setCoins: (state, amount) => {
        state.coins += amount
    },
    setCurrentLevel: (state, level) => {
        state.currentLevel = level
    },
    setGameOver: (state, value) => {
        state.gameOver = value
    },
    setEnemyDefeated: (state, value) => {
        state.enemyDefeated = value
    },
    setEnemyPosition: (state, position) => {
        state.enemyPosition = position
    },
    setEnemyHealth: (state, health) => {
        state.enemyHealth = health
    },
    pushTower: (state, index) => {
        towers(state).push({
            position: index,
            health: state.startHealth,
            damage: state.startDamage,
            fireRate: state.startFireRate,
            range: state.startRange,
            grade: 1
        })
    },
    stopTowerAttacks: (state) => {
        state.attackIntervals.forEach(interval => clearInterval(interval))
        state.attackIntervals = []
    },
    setEnemyAttackInterval: (state, interval) => {
        state.enemyAttackInterval = interval
    },
    damageTower: (state, index) => {
        if (towers(state)[index]) {
            towers(state)[index].health -= 1
            if (towers(state)[index].health <= 0) {
                towers(state).splice(index, 1)
            }
        }
    },
    setEnemyInterval: (state, interval) => {
        state.enemyInterval = interval
    },
    clearEnemyInterval: (state) => {
        if (state.enemyInterval) {
            clearInterval(state.enemyInterval)
            state.enemyInterval = null
        }
    },
    setMessage: (state, text) => {
        state.message = text
        setTimeout(() => {
            state.message = ""
        }, 2000)
    },
    updateCoins: (state, amount) => {
        state.coins += amount
    },
    removeTower: (state, index) => {
        towers(state).splice(index, 1) // Удаляем башню
    },
    upgradeTowerStats: (state, tower) => {
        tower.health += state.healthIncrease
        if (tower.grade >= 2) {
            tower.damage += state.damageIncrease
        }
        if (tower.grade >= 3) {
            tower.fireRate += state.fireRateIncrease
        }
        if (tower.grade >= 4) {
            tower.range += state.rangeIncrease;
        }
        tower.range = Math.floor(tower.grade / 2) + 1
        tower.grade += 1
    },
    clearTowers: (state) => {
        state.levels[state.currentLevel].towers = []
    },
    setHoveredRadius(state, range) {
        state.towerRange = range
    },
    setHoveredTowerIndex(state, index) {
        state.hoveredTowerIndex = index
    },
    clearHoveredTowerIndex(state) {
        state.hoveredTowerIndex = null
    },
    setEnemyPixelPosition(state, pos) {
        state.enemyPixelPosition = pos
    },
    addProjectile(state, projectile) {
        state.projectiles.push(projectile)
    },
    removeProjectile(state, index) {
        state.projectiles.splice(index, 1)
    },
    clearProjectiles(state) {
        state.projectiles = []
    },
    addEnemy(state, enemy) {
        state.enemies.push(enemy)
    },
    updateEnemy(state, { id, updates }) {
        const enemy = state.enemies.find(e => e.id === id)
        if (enemy) {
            Object.assign(enemy, updates)
        }
    },
    removeEnemy(state, id) {
        state.enemies = state.enemies.filter(e => e.id !== id)
    },
    clearEnemies(state) {
        state.enemies = []
    },
    markEnemyAsDead(state, id) {
        const enemy = state.enemies.find(e => e.id === id)
        if (enemy) {
            enemy.isDead = true
        }
    },
    setAttackIntervals(state, intervals) {
        state.attackIntervals = intervals
    },
    clearAttackIntervals(state) {
        state.attackIntervals = []
    },
    setEnemyIntervals(state, intervals) {
        state.enemyIntervals = intervals
    },
}