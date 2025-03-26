export default {
    coins: (state) => state.coins,
    currentLevel: (state) => state.currentLevel,
    levels: (state) => state.levels,
    gameOver: (state) => state.gameOver,
    enemyDefeated: (state) => state.enemyDefeated,
    towerCost:(state) => state.towerCost,
    upgradeCost: (state) => state.upgradeCost,
    sellRefund: (state) => state.sellRefund,
    enemyPosition: (state) => state.enemyPosition,
    enemyHealth: (state) => state.enemyHealth,
    attackIntervals: (state) => state.attackIntervals,
    healthIncrease: (state) => state.healthIncrease,
    damageIncrease: (state) => state.damageIncrease,
    fireRateIncrease: (state) => state.fireRateIncrease,
    rangeIncrease: (state) => state.rangeIncrease,
    enemyAttackInterval: (state) => state.enemyAttackInterval,
    enemyInterval: (state) => state.enemyInterval,
    message: (state) => state.message,
    towers: (state) => state.levels[state.currentLevel].towers,
    buildableCells: (state) => state.levels[state.currentLevel].buildableCells,
    path: (state) => state.levels[state.currentLevel].path,
    canPlaceTower: (state) => (index) => {
        return state.levels[state.currentLevel].buildableCells.includes(index) &&
            !state.levels[state.currentLevel].towers.some(tower => tower.position === index)
    },
}