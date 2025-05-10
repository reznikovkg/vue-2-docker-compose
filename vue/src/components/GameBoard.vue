<template>
  <div class="game-board" ref="gameContainer">
    <GameStatus :score="score" :health="playerHealth" />
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
    <!-- снаряды игрока -->
    <BulletObject
        v-for="(bullet, index) in bullets.filter(b => !b.isEnemy)"
        :key="'player-bullet-'+index"
        :position="bullet.position"
        :size="bulletSize"
    />
    <!-- снарды врагов -->
    <BulletObject
        v-for="(bullet, index) in bullets.filter(b => b.isEnemy)"
        :key="'enemy-bullet-'+index"
        :position="bullet.position"
        :size="enemyBulletSize"
        :is-enemy="true"
    />
  </div>
</template>

<script>
import PlayerShip from '@/components/parts/PlayerShip.vue'
import StarObject from '@/components/parts/StarObject.vue'
import AsteroidObject from '@/components/parts/AsteroidObject.vue'
import EnemyShip from '@/components/parts/EnemyShip.vue'
import BulletObject from '@/components/parts/BulletObject.vue'
import GameStatus from '@/components/parts/GameStatus.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

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
    ...mapState('game', ['player', 'stars', 'asteroids', 'enemies', 'bullets']),
    ...mapGetters('game', [
      'starSize',
      'asteroidSize',
      'enemySize',
      'bulletSize',
      'enemyBulletSize',
      'score',
      'playerHealth',
      'isGameRunning'
    ])
  },
  mounted() {
    this.initGame(this.$refs.gameContainer.clientWidth)
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('keydown', this.handleKeyEvent)
    window.addEventListener('keyup', this.handleKeyEvent)
  },
  beforeDestroy() {
    this.stopGame()
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keydown', this.handleKeyEvent)
    window.removeEventListener('keyup', this.handleKeyEvent)
  },
  methods: {
    ...mapActions('game', [
      'initGame',
      'resetGame',
      'startGame',
      'stopGame',
      'handlePlayerMove',
      'handleKeyDown',
      'handleKeyUp',
      'fireBullet'
    ]),
    handleResize() {
      if (this.$refs.gameContainer) {
        this.$store.commit('game/SET_GAME_DIMENSIONS', {
          width: this.$refs.gameContainer.clientWidth,
          height: this.$refs.gameContainer.clientHeight
        })
      }
    },
    handleKeyEvent(event) {
      if (event.type === 'keydown') {
        this.handleKeyDown(event.key)
      } else {
        this.handleKeyUp(event.key)
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
