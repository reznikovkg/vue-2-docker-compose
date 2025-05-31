<template>
  <div class="game-board" ref="gameContainer">
    <GameStatus />

    <GameEntity
        v-for="(entity, index) in gameEntities"
        :key="`${entity.type}-${index}`"
        :entity="entity"
        @move="direction => handlePlayerMove(direction)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import GameEntity from '@/components/core/GameEntity.vue'
import GameStatus from '@/components/parts/GameStatus.vue'

export default {
  name: 'GameBoard',
  components: {
    GameEntity,
    GameStatus
  },
  computed: {
    ...mapGetters('game', [
      'getPlayer',
      'getStars',
      'getAsteroids',
      'getEnemies',
      'getBullets',
      'starSize',
      'asteroidSize',
      'enemySize',
      'bulletSize',
      'enemyBulletSize'
    ]),
    gameEntities() {
      return [
        {
          type: 'PlayerShip',
          position: this.getPlayer.position,
          dimensions: this.getPlayer.dimensions,
          color: '#3498db'
        },
        ...this.getStars.map((star, index) => ({
          type: 'StarObject',
          position: star.position,
          dimensions: { width: this.starSize, height: this.starSize },
          color: 'gold',
          key: `star-${index}`
        })),
        ...this.getAsteroids.map((asteroid, index) => ({
          type: 'AsteroidObject',
          position: asteroid.position,
          dimensions: { width: this.asteroidSize, height: this.asteroidSize },
          health: asteroid.health,
          key: `asteroid-${index}`
        })),
        ...this.getEnemies.map((enemy, index) => ({
          type: 'EnemyShip',
          position: enemy.position,
          dimensions: { width: this.enemySize, height: this.enemySize },
          health: enemy.health,
          key: `enemy-${index}`
        })),
        ...this.getBullets.map((bullet, index) => ({
          type: 'BulletObject',
          position: bullet.position,
          dimensions: {
            width: bullet.isEnemy ? this.enemyBulletSize : this.bulletSize,
            height: bullet.isEnemy ? this.enemyBulletSize : this.bulletSize
          },
          isEnemy: bullet.isEnemy,
          key: `bullet-${index}`
        }))
      ]
    }
  },
  methods: {
    ...mapActions('game', [
      'handlePlayerMove',
      'handleKeyDown',
      'handleKeyUp',
      'initGame',
      'stopGame'
    ]),
    ...mapMutations('game', [
      'SET_GAME_DIMENSIONS'
    ]),
    handleResize() {
      if (this.$refs.gameContainer) {
        this.SET_GAME_DIMENSIONS({
          width: this.$refs.gameContainer.clientWidth,
          height: this.$refs.gameContainer.clientHeight
        })
      }
    },
    handleKeyPress(e, isKeyDown) {
      const handler = isKeyDown ? this.handleKeyDown : this.handleKeyUp
      handler(e.key)
    }
  },
  mounted() {
    this.initGame(this.$refs.gameContainer.clientWidth)
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('keydown', e => this.handleKeyPress(e, true))
    window.addEventListener('keyup', e => this.handleKeyPress(e, false))
  },
  beforeDestroy() {
    this.stopGame()
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keydown', this.handleKeyPress)
    window.removeEventListener('keyup', this.handleKeyPress)
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