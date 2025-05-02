<template>
  <div class="game-board" ref="gameContainer">
    <GameStatus :score="score" />
    <Player
        :x="player.x"
        :y="player.y"
        :width="player.width"
        :height="player.height"
        @move="handlePlayerMove"
    />
    <Star
        v-for="(star, index) in stars"
        :key="'star-'+index"
        :x="star.x"
        :y="star.y"
        :size="starSize"
    />
    <Asteroid
        v-for="(asteroid, index) in asteroids"
        :key="'asteroid-'+index"
        :x="asteroid.x"
        :y="asteroid.y"
        :size="asteroidSize"
    />
  </div>
</template>

<script>
import PlayerShip from '@/components/parts/PlayerShip.vue'
import StarObject from '@/components/parts/StarObject.vue'
import AsteroidObject from '@/components/parts/AsteroidObject.vue'
import GameStatus from '@/components/parts/GameStatus.vue'
import modalsMixin from '@/mixins/modals'

export default {
  name: 'GameBoard',
  mixins: [modalsMixin],
  components: {
    Player: PlayerShip,
    Star: StarObject,
    Asteroid: AsteroidObject,
    GameStatus
  },
  data() {
    return {
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
      gameLoop: null,
      starSpawnRate: 60,
      asteroidSpawnRate: 120,
      starSpawnCounter: 0,
      asteroidSpawnCounter: 0,
      score: 0,
      isGameRunning: false
    }
  },
  mounted() {
    this.initGame()
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    this.stopGame()
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    initGame() {
      this.handleResize()
      this.resetGame()
    },
    handleResize() {
      const container = this.$refs.gameContainer
      if (container) {
        this.gameWidth = container.clientWidth
        this.gameHeight = container.clientHeight
        this.player.y = this.gameHeight - this.player.height - 60
        this.player.x = (this.gameWidth - this.player.width) / 2
      }
    },
    resetGame() {
      this.stopGame()
      this.stars = []
      this.asteroids = []
      this.score = 0
      this.player.x = (this.gameWidth - this.player.width) / 2
      this.starSpawnCounter = 0
      this.asteroidSpawnCounter = 0
      this.startGame()
    },
    startGame() {
      this.isGameRunning = true
      this.gameLoop = requestAnimationFrame(this.gameUpdate)
    },
    stopGame() {
      this.isGameRunning = false
      if (this.gameLoop) {
        cancelAnimationFrame(this.gameLoop)
        this.gameLoop = null
      }
    },
    gameUpdate() {
      if (!this.isGameRunning) return

      // Движение игрока
      if (this.player.moving !== 0) {
        this.player.x += this.player.speed * this.player.moving
        this.player.x = Math.max(0, Math.min(this.gameWidth - this.player.width, this.player.x))
      }

      this.spawnObjects()
      this.processObjects()
      this.gameLoop = requestAnimationFrame(this.gameUpdate)
    },
    spawnObjects() {
      if (++this.starSpawnCounter >= this.starSpawnRate) {
        this.stars.push(this.createStar())
        this.starSpawnCounter = 0
      }
      if (++this.asteroidSpawnCounter >= this.asteroidSpawnRate) {
        this.asteroids.push(this.createAsteroid())
        this.asteroidSpawnCounter = 0
      }
    },
    createStar() {
      return {
        x: Math.random() * (this.gameWidth - this.starSize),
        y: -this.starSize,
        speed: 2 + Math.random() * 3,
        width: this.starSize,
        height: this.starSize
      }
    },
    createAsteroid() {
      return {
        x: Math.random() * (this.gameWidth - this.asteroidSize),
        y: -this.asteroidSize,
        speed: 3 + Math.random() * 4,
        width: this.asteroidSize,
        height: this.asteroidSize
      }
    },
    processObjects() {
      for (let i = this.stars.length - 1; i >= 0; i--) {
        this.stars[i].y += this.stars[i].speed
        if (this.checkCollision(this.player, this.stars[i])) {
          this.score += 10
          this.stars.splice(i, 1)
        } else if (this.stars[i].y > this.gameHeight) {
          this.stars.splice(i, 1)
        }
      }

      for (let i = this.asteroids.length - 1; i >= 0; i--) {
        this.asteroids[i].y += this.asteroids[i].speed
        if (this.checkCollision(this.player, this.asteroids[i])) {
          this.stopGame()
          this.openGameOverModal(this.score, this.resetGame)
          break
        } else if (this.asteroids[i].y > this.gameHeight) {
          this.asteroids.splice(i, 1)
        }
      }
    },
    checkCollision(obj1, obj2) {
      return (
          obj1.x < obj2.x + obj2.width &&
          obj1.x + obj1.width > obj2.x &&
          obj1.y < obj2.y + obj2.height &&
          obj1.y + obj1.height > obj2.y
      )
    },
    handlePlayerMove(direction) {
      this.player.moving = direction
    },
    handleKeyDown(event) {
      if (!this.isGameRunning) return

      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
          this.player.moving = -1
          break
        case 'ArrowRight':
        case 'd':
          this.player.moving = 1
          break
      }
    },
    handleKeyUp(event) {
      if (!this.isGameRunning) return

      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'ArrowRight':
        case 'd':
          this.player.moving = 0
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '@/less/const.less';
.game-board {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: @cGameBackground;
  overflow: hidden;
}
</style>