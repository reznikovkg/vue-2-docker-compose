export default {
    cols: 10,
    cell_size: 41.6,
    startHealth: 10,
    startDamage: 1,
    startFireRate: 5,
    startRange: 1,
    healthIncrease: 20,
    damageIncrease: 2,
    fireRateIncrease: 1,
    rangeIncrease: 1,
    towerCost: 40,
    upgradeCost: 10,
    defenderCost: 20,
    sellRefund: 0.8,
    gameOver: false,
    enemyDefeated: false,
    coins: 1000,
    currentLevel: 0,
    enemyHealth: 100,
    attackIntervals: [],
    levels: [
        {
            path: [10, 11, 12, 13, 14, 15, 16, 17, 18, 28, 38, 48, 58, 68, 78, 88, 87, 86, 85, 84, 83, 82, 81, 80],
            buildableCells: [2, 24, 26, 57, 64,94,96,99],
            towers: []
        },
        {
            path: [0, 10, 11, 12, 13, 14, 24, 34, 33, 32, 31, 41, 51, 61, 71, 72, 73, 74, 75, 76, 66, 56, 46, 47, 48, 58, 68, 78, 88, 98],
            buildableCells: [2, 42, 57, 82],
            towers: []
        },
        {
            path: [10, 11, 12, 13, 14, 15, 16, 17, 18, 28, 38, 48, 58, 68, 78, 88, 87, 86, 85, 84, 83, 82, 81, 71, 61, 51, 52, 53, 63, 64, 65, 66, 56, 46, 36, 35, 34, 33, 32, 31, 30],
            buildableCells: [2,24,54,55,62,94,96,99],
            towers: []
        },
        {
            path: [10,11,12,13,14,15,16,17,18,28,38,48,47,46,45,44,43,42,41,51,61,71,81,82,83,84,85,86,87,88,89],
            buildableCells: [3,19,30,37,52,72,76,90],
            towers: []
        },
        {
            path: [93,83,73,63,62,61,51,41,31,21,11,12,13,14,15,16,17,18,28,38,48,58,68,67,66,65,75,85,86,87,88,89],
            buildableCells: [22,27,52,55,76,78],
            towers: []
        }
    ],
    message: "",
    hoveredTowerIndex: null,
    towerRange: 1,
    projectiles: [],
    enemies: [], // список врагов
    enemyIntervals: [],
    enemyTypes: [
        { type: 'slow', speed: 800, health: 150, attackInterval: 400},
        { type: 'normal', speed: 600, health: 100, attackInterval: 300 },
        { type: 'fast', speed: 450, health: 60, attackInterval: 200 }
    ],
    defenders: [],
    startDefenderHealth: 50,
    defenderSpeedInterval: 500,
    defenderAttackInterval: 100,
    unlockedLevels: [0],
    spawnWaveId: 0,
}