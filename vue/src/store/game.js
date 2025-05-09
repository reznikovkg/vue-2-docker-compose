export default {
    namespaced: true,

    state: {
        gameWidth: 0,
        gameHeight: 0,
        player: {
            x: 0,
            y: 0,
            width: 40,
            height: 40,
            speed: 5,
            moving: 0
        },
        stars: [],
        asteroids: [],
        starSize: 20,
        asteroidSize: 30,
        starSpawnRate: 60,
        asteroidSpawnRate: 120,
        starSpawnCounter: 0,
        asteroidSpawnCounter: 0,
        score: 0,
        isGameRunning: false,
        gameLoop: null
    },

    getters: {
        player: state => state.player,
        stars: state => state.stars,
        asteroids: state => state.asteroids,
        starSize: state => state.starSize,
        asteroidSize: state => state.asteroidSize,
        score: state => state.score,
        isGameRunning: state => state.isGameRunning
    },

    mutations: {
        SET_GAME_DIMENSIONS(state, { width, height }) {
            state.gameWidth = width
            state.gameHeight = height
            state.player.y = height - state.player.height - 60
            state.player.x = (width - state.player.width) / 2
        },

        SET_PLAYER_X(state, x) {
            state.player.x = Math.max(0, Math.min(state.gameWidth - state.player.width, x))
        },

        SET_PLAYER_MOVING(state, direction) {
            state.player.moving = direction
        },

        UPDATE_PLAYER_POSITION(state, { x, y }) {
            state.player.x = x
            state.player.y = y
        },

        ADD_STAR(state, star) {
            state.stars.push({
                position: {
                    x: star.position.x,
                    y: star.position.y
                },
                speed: star.speed,
                width: state.starSize,
                height: state.starSize
            })
        },

        ADD_ASTEROID(state, asteroid) {
            state.asteroids.push({
                position: {
                    x: asteroid.position.x,
                    y: asteroid.position.y
                },
                speed: asteroid.speed,
                width: state.asteroidSize,
                height: state.asteroidSize
            })
        },

        UPDATE_STAR_POSITION(state, { index, y }) {
            state.stars[index].position.y = y
        },

        UPDATE_ASTEROID_POSITION(state, { index, y }) {
            state.asteroids[index].position.y = y
        },

        REMOVE_STAR(state, index) {
            state.stars.splice(index, 1)
        },

        REMOVE_ASTEROID(state, index) {
            state.asteroids.splice(index, 1)
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
        },

        RESET_STAR_SPAWN_COUNTER(state) {
            state.starSpawnCounter = 0
        },

        RESET_ASTEROID_SPAWN_COUNTER(state) {
            state.asteroidSpawnCounter = 0
        },

        RESET_GAME(state) {
            state.stars = []
            state.asteroids = []
            state.score = 0
            state.player.x = (state.gameWidth - state.player.width) / 2
            state.starSpawnCounter = 0
            state.asteroidSpawnCounter = 0
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
            dispatch('startGameLoop')
        },

        startGameLoop({ commit, state, dispatch }) {
            if (!state.isGameRunning || state.gameLoop) return

            const checkCollision = (obj1, obj2) => {
                return (
                    obj1.x < obj2.x + obj2.width &&
                    obj1.x + obj1.width > obj2.x &&
                    obj1.y < obj2.y + obj2.height &&
                    obj1.y + obj1.height > obj2.y
                )
            }

            const gameLoop = () => {
                if (!state.isGameRunning) return

                if (state.player.moving !== 0) {
                    const newX = state.player.x + state.player.speed * state.player.moving
                    commit('UPDATE_PLAYER_POSITION', {
                        x: Math.max(0, Math.min(state.gameWidth - state.player.width, newX)),
                        y: state.player.y
                    })
                }

                commit('INCREMENT_SPAWN_COUNTERS')

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

                for (let i = state.stars.length - 1; i >= 0; i--) {
                    const newY = state.stars[i].position.y + state.stars[i].speed

                    if (checkCollision(state.player, {
                        x: state.stars[i].position.x,
                        y: newY,
                        width: state.starSize,
                        height: state.starSize
                    })) {
                        commit('INCREMENT_SCORE', 10)
                        commit('REMOVE_STAR', i)
                    } else if (newY > state.gameHeight) {
                        commit('REMOVE_STAR', i)
                    } else {
                        commit('UPDATE_STAR_POSITION', { index: i, y: newY })
                    }
                }

                for (let i = state.asteroids.length - 1; i >= 0; i--) {
                    const newY = state.asteroids[i].position.y + state.asteroids[i].speed

                    if (checkCollision(state.player, {
                        x: state.asteroids[i].position.x,
                        y: newY,
                        width: state.asteroidSize,
                        height: state.asteroidSize
                    })) {
                        commit('SET_GAME_RUNNING', false)
                        cancelAnimationFrame(state.gameLoop)
                        commit('SET_GAME_LOOP', null)

                        dispatch('modals/openModal', {
                            component: 'HelpModal',
                            params: {
                                score: state.score,
                                title: 'Game Over',
                                buttons: [{
                                    text: 'Play Again',
                                    click: () => dispatch('game/resetGame', null, { root: true })
                                }],
                                onRestart: () => dispatch('game/resetGame', null, { root: true })
                            }
                        }, { root: true })
                        break
                    } else if (newY > state.gameHeight) {
                        commit('REMOVE_ASTEROID', i)
                    } else {
                        commit('UPDATE_ASTEROID_POSITION', { index: i, y: newY })
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

        handlePlayerMove({ commit }, direction) {
            commit('SET_PLAYER_MOVING', direction)
        },

        handleKeyDown({ commit, state }, key) {
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
        }
    }
}