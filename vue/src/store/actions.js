const towers = (state) => state.levels[state.currentLevel].towers
export default {
    updateCoins: ({commit}, amount) => {
        commit("setCoins", amount)
    },
    changeCurrentLevel: ({commit}, level) => {
        commit("setCurrentLevel", level)
    },
    setGameOver: ({commit}, value) => {
        commit("setGameOver", value)
    },
    setEnemyDefeated: ({commit}, value) => {
        commit("setEnemyDefeated", value)
    },
    setEnemyPosition: ({commit}, position) => {
        commit("setEnemyPosition", position)
    },
    setEnemyHealth: ({commit}, health) => {
        commit("setEnemyHealth", health)
    },
    pushTower: ({commit}, index) => {
        commit("pushTower", index)
    },
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
                if (tower.health <= 0 || state.gameOver || state.enemyDefeated) return
                const towerRow = Math.floor(tower.position / cols)
                const towerCol = tower.position % cols
                const enemiesInRange = state.enemies.filter(enemy => {
                    if (enemy.health <= 0 || enemy.isDead) return false
                    const enemyRow = Math.floor(enemy.index / cols)
                    const enemyCol = enemy.index % cols
                    return (
                        Math.abs(enemyRow - towerRow) <= tower.range &&
                        Math.abs(enemyCol - towerCol) <= tower.range
                    )
                })
                if (enemiesInRange.length === 0) return
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
        }
        const towerCol = tower.position % cols
        const towerRow = Math.floor(tower.position / cols)
        const startX = towerCol * cellSize + cellSize / 2
        const startY = towerRow * cellSize + cellSize / 2
        const endX = target.pixel.x
        const endY = target.pixel.y
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
        if (state.gameOver || state.enemyDefeated) return
        if (!getters.canPlaceTower(index)) return
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
                commit("updateCoins", -state.upgradeCost)
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
        if (state.gameOver || state.enemyDefeated) return
        const towers = state.levels[state.currentLevel].towers
        const towerIndex = towers.findIndex(tower => tower.position === index)
        if (towerIndex !== -1) {
            const tower = towers[towerIndex]
            const refundAmount = Math.floor((state.towerCost + (tower.grade - 1) * state.upgradeCost) * state.sellRefund)
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
        const enemies_amount = 5
        const level = state.levels[state.currentLevel]
        const path = level.path
        const cellSize = state.cell_size
        const types = state.enemyTypes
        const enemyIntervals = []
        for (let i = 0; i < enemies_amount; i++) {
            setTimeout(() => {
                const id = Date.now() + i
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
            commit("setEnemyIntervals", enemyIntervals)
        }, enemies_amount * 1000)
    },
    startEnemyMovement: ({ state, commit }, { id, speed }) => {
        return new Promise((resolve) => {
            const path = state.levels[state.currentLevel].path
            const cellSize = state.cell_size
            const interval = setInterval(() => {
                const currentEnemy = state.enemies.find(e => e.id === id)
                if (!currentEnemy || currentEnemy.isDead || currentEnemy.health <= 0) {
                    if (currentEnemy && !currentEnemy.isDead) {
                        commit("markEnemyAsDead", id)
                        setTimeout(() => commit("removeEnemy", id), 400)
                    }
                    clearInterval(interval)
                    return
                }
                const nextStep = currentEnemy.pathStep + 1
                if (nextStep >= path.length) {
                    commit("setGameOver", true)
                    clearInterval(interval)
                    return
                }
                const newIndex = path[nextStep]
                const row = Math.floor(newIndex / state.cols)
                const col = newIndex % state.cols
                commit("updateEnemy", {
                    id,
                    updates: {
                        index: newIndex,
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
    startEnemyAttack: ({ state, commit }, { id, interval }) => {
        return new Promise((resolve) => {
            const attackInterval = setInterval(() => {
                if (state.gameOver) {
                    clearInterval(attackInterval)
                    return
                }
                const currentEnemy = state.enemies.find(e => e.id === id)
                if (!currentEnemy || currentEnemy.isDead || currentEnemy.health <= 0) {
                    clearInterval(attackInterval)
                    return
                }
                const enemyRow = Math.floor(currentEnemy.index / state.cols)
                const enemyCol = currentEnemy.index % state.cols
                const towersInRange = towers(state).filter((tower) => {
                    const towerRow = Math.floor(tower.position / state.cols)
                    const towerCol = tower.position % state.cols
                    return (
                        Math.abs(towerRow - enemyRow) <= 1 &&
                        Math.abs(towerCol - enemyCol) <= 1
                    )
                })
                towersInRange.forEach((tower) => {
                    const towerIndex = towers(state).findIndex(t => t.position === tower.position)
                    commit("damageTower", towerIndex)
                })
            }, interval)
            resolve(attackInterval)
        })
    },
}