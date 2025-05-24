<template>
  <div class="game-board" ref="gameContainer">
    <GameStatus />
    <PlayerShip
        :position="{ x: player.x, y: player.y }"
        :dimensions="{ width: player.width, height: player.height }"
        @move="handlePlayerMove"
    />
    <StarObject
        v-for="(star, index) in stars"
        :key="'star-' + index"
        :position="star.position"
        :size="starSize"
    />
    <AsteroidObject
        v-for="(asteroid, index) in asteroids"
        :key="'asteroid-'+index"
        :position="asteroid.position"
        :size="asteroidSize"
        :health="asteroid.health"
    />
    <EnemyShip
        v-for="(enemy, index) in enemies"
        :key="'enemy-'+index"
        :position="enemy.position"
        :dimensions="{ width: enemySize, height: enemySize }"
        :health="enemy.health"
    />
    <BulletObject
        v-for="(bullet, index) in playerBullets"
        :key="'player-bullet-'+index"
        :position="bullet.position"
        :size="bulletSize"
    />
    <BulletObject
        v-for="(bullet, index) in enemyBullets"
        :key="'enemy-bullet-'+index"
        :position="bullet.position"
        :size="enemyBulletSize"
        :is-enemy="true"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import PlayerShip from '@/components/parts/PlayerShip.vue'
import StarObject from '@/components/parts/StarObject.vue'
import AsteroidObject from '@/components/parts/AsteroidObject.vue'
import EnemyShip from '@/components/parts/EnemyShip.vue'
import BulletObject from '@/components/parts/BulletObject.vue'
import GameStatus from '@/components/parts/GameStatus.vue'

export default {
  name: 'GameBoard',
  components: {
    PlayerShip,
    StarObject,
    AsteroidObject,
    EnemyShip,
    BulletObject,
    GameStatus
  },
  computed: {
    ...mapGetters('game', [
      'starSize',
      'asteroidSize',
      'enemySize',
      'bulletSize',
      'enemyBulletSize',
      'isGameRunning',
      'getPlayer',
      'getStars',
      'getAsteroids',
      'getEnemies',
      'getBullets',
      'getScore',
      'getPlayerHealth'
    ]),

    player() {
      return this.getPlayer
    },
    stars() {
      return this.getStars
    },
    asteroids() {
      return this.getAsteroids
    },
    enemies() {
      return this.getEnemies
    },
    playerBullets() {
      return this.getBullets.filter(b => !b.isEnemy)
    },
    enemyBullets() {
      return this.getBullets.filter(b => b.isEnemy)
    }
  },
  methods: {
    ...mapActions('game', [
      'initGame',
      'handlePlayerMove',
      'handleKeyDown',
      'handleKeyUp',
      'fireBullet',
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
    }
  },
  mounted() {
    this.initGame(this.$refs.gameContainer.clientWidth)
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('keydown', (e) => this.handleKeyDown(e.key))
    window.addEventListener('keyup', (e) => this.handleKeyUp(e.key))
  },
  beforeDestroy() {
    this.stopGame()
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
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
