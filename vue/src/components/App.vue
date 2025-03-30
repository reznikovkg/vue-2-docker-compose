<template>
  <div id="app" @mousemove="($event)=>{moveCursor($event)}">
    <GameWorld
      :w="width"
      :h="height" 
      :attackPrototype="attackPrototype"
      :enemyPrototype="enemyPrototype"
    />
    <PlayerAim 
      :player-radius="playerPrototype.radius" 
    />      
    <PlayerStats
      v-if="gameStatus != 'end'"
      :health="health"
      :coins="score"
    />
    <div class="control-panel">
      <GameTimer
        class="control-panel__timer" 
        :game-status="gameStatus"
      />
      <button
        class="control-panel__pause-button"
        @click="()=>pauseClick()"
      >
        Пауза
      </button>
    </div>
    <button
      v-if="gameStatus == 'end'"
      class="gameButton gameButton--play"
      @click="()=>startGameClick()"
    >
      Играть
    </button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import GameWorld from './Game/GameWorld.vue';
import PlayerAim from './Game/PlayerAim.vue';
import PlayerStats from './Game/PlayerSats.vue';
import GameTimer from './Game/GameTimer.vue';
export default {
  name: 'App',
  components: {
    GameWorld,
    PlayerAim,
    PlayerStats,
    GameTimer
  },
  data () {
    return{
      width:1100,
      height:1100,
      playerPrototype:{
        score:0,
        health: 100,
        speed: 100,
        radius: 15,
      },
      enemyPrototype:{
        speed: 90,
        radius: 15,
        maxEnemies:50,
        spawnSpan: 2000,
        spawnRadius: 300
      },
      attackPrototype:{ 
        radius: 10,
        lifeRadius: 180,
        speed: 400,
        spawnSpan: 2000
      },
    }
  },
  computed: {
      ...mapGetters([
        'score',
        'health',
        'gameStatus'
      ])
  },
  mounted () {
    window.addEventListener('keydown', this.keyDownHandler);
    window.addEventListener('keyup', this.keyUpHandler);
    this.init({
      gameWidth: this.width, 
      gameHeight: this.height, 
      windowWidth: document.documentElement.scrollWidth, 
      windowHeight: document.documentElement.scrollHeight,
      playerPrototype: this.playerPrototype,
      enemyPrototype: this.enemyPrototype,
      attackPrototype: this.attackPrototype
    });
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.keyDownHandler);
    window.removeEventListener('keyup', this.keyUpHandler);
  },
  methods: {
    ...mapActions([
      'start',
      'pause',
      'reset',
      'init',
      'updateInputCursor',
      'updateInputKey'
    ]), 
    moveCursor (e) {
      this.updateInputCursor({
        xCursor: e.clientX,
        yCursor: e.clientY
      });
    },
    pauseClick () {
      this.pause();
    },
    startGameClick () {
      this.reset();
      this.start();
    },
    keyDownHandler (event) {
      this.updateInputKey({
        code: event.code,
        status: true
      });
    },
    keyUpHandler (event) {
      this.updateInputKey({
        code: event.code,
        status: false
      });
    },
  }
}
</script>


<style lang="less">
* {
  padding: 0px;
  margin: 0px;
  border: none;
  height: 100%;
  text-transform: uppercase;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: @background;
}
.gameButton {
  width: 10vw;
  height: 5vh;
  text-align: center;
  text-transform: uppercase;
  background-color: @buttonColor;
  color: white;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }

  &--play {
    top: 60vh;
    left: 45vw;
    position: fixed;
    z-index: 5555;
  }

}
.control-panel {
  position: fixed;
  top: 1vh;
  left: 45vw;
  display:flex;
  align-content:center;
  z-index: 5555;

  &__pause-button {
    width: 5vw;
    height: 5vh;
    padding: auto;
    color: white;
    background-color: @buttonColor;

    &:hover {
      cursor: pointer;
    }
  }

  &__timer {
    width: 5vw;
    height: 5vh;
    text-align: center;
    font-size: 4vh;
    background: @cBaseUi;
    z-index: 555;
    opacity: 50%;
  }
}
</style>
