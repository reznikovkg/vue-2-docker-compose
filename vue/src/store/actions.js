const towers = (state) => state.levels[state.currentLevel].towers;
export default {
    stopTowerAttacks({commit}) {
        commit("stopTowerAttacks")
    },
    updateCoins({commit}, amount) {
        commit("setCoins", amount)
    },
    changeCurrentLevel({commit}, level) {
        commit("setCurrentLevel", level)
    },
    setGameOver({commit}, value) {
        commit("setGameOver", value)
    },
    setEnemyDefeated({commit}, value) {
        commit("setEnemyDefeated", value)
    },
    setEnemyPosition({commit}, position) {
        commit("setEnemyPosition", position)
    },
    setEnemyHealth({commit}, health) {
        commit("setEnemyHealth", health)
    },
    pushTower({commit}, index) {
        commit("pushTower", index)
    },
    startEnemyAttacks({ state, commit, dispatch }) {
        dispatch("stopEnemyAttacks")
        const interval = setInterval(() => {
            if (state.enemyHealth > 0 && !state.gameOver) {
                dispatch("enemyAttack")
            } else {
                dispatch("stopEnemyAttacks")
            }
        }, 200)
        commit("setEnemyAttackInterval", interval)
    },
    stopEnemyAttacks({ commit }) {
        commit("clearEnemyAttackInterval")
    },
    enemyAttack({ state, commit }) {
        towers(state).forEach((tower, index) => {
            const enemyRow = Math.floor(state.enemyPosition / 10)
            const enemyCol = state.enemyPosition % 10
            const towerRow = Math.floor(tower.position / 10)
            const towerCol = tower.position % 10
            const isInRange = Math.abs(enemyRow - towerRow) <= 1 && Math.abs(enemyCol - towerCol) <= 1
            if (isInRange) {
                commit("damageTower", index)
            }
        })
    },
    moveEnemy({ state, commit, dispatch }) {
        let step = 0
        commit("setEnemyHealth", 100)
        commit("setEnemyDefeated", false)
        commit("setGameOver", false)
        const interval = setInterval(() => {
            if (step < state.levels[state.currentLevel].path.length) {
                commit("setEnemyPosition", state.levels[state.currentLevel].path[step])
                step++
            } else {
                commit("setGameOver", true)
                dispatch("stopEnemyAttacks")
            }
        }, 700)
        commit("setEnemyInterval", interval)
        dispatch("startEnemyAttacks")
    },
    showMessage({ commit }, text) {
        commit("setMessage", text)
    },
    startTowerAttacks({ state, commit, dispatch }) {
        dispatch('stopTowerAttacks')
        towers(state).forEach((tower) => {
            let attackSpeed = 1000 / tower.fireRate
            let attackInterval = setInterval(() => {
                const enemyRow = Math.floor(state.enemyPosition / state.cols)
                const enemyCol = state.enemyPosition % state.cols
                const towerRow = Math.floor(tower.position / state.cols)
                const towerCol = tower.position % state.cols
                const inDistance = Math.abs(enemyRow - towerRow) <= tower.range && Math.abs(enemyCol - towerCol) <= tower.range
                if (state.enemyHealth > 0 && !state.gameOver && inDistance) {
                    commit('setEnemyHealth', state.enemyHealth - tower.damage)
                    if (state.enemyHealth <= 0) {
                        clearInterval(state.enemyInterval)
                        commit('setEnemyInterval', null)
                        commit('setEnemyPosition', -1)
                        commit('setEnemyDefeated', true)
                        commit('setCoins', 150)
                        dispatch('stopTowerAttacks')
                        dispatch('stopEnemyAttacks')
                    }
                }
            }, attackSpeed)
            state.attackIntervals.push(attackInterval)
        })
    },
    placeTower({ state, commit, getters, dispatch }, index) {
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
    upgradeTower({ state, commit, dispatch }, index) {
        let tower = towers(state).find(t => t.position === index)
        if (tower) {
            if (state.coins >= state.upgradeCost) {
                commit("updateCoins", -state.upgradeCost)
                if (tower.grade < 6) {
                    commit("upgradeTowerStats", tower)
                    dispatch("startTowerAttacks") // Перезапуск атак башен
                    dispatch("showMessage", `Башня улучшена до уровня: ${tower.grade}`)
                } else {
                    dispatch("showMessage", "❌ Больше уровней не предусмотрено")
                }
            } else {
                dispatch("showMessage", "❌ Недостаточно монет для прокачки")
            }
        }
    },
    deleteTower({ state, commit, dispatch }, index) {
        if (state.gameOver || state.enemyDefeated) return
        const towers = towers(state)
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
    changeLevel({ state, commit, dispatch }, level) {
        if (state.enemyInterval) {
            clearInterval(state.enemyInterval)
            commit('setEnemyInterval', null)
        }
        dispatch('stopAllAttacks')
        commit('setCurrentLevel', level)
        commit('setEnemyPosition', state.levels[level].path[0])
        commit('setEnemyHealth', 100)
        commit('clearTowers')
        dispatch('startTowerAttacks')
        dispatch('moveEnemy')
    },
}