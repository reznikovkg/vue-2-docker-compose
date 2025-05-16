export default {
    coins: (state) => state.coins,
    currentLevel: (state) => state.currentLevel,
    levels: (state) => state.levels,
    gameOver: (state) => state.gameOver,
    enemyDefeated: (state) => state.enemyDefeated,
    enemyHealth: (state) => state.enemyHealth,
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
    projectiles: (state) => state.projectiles,
    enemies: (state) => state.enemies,
    defenders: (state) => state.defenders,
    unlockedLevels: (state) => state.unlockedLevels,
    isCellBlockedByDefender: (state) => (index, currentDefenderId = null) => {
        const blockedByEnemy = state.enemies.some(
            enemy => !enemy.isDead && enemy.index === index
        )
        const blockedByDefender = state.defenders.some(
            defender =>
                !defender.isDead &&
                defender.index === index &&
                defender.id !== currentDefenderId
        )
        return blockedByEnemy || blockedByDefender
    }
}