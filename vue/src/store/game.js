const towers = (state) => state.levels[state.currentLevel].towers;
import {
    cols,
    cell_size,
    startHealth,
    startDamage,
    startFireRate,
    startRange,
    healthIncrease,
    damageIncrease,
    fireRateIncrease,
    rangeIncrease,
    towerCost,
    upgradeCost,
    defenderCost,
    sellRefund,
    levels,
    enemyTypes,
    startDefenderHealth,
    defenderAttackInterval,
    defenderSpeedInterval
} from './consts.js'

export default {
    namespaced: true,
    state: {
        cols,
        cell_size,
        startHealth,
        startDamage,
        startFireRate,
        startRange,
        healthIncrease,
        damageIncrease,
        fireRateIncrease,
        rangeIncrease,
        towerCost,
        upgradeCost,
        defenderCost,
        sellRefund,
        levels,
        enemyTypes,
        startDefenderHealth,
        defenderAttackInterval,
        defenderSpeedInterval,
        gameOver: false,
        enemyDefeated: false,
        coins: 1000,
        currentLevel: 0,
        attackIntervals: [],
        message: "",
        towerRange: 1,
        hoveredTowerIndex: null,
        projectiles: [],
        enemies: [], // список врагов
        enemyIntervals: [],
        defenders: [],
        unlockedLevels: [0],
        spawnWaveId: 0,
    },
    getters: {
        coins: (state) => state.coins,
        currentLevel: (state) => state.currentLevel,
        levels: (state) => state.levels,
        gameOver: (state) => state.gameOver,
        enemyDefeated: (state) => state.enemyDefeated,
        message: (state) => state.message,
        towers: (state) => state.levels[state.currentLevel].towers,
        buildableCells: (state) => state.levels[state.currentLevel].buildableCells,
        path: (state) => state.levels[state.currentLevel].path,
        canPlaceTower: (state) => (index) => {
            return state
                .levels[state.currentLevel]
                .buildableCells.includes(index) && !state
                .levels[state.currentLevel]
                .towers
                .some(tower => tower.position === index)
        },
        inRangeIndices: (state) => {
            if (state.hoveredTowerIndex === null)
                return []
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
            const blockedByEnemy = state
                .enemies
                .some(
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
    },
    mutations: {
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
                tower.range += state.rangeIncrease
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
        addProjectile(state, projectile) {
            state.projectiles.push(projectile)
        },
        removeProjectile(state, index) {
            state.projectiles.splice(index, 1)
        },
        removeProjectileById(state, id) {
            state.projectiles = state.projectiles.filter(p => p.id !== id)
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
        setDefenders(state, defenders) {
            state.defenders = defenders
        },
        addDefender(state, defender) {
            state.defenders.push(defender)
        },
        updateDefender(state, updated) {
            const index = state.defenders.findIndex(d => d.id === updated.id)
            if (index !== -1) {
                state.defenders[index] = { ...state.defenders[index], ...updated }
            }
        },
        damageDefender(state, { id }) {
            const defender = state.defenders.find(d => d.id === id)
            if (defender) {
                defender.health = Math.max(0, defender.health - 1)
                if (defender.health === 0) {
                    defender.isDead = true
                }
            }
        },
        removeDefender(state, id) {
            state.defenders = state.defenders.filter(d => d.id !== id)
        },
        unlockLevel(state, levelIndex) {
            if (!state.unlockedLevels.includes(levelIndex)) {
                state.unlockedLevels.push(levelIndex)
            }
        },
        setSpawnWaveId(state, id) {
            state.spawnWaveId = id
        },
    },
    actions: {
        showMessage: ({ commit }, text) => {
            commit("setMessage", text)
        },
        stopTowerAttacks: ({ state, commit }) => {
            state.attackIntervals.forEach(interval => clearInterval(interval))
            commit("clearAttackIntervals")
        },
        startTowerAttacks: ({ state, dispatch, commit }) => {
            dispatch("stopTowerAttacks")
            const attackIntervals = []
            towers(state).forEach(tower => {
                dispatch("startTowerAttack", tower).then(interval => {
                    attackIntervals.push(interval)
                })
            })
            commit("setAttackIntervals", attackIntervals)
        },
        startTowerAttack: ({ state, dispatch }, tower) => {
            return new Promise(resolve => {
                const attackSpeed = 1000 / tower.fireRate
                const cols = state.cols
                const interval = setInterval(() => {
                    if (tower.health <= 0 || state.gameOver || state.enemyDefeated)
                        return
                    const towerRow = Math.floor(tower.position / cols)
                    const towerCol = tower.position % cols
                    const enemiesInRange = state.enemies.filter(enemy => {
                        if (enemy.health <= 0 || enemy.isDead)
                            return false
                        const enemyRow = Math.floor(enemy.index / cols)
                        const enemyCol = enemy.index % cols
                        return (
                            Math.abs(enemyRow - towerRow) <= tower.range &&
                            Math.abs(enemyCol - towerCol) <= tower.range
                        )
                    })
                    if (enemiesInRange.length === 0)
                        return
                    const target = enemiesInRange[0]
                    dispatch("handleTowerShot", { tower, target })
                }, attackSpeed)
                resolve(interval)
            })
        },
        handleTowerShot: ({ state, commit, dispatch }, { tower, target }) => {
            const cols = state.cols
            const cellSize = state.cell_size
            const updatedHealth = Math.max(0, target.health - tower.damage)
            commit("updateEnemy", {
                id: target.id,
                updates: { health: updatedHealth },
            })
            const allDead = state.enemies.every(e => e.health <= 0 || e.isDead)
            if (allDead && state.enemies.length > 0) {
                commit('setEnemyDefeated', true)
                commit('setCoins', 150)
                dispatch('stopTowerAttacks')
                const nextLevel = state.currentLevel + 1
                if (!state.unlockedLevels.includes(nextLevel) && nextLevel < state.levels.length) {
                    commit("unlockLevel", nextLevel)
                }
            }
            const towerCol = tower.position % cols
            const towerRow = Math.floor(tower.position / cols)
            const startX = towerCol * cellSize + cellSize / 2
            const startY = towerRow * cellSize + cellSize / 2
            const endX = target.pixel.x + cellSize / 2
            const endY = target.pixel.y + cellSize / 2
            const projectile = {
                id: Math.random(),
                startX,
                startY,
                endX,
                endY,
                currentX: startX,
                currentY: startY,
            }
            commit("addProjectile", projectile)
            setTimeout(() => {
                const idx = state.projectiles.findIndex(p => p.id === projectile.id)
                if (idx !== -1) {
                    commit("removeProjectile", idx)
                }
            }, 1000 / tower.fireRate)
        },
        placeTower: ({ state, commit, getters, dispatch }, index) => {
            if (state.gameOver || state.enemyDefeated)
                return
            if (!getters.canPlaceTower(index))
                return
            if (state.coins >= state.towerCost) {
                commit("setCoins", -state.towerCost)
                commit("pushTower", index)
                dispatch("startTowerAttacks")
                dispatch("showMessage", "Башня установлена")
            } else {
                dispatch("showMessage", "❌ Недостаточно монет для новой башни!")
            }
        },
        upgradeTower: ({ state, commit, dispatch }, index) => {
            let tower = towers(state).find(t => t.position === index)
            if (tower) {
                if (state.coins >= state.upgradeCost) {
                    commit("updateCoins", - state.upgradeCost)
                    if (tower.grade < 6) {
                        commit("upgradeTowerStats", tower)
                        dispatch("startTowerAttacks")
                        dispatch("showMessage", `Башня улучшена до уровня: ${tower.grade}`)
                    } else {
                        dispatch("showMessage", "❌ Больше уровней не предусмотрено")
                    }
                } else {
                    dispatch("showMessage", "❌ Недостаточно монет для прокачки")
                }
            }
        },
        deleteTower: ({ state, commit, dispatch }, index) => {
            if (state.gameOver || state.enemyDefeated)
                return
            const towers = state.levels[state.currentLevel].towers
            const towerIndex = towers.findIndex(tower => tower.position === index)
            if (towerIndex !== -1) {
                const tower = towers[towerIndex]
                const refundAmount = Math.floor((
                    state.towerCost + (tower.grade - 1) * state.upgradeCost) * state.sellRefund)
                commit('setCoins', refundAmount)
                dispatch('showMessage', `💰 Башня продана! +${refundAmount} монет`)
                commit('removeTower', towerIndex)
            }
            dispatch('startTowerAttacks')
        },
        changeLevel: ({ state, commit, dispatch }, level) => {
            if (state.enemyInterval) {
                clearInterval(state.enemyInterval)
                commit('setEnemyInterval', null)
            }
            commit('setDefenders', [])
            commit('clearEnemies')
            dispatch('stopTowerAttacks')
            commit('setCurrentLevel', level)
            commit('clearTowers')
            dispatch('startTowerAttacks')
            dispatch('spawnEnemies')
        },
        setHoveredTowerData({ commit }, { index, tower }) {
            commit('setHoveredTowerIndex', index)
            commit('setHoveredRadius', tower.range)
        },
        handleCellHoverLeave({ commit }) {
            commit('clearHoveredTowerIndex')
        },
        spawnEnemies: ({ commit, state, dispatch }) => {
            commit("clearEnemies")
            commit("setEnemyDefeated", false)
            commit("setGameOver", false)
            const spawnId = Math.random()
            commit("setSpawnWaveId", spawnId)
            const enemies_amount = 5
            const path = state.levels[state.currentLevel].path
            const cellSize = state.cell_size
            const types = state.enemyTypes
            const enemyIntervals = []
            for (let i = 0; i < enemies_amount; i++) {
                setTimeout(() => {
                    if (state.spawnWaveId !== spawnId)
                        return
                    const id = Math.random() + i
                    const index = path[0]
                    const pixel = {
                        x: (index % state.cols) * cellSize + 5,
                        y: Math.floor(index / state.cols) * cellSize + 5,
                    }
                    const enemyType = types[Math.floor(Math.random() * types.length)]
                    const enemy = {
                        id,
                        index,
                        pixel,
                        health: enemyType.health,
                        pathStep: 0,
                        isDead: false,
                        type: enemyType.type,
                        speed: enemyType.speed,
                        attackInterval: enemyType.attackInterval,
                    }
                    commit("addEnemy", enemy)
                    dispatch("startEnemyMovement", { id, speed: enemy.speed }).then(interval => {
                        enemyIntervals.push(interval)
                    })
                    dispatch("startEnemyAttack", { id, interval: enemy.attackInterval }).then(interval => {
                        enemyIntervals.push(interval)
                    })
                }, i * 700)
            }
            setTimeout(() => {
                if (state.spawnWaveId === spawnId) {
                    commit("setEnemyIntervals", enemyIntervals)
                }
            }, enemies_amount * 1000)
        },
        startEnemyMovement: ({ state, commit }, { id, speed }) => {
            return new Promise((resolve) => {
                const path = state.levels[state.currentLevel].path
                const cellSize = state.cell_size
                const interval = setInterval(() => {
                    const enemy = state.enemies.find(e => e.id === id)
                    if (!enemy || enemy.isDead || enemy.health <= 0) {
                        if (enemy && !enemy.isDead) {
                            commit("markEnemyAsDead", id)
                            setTimeout(() => commit("removeEnemy", id), 400)
                        }
                        clearInterval(interval)
                        return
                    }
                    const nextStep = enemy.pathStep + 1
                    if (nextStep >= path.length) {
                        commit("setGameOver", true)
                        clearInterval(interval)
                        return
                    }
                    const nextIndex = path[nextStep]
                    const blockingDefender = state.defenders.find(
                        defender => !defender.isDead && defender.index === nextIndex
                    )
                    if (blockingDefender)
                        return
                    const row = Math.floor(nextIndex / state.cols)
                    const col = nextIndex % state.cols
                    commit("updateEnemy", {
                        id,
                        updates: {
                            index: nextIndex,
                            pathStep: nextStep,
                            pixel: {
                                x: col * cellSize + 5,
                                y: row * cellSize + 5,
                            },
                        },
                    })
                }, speed)
                resolve(interval)
            })
        },
        startEnemyAttack: ({ state, dispatch }, { id, interval }) => {
            return new Promise((resolve) => {
                const attackInterval = setInterval(() => {
                    if (state.gameOver) {
                        clearInterval(attackInterval)
                        return
                    }
                    const enemy = state.enemies.find(e => e.id === id)
                    if (!enemy || enemy.isDead || enemy.health <= 0) {
                        clearInterval(attackInterval)
                        return
                    }
                    dispatch("attackTowersInRange", enemy)
                    dispatch("attackDefendersInRange", enemy)
                }, interval)
                resolve(attackInterval)
            })
        },
        attackTowersInRange: ({ state, commit }, enemy) => {
            const enemyRow = Math.floor(enemy.index / state.cols)
            const enemyCol = enemy.index % state.cols
            const nearbyTowers = towers(state).filter(t => {
                const row = Math.floor(t.position / state.cols)
                const col = t.position % state.cols
                return (
                    Math.abs(row - enemyRow) <= 1 &&
                    Math.abs(col - enemyCol) <= 1
                )
            })
            nearbyTowers.forEach(t => {
                const index = towers(state).findIndex(x => x.position === t.position)
                commit("damageTower", index)
                if (t.health <= 0) {
                    setTimeout(() => {
                        commit("removeTower", index)
                    }, 400)
                }
            })
        },
        attackDefendersInRange: ({ state, commit }, enemy) => {
            const enemyRow = Math.floor(enemy.index / state.cols)
            const enemyCol = enemy.index % state.cols
            const defenders = state.defenders.filter(d => {
                if (d.isDead || d.health <= 0)
                    return false
                const row = Math.floor(d.index / state.cols)
                const col = d.index % state.cols
                return (
                    Math.abs(row - enemyRow) <= 1 &&
                    Math.abs(col - enemyCol) <= 1
                )
            })
            defenders.forEach(def => {
                commit("damageDefender", { id: def.id })
                if (def.health <= 0) {
                    setTimeout(() => {
                        commit("removeDefender", def.id)
                    }, 400)
                }
            })
        },
        spawnDefender: ({ state, commit, dispatch }) => {
            if (state.coins < state.defenderCost) {
                dispatch("showMessage", "❌ Недостаточно монет для бойца")
                return
            }
            commit("updateCoins", -state.defenderCost)
            dispatch("showMessage", `Вызван боец за ${state.defenderCost} монет`)
            const path = [...state.levels[state.currentLevel].path].reverse()
            const cellSize = state.cell_size
            const id = Math.random()
            const startStep = 0
            const index = path[startStep]
            const row = Math.floor(index / state.cols)
            const col = index % state.cols
            const defender = {
                id,
                pathStep: startStep,
                index,
                pixel: {
                    x: col * cellSize + 5,
                    y: row * cellSize + 5
                },
                isDead: false,
                health: state.startDefenderHealth,
            }
            commit("addDefender", defender)
            const interval = setInterval(() => {
                const current = state.defenders.find(d => d.id === id)
                if (!current || current.isDead || state.gameOver) {
                    clearInterval(interval)
                    return
                }
                dispatch("moveDefenderStep", id)
            }, state.defenderSpeedInterval)
            dispatch("startDefenderAttack", id)
        },
        moveDefenderStep: ({ state, commit, getters }, defenderId) => {
            const path = [...state.levels[state.currentLevel].path].reverse()
            const cellSize = state.cell_size
            const defender = state.defenders.find(d => d.id === defenderId)
            if (!defender || defender.isDead || state.gameOver)
                return
            const nextStep = defender.pathStep + 1
            if (nextStep >= path.length)
                return
            const newIndex = path[nextStep]
            if (getters.isCellBlockedByDefender(newIndex, defenderId))
                return
            const row = Math.floor(newIndex / state.cols)
            const col = newIndex % state.cols
            commit("updateDefender", {
                id: defenderId,
                pathStep: nextStep,
                index: newIndex,
                pixel: {
                    x: col * cellSize + 5,
                    y: row * cellSize + 5
                }
            })
        },
        getEnemiesInRangeOfDefender: ({ state }, defender) => {
            const defenderRow = Math.floor(defender.index / state.cols)
            const defenderCol = defender.index % state.cols
            return state.enemies.filter(enemy => {
                if (enemy.health <= 0 || enemy.isDead)
                    return false
                const row = Math.floor(enemy.index / state.cols)
                const col = enemy.index % state.cols
                return (
                    Math.abs(row - defenderRow) <= 1 &&
                    Math.abs(col - defenderCol) <= 1
                )
            })
        },
        startDefenderAttack: ({ state, commit, dispatch }, id) => {
            const interval = setInterval(() => {
                const defender = state.defenders.find(d => d.id === id)
                if (!defender || defender.isDead || state.gameOver) {
                    clearInterval(interval)
                    return
                }
                const enemiesInRange = dispatch("getEnemiesInRangeOfDefender", defender)
                enemiesInRange.then(enemies => {
                    if (enemies.length === 0)
                        return
                    const target = enemies[0]
                    const updatedHealth = Math.max(0, target.health - 1)
                    commit("updateEnemy", {
                        id: target.id,
                        updates: { health: updatedHealth }
                    })
                    const allDead = state.enemies.every(e => e.health <= 0 || e.isDead)
                    if (allDead && state.enemies.length > 0) {
                        commit('setEnemyDefeated', true)
                        commit('setCoins', 150)
                        dispatch('stopTowerAttacks')
                        const nextLevel = state.currentLevel + 1
                        if (!state.unlockedLevels.includes(nextLevel) && nextLevel < state.levels.length) {
                            commit("unlockLevel", nextLevel)
                        }
                    }
                    dispatch("createDefenderProjectile", { defender, target })
                    if (updatedHealth <= 0) {
                        commit("markEnemyAsDead", target.id)
                        setTimeout(() => commit("removeEnemy", target.id), 400)
                    }
                })
            }, state.defenderAttackInterval)
        },
        createDefenderProjectile: ({ state, commit }, { defender, target }) => {
            const cellSize = state.cell_size
            const projectile = {
                id: Math.random(),
                startX: defender.pixel.x + cellSize / 2,
                startY: defender.pixel.y + cellSize / 2,
                endX: target.pixel.x + cellSize / 2,
                endY: target.pixel.y + cellSize / 2,
                currentX: defender.pixel.x,
                currentY: defender.pixel.y,
                isFromDefender: true,
            }
            commit("addProjectile", projectile)
            setTimeout(() => {
                commit("removeProjectileById", projectile.id)
            }, 300)
        },
    }
}