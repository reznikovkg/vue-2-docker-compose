export const cols = 10
export const cell_size = 41.6
export const startHealth = 10
export const startDamage = 1
export const startFireRate = 5
export const startRange = 1
export const healthIncrease = 20
export const damageIncrease = 2
export const fireRateIncrease = 1
export const rangeIncrease = 1
export const towerCost = 40
export const upgradeCost = 10
export const defenderCost = 20
export const sellRefund = 0.8
export const levels = [
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
]
export const enemyTypes = [
    { type: 'slow', speed: 800, health: 150, attackInterval: 400},
    { type: 'normal', speed: 600, health: 100, attackInterval: 300 },
    { type: 'fast', speed: 450, health: 60, attackInterval: 200 }
]
export const startDefenderHealth = 50
export const defenderSpeedInterval = 500
export const defenderAttackInterval = 100