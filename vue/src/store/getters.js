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
    inRangeIndices: (state) => {
        if (state.hoveredTowerIndex === null) return []
        const result = []
        const centerIndex = state.hoveredTowerIndex
        const gridWidth = 10
        const gridHeight = 10
        const towerRange = state.towerRange
        const centerY = Math.floor(centerIndex / gridWidth)
        const centerX = centerIndex % gridWidth
        for (let dy = -towerRange; dy <= towerRange; dy++) {
            for (let dx = -towerRange; dx <= towerRange; dx++) {
                const x = centerX + dx
                const y = centerY + dy
                if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
                    result.push(y * gridWidth + x)
                }
            }
        }
        return result
    },
    enemyPixelPosition: (state) => {
        const step_size = state.cell_size
        const index = state.enemyPosition
        const row = Math.floor(index / state.cols)
        const col = index % state.cols
        return {
            x: col * step_size,
            y: row * step_size,
        }
    },
    projectiles: (state) => state.projectiles,
    enemies: (state) => state.enemies,
}