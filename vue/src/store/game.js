export default {
    namespaced: true,

    state: {
        gameWidth: 0,
        gameHeight: 0,
        player: {
            position: { x: 0, y: 0 },
            dimensions: { width: 40, height: 40 },
            speed: 5,
            moving: 0
        },
        stars: [],
        asteroids: [],
        enemies: [],
        bullets: [],
        starSize: 20,
        asteroidSize: 30,
        enemySize: 40,
        bulletSize: 8,
        enemyBulletSize: 8,
        starSpawnRate: 60,
        asteroidSpawnRate: 120,
        enemySpawnRate: 180,
        starSpawnCounter: 0,
        asteroidSpawnCounter: 0,
        enemySpawnCounter: 0,
        bulletSpeed: 10,
        enemyBulletSpeed: 5,
        enemySpeed: 2,
        score: 0,
        playerHealth: 3,
        isGameRunning: false,
        gameLoop: null,
        fireRate: 15,
        fireCounter: 0,
        enemyFireRate: {
            min: 120,
            max: 240
        }
    },

    getters: {
        getPlayer: state => ({
            position: state.player.position,
            dimensions: state.player.dimensions
        }),
        getStars: state => state.stars,
        getAsteroids: state => state.asteroids,
        getEnemies: state => state.enemies,
        getBullets: state => state.bullets,
        starSize: state => state.starSize,
        asteroidSize: state => state.asteroidSize,
        enemySize: state => state.enemySize,
        bulletSize: state => state.bulletSize,
        enemyBulletSize: state => state.enemyBulletSize,
        getScore: state => state.score,
        getPlayerHealth: state => state.playerHealth,
        isGameRunning: state => state.isGameRunning
    },

    mutations: {
        SET_GAME_DIMENSIONS(state, { width, height }) {
            state.gameWidth = width
            state.gameHeight = height
            state.player.position.y = height - state.player.dimensions.height - 60
            state.player.position.x = (width - state.player.dimensions.width) / 2
        },

        SET_PLAYER_MOVING(state, direction) {
            state.player.moving = direction
        },

        UPDATE_PLAYER_POSITION(state, { x, y }) {
            state.player.position.x = Math.max(0, Math.min(state.gameWidth - state.player.dimensions.width, x))
            if (y !== undefined) {
                state.player.position.y = y
            }
        },

        ADD_STAR(state, star) {
            state.stars.push({
                position: star.position,
                speed: star.speed
            })
        },

        ADD_ASTEROID(state, asteroid) {
            state.asteroids.push({
                position: asteroid.position,
                speed: asteroid.speed,
                health: 3
            })
        },

        ADD_ENEMY(state, enemy) {
            state.enemies.push({
                position: enemy.position,
                speed: enemy.speed,
                health: 2,
                direction: enemy.direction || 0,
                fireCounter: Math.floor(Math.random() * state.enemyFireRate.max),
                fireDelay: Math.floor(
                    state.enemyFireRate.min +
                    Math.random() * (state.enemyFireRate.max - state.enemyFireRate.min)
                )
            })
        },

        ADD_BULLET(state, bullet) {
            state.bullets.push({
                position: bullet.position,
                speed: bullet.speed,
                isEnemy: bullet.isEnemy || false
            })
        },

        UPDATE_OBJECT_POSITION(state, { type, index, x, y }) {
            const obj = state[type][index]
            if (x !== undefined) obj.position.x = x
            if (y !== undefined) obj.position.y = y
        },

        UPDATE_ENEMY_DIRECTION(state, { index, direction }) {
            state.enemies[index].direction = direction
        },

        REMOVE_OBJECT(state, { type, index }) {
            state[type].splice(index, 1)
        },

        DAMAGE_ENEMY(state, index) {
            state.enemies[index].health--
        },

        DAMAGE_ASTEROID(state, index) {
            if (state.asteroids[index]) {
                state.asteroids[index].health--
            }
        },

        DAMAGE_PLAYER(state) {
            state.playerHealth--
        },

        INCREMENT_SCORE(state, value) {
            state.score += value
        },

        SET_GAME_RUNNING(state, isRunning) {
            state.isGameRunning = isRunning
        },

        SET_GAME_LOOP(state, loopId) {
            state.gameLoop = loopId
        },

        INCREMENT_SPAWN_COUNTERS(state) {
            state.starSpawnCounter++
            state.asteroidSpawnCounter++
            state.enemySpawnCounter++
        },

        RESET_STAR_SPAWN_COUNTER(state) {
            state.starSpawnCounter = 0
        },

        RESET_ASTEROID_SPAWN_COUNTER(state) {
            state.asteroidSpawnCounter = 0
        },

        RESET_ENEMY_SPAWN_COUNTER(state) {
            state.enemySpawnCounter = 0
        },

        RESET_PLAYER_HEALTH(state) {
            state.playerHealth = 3
        },

        INCREMENT_FIRE_COUNTER(state) {
            state.fireCounter++
        },

        RESET_FIRE_COUNTER(state) {
            state.fireCounter = 0
        },

        RESET_GAME(state) {
            state.stars = []
            state.asteroids = []
            state.enemies = []
            state.bullets = []
            state.score = 0
            state.player.position.x = (state.gameWidth - state.player.dimensions.width) / 2
            state.starSpawnCounter = 0
            state.asteroidSpawnCounter = 0
            state.enemySpawnCounter = 0
            state.fireCounter = 0
            state.playerHealth = 3
            state.isGameRunning = false
            if (state.gameLoop) {
                cancelAnimationFrame(state.gameLoop)
                state.gameLoop = null
            }
        }
    },

    actions: {
        initGame({ commit, dispatch }, containerWidth) {
            commit('SET_GAME_DIMENSIONS', {
                width: containerWidth,
                height: window.innerHeight
            })
            dispatch('resetGame')
        },

        resetGame({ commit, dispatch }) {
            commit('RESET_GAME')
            commit('SET_GAME_RUNNING', true)
            commit('RESET_PLAYER_HEALTH')
            dispatch('startGameLoop')
        },

        startGameLoop({ commit, state, dispatch }) {
            if (!state.isGameRunning || state.gameLoop) return

            const checkCollision = (obj1, obj2) => {
                return (
                    obj1.position.x < obj2.position.x + obj2.dimensions.width &&
                    obj1.position.x + obj1.dimensions.width > obj2.position.x &&
                    obj1.position.y < obj2.position.y + obj2.dimensions.height &&
                    obj1.position.y + obj1.dimensions.height > obj2.position.y
                )
            }

            const gameLoop = () => {
                if (!state.isGameRunning) return

                if (state.player.moving !== 0) {
                    const newX = state.player.position.x + state.player.speed * state.player.moving
                    commit('UPDATE_PLAYER_POSITION', {
                        x: Math.max(0, Math.min(state.gameWidth - state.player.dimensions.width, newX))
                    })
                }

                commit('INCREMENT_SPAWN_COUNTERS')
                commit('INCREMENT_FIRE_COUNTER')

                if (state.starSpawnCounter >= state.starSpawnRate) {
                    commit('ADD_STAR', {
                        position: {
                            x: Math.random() * (state.gameWidth - state.starSize),
                            y: -state.starSize
                        },
                        speed: 2 + Math.random() * 3
                    })
                    commit('RESET_STAR_SPAWN_COUNTER')
                }

                if (state.asteroidSpawnCounter >= state.asteroidSpawnRate) {
                    commit('ADD_ASTEROID', {
                        position: {
                            x: Math.random() * (state.gameWidth - state.asteroidSize),
                            y: -state.asteroidSize
                        },
                        speed: 3 + Math.random() * 4
                    })
                    commit('RESET_ASTEROID_SPAWN_COUNTER')
                }

                if (state.enemySpawnCounter >= state.enemySpawnRate) {
                    commit('ADD_ENEMY', {
                        position: {
                            x: Math.random() * (state.gameWidth - state.enemySize),
                            y: -state.enemySize
                        },
                        speed: 1 + Math.random() * state.enemySpeed,
                        direction: Math.random() > 0.5 ? (Math.random() > 0.5 ? 1 : -1) : 0
                    })
                    commit('RESET_ENEMY_SPAWN_COUNTER')
                }

                for (let i = state.stars.length - 1; i >= 0; i--) {
                    const star = state.stars[i]
                    const newY = star.position.y + star.speed

                    if (checkCollision(
                        { position: state.player.position, dimensions: state.player.dimensions },
                        { position: { x: star.position.x, y: newY }, dimensions: { width: state.starSize, height: state.starSize } }
                    )) {
                        commit('INCREMENT_SCORE', 10)
                        commit('REMOVE_OBJECT', { type: 'stars', index: i })
                    } else if (newY > state.gameHeight) {
                        commit('REMOVE_OBJECT', { type: 'stars', index: i })
                    } else {
                        commit('UPDATE_OBJECT_POSITION', { type: 'stars', index: i, y: newY })
                    }
                }

                for (let i = state.asteroids.length - 1; i >= 0; i--) {
                    const asteroid = state.asteroids[i]
                    const newY = asteroid.position.y + asteroid.speed

                    if (checkCollision(
                        { position: state.player.position, dimensions: state.player.dimensions },
                        { position: { x: asteroid.position.x, y: newY }, dimensions: { width: state.asteroidSize, height: state.asteroidSize } }
                    )) {
                        commit('DAMAGE_PLAYER')
                        if (state.playerHealth <= 0) {
                            commit('SET_GAME_RUNNING', false)
                            cancelAnimationFrame(state.gameLoop)
                            commit('SET_GAME_LOOP', null)
                            dispatch('gameOver')
                            return
                        } else {
                            commit('REMOVE_OBJECT', { type: 'asteroids', index: i })
                        }
                    } else if (newY > state.gameHeight) {
                        commit('REMOVE_OBJECT', { type: 'asteroids', index: i })
                    } else {
                        commit('UPDATE_OBJECT_POSITION', { type: 'asteroids', index: i, y: newY })
                    }
                }

                for (let i = state.enemies.length - 1; i >= 0; i--) {
                    const enemy = state.enemies[i]
                    let newX = enemy.position.x
                    let newY = enemy.position.y + enemy.speed

                    enemy.fireCounter++

                    if (enemy.fireCounter >= enemy.fireDelay) {
                        dispatch('fireBullet', {
                            isEnemy: true,
                            position: {
                                x: enemy.position.x + state.enemySize / 2 - state.enemyBulletSize / 2,
                                y: enemy.position.y + state.enemySize
                            }
                        })
                        enemy.fireCounter = 0
                        enemy.fireDelay = Math.floor(
                            state.enemyFireRate.min +
                            Math.random() * (state.enemyFireRate.max - state.enemyFireRate.min)
                        )
                    }

                    if (enemy.direction !== 0) {
                        newX = enemy.position.x + enemy.speed * enemy.direction
                        if (newX <= 0 || newX >= state.gameWidth - state.enemySize) {
                            commit('UPDATE_ENEMY_DIRECTION', { index: i, direction: -enemy.direction })
                        }
                    }

                    if (checkCollision(
                        { position: state.player.position, dimensions: state.player.dimensions },
                        { position: { x: newX, y: newY }, dimensions: { width: state.enemySize, height: state.enemySize } }
                    )) {
                        commit('DAMAGE_PLAYER')
                        commit('REMOVE_OBJECT', { type: 'enemies', index: i })
                        if (state.playerHealth <= 0) {
                            commit('SET_GAME_RUNNING', false)
                            cancelAnimationFrame(state.gameLoop)
                            commit('SET_GAME_LOOP', null)
                            dispatch('gameOver')
                            return
                        }
                    } else if (newY > state.gameHeight) {
                        commit('REMOVE_OBJECT', { type: 'enemies', index: i })
                    } else {
                        commit('UPDATE_OBJECT_POSITION', { type: 'enemies', index: i, x: newX, y: newY })
                    }
                }

                for (let i = state.bullets.length - 1; i >= 0; i--) {
                    const bullet = state.bullets[i]
                    const bulletSize = bullet.isEnemy ? state.enemyBulletSize : state.bulletSize
                    const newY = bullet.position.y + bullet.speed

                    if (bullet.isEnemy) {
                        if (checkCollision(
                            { position: { x: bullet.position.x, y: newY }, dimensions: { width: bulletSize, height: bulletSize } },
                            { position: state.player.position, dimensions: state.player.dimensions }
                        )) {
                            commit('DAMAGE_PLAYER')
                            commit('REMOVE_OBJECT', { type: 'bullets', index: i })
                            if (state.playerHealth <= 0) {
                                commit('SET_GAME_RUNNING', false)
                                cancelAnimationFrame(state.gameLoop)
                                commit('SET_GAME_LOOP', null)
                                dispatch('gameOver')
                                return
                            }
                            continue
                        }
                    } else {
                        let bulletHit = false

                        for (let j = state.enemies.length - 1; j >= 0; j--) {
                            const enemy = state.enemies[j]
                            if (checkCollision(
                                { position: { x: bullet.position.x, y: newY }, dimensions: { width: bulletSize, height: bulletSize } },
                                { position: enemy.position, dimensions: { width: state.enemySize, height: state.enemySize } }
                            )) {
                                commit('DAMAGE_ENEMY', j)
                                if (state.enemies[j].health <= 0) {
                                    commit('INCREMENT_SCORE', 20)
                                    commit('REMOVE_OBJECT', { type: 'enemies', index: j })
                                }
                                bulletHit = true
                                break
                            }
                        }

                        if (!bulletHit) {
                            for (let j = state.asteroids.length - 1; j >= 0; j--) {
                                const asteroid = state.asteroids[j]
                                if (checkCollision(
                                    { position: { x: bullet.position.x, y: newY }, dimensions: { width: bulletSize, height: bulletSize } },
                                    { position: asteroid.position, dimensions: { width: state.asteroidSize, height: state.asteroidSize } }
                                )) {
                                    commit('DAMAGE_ASTEROID', j)
                                    if (state.asteroids[j].health <= 0) {
                                        commit('INCREMENT_SCORE', 15)
                                        commit('REMOVE_OBJECT', { type: 'asteroids', index: j })
                                    }
                                    bulletHit = true
                                    break
                                }
                            }
                        }

                        if (bulletHit) {
                            commit('REMOVE_OBJECT', { type: 'bullets', index: i })
                            continue
                        }
                    }

                    if (newY < 0 || newY > state.gameHeight) {
                        commit('REMOVE_OBJECT', { type: 'bullets', index: i })
                    } else {
                        commit('UPDATE_OBJECT_POSITION', { type: 'bullets', index: i, y: newY })
                    }
                }

                commit('SET_GAME_LOOP', requestAnimationFrame(gameLoop))
            }

            commit('SET_GAME_LOOP', requestAnimationFrame(gameLoop))
        },

        stopGame({ commit, state }) {
            commit('SET_GAME_RUNNING', false)
            if (state.gameLoop) {
                cancelAnimationFrame(state.gameLoop)
                commit('SET_GAME_LOOP', null)
            }
        },

        fireBullet({ commit, state }, { isEnemy = false, position }) {
            if (isEnemy || state.fireCounter >= state.fireRate) {
                commit('ADD_BULLET', {
                    position,
                    speed: isEnemy ? state.enemyBulletSpeed : -state.bulletSpeed,
                    isEnemy
                })
                if (!isEnemy) {
                    commit('RESET_FIRE_COUNTER')
                }
            }
        },

        handlePlayerMove({ commit }, direction) {
            commit('SET_PLAYER_MOVING', direction)
        },

        handleKeyDown({ commit, state, dispatch }, key) {
            if (!state.isGameRunning) return

            switch (key) {
                case 'ArrowLeft':
                case 'a':
                    commit('SET_PLAYER_MOVING', -1)
                    break
                case 'ArrowRight':
                case 'd':
                    commit('SET_PLAYER_MOVING', 1)
                    break
                case 'ArrowUp':
                case 'w':
                    dispatch('fireBullet', {
                        isEnemy: false,
                        position: {
                            x: state.player.position.x + state.player.dimensions.width / 2 - state.bulletSize / 2,
                            y: state.player.position.y - state.bulletSize
                        }
                    })
                    break
            }
        },

        handleKeyUp({ commit, state }, key) {
            if (!state.isGameRunning) return

            switch (key) {
                case 'ArrowLeft':
                case 'a':
                case 'ArrowRight':
                case 'd':
                    commit('SET_PLAYER_MOVING', 0)
                    break
            }
        },

        gameOver({ commit, state, dispatch }) {
            const restartAction = () => {
                commit('modals/removeAllModals', null, { root: true })
                dispatch('resetGame')
            }

            commit('modals/openModal', {
                component: 'HelpModal',
                params: {
                    score: state.score,
                    title: 'Game Over',
                    buttons: [{
                        text: 'Play Again',
                        class: 'primary',
                        click: restartAction
                    }]
                }
            }, { root: true })
        }
    }
}