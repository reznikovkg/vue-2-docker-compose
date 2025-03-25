<template>
  <div id="app" @mousemove="($event)=>{moveCursor($event)}">
    <GameWorld :x-cursor="xUserCursor" :y-cursor="yUserCursor" :w="width" :h="height" 
                :attackPrototype="attackPrototype"
                :enemyPrototype="enemyPrototype"
                :keys="keys"/>

    <PlayerAim :player-radius="playerStart.playerRadius" 
               :x-cursor="xUserCursor" 
               :y-cursor="yUserCursor"/>
               
    <PlayerStats :health="HEALTH" :coins="SCORE"/>
    <div class="TopUI">
      <GameTimer :game-status="GAMESTATUS"/>
      <button @click="()=>{Pause()}" class="pause">Пауза</button>
    </div>
    <button v-if="GAMESTATUS==2" @click="()=>{Start()}" class="play">Играть</button>

  </div>
</template>

<script>
import {mapGetters} from 'vuex';
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
  computed : {
      ...mapGetters(['SCORE',
                    'HEALTH',
                    'GAMESTATUS'
                    ])
    },
  data(){
    return{
      xUserCursor:0,
      yUserCursor:0,

      player:{},
      health: 100,
      playerStart:{
        score:0,
        health: 100,
        playerSpeed: 100,
        playerRadius: 15,
      },
      enemyPrototype:{
        health: 3,
        enemySpeed: 90,
        enemyRadius: 15,
        spawnSpan: 2000,
        spawnRadius: 300
      },
      attackPrototype:{ 
        attackRadius:10,
        spawnSpan: 2000
      },

      gameStatus:2,
      keys: {},
      width:1100,
      height:1100
    }
  },
  mounted(){
    window.addEventListener('keydown', this.keyDownHandler);
    window.addEventListener('keyup', this.keyUpHandler);
    this.$store.commit('INIT', {w:this.width, 
                                h:this.height, 
                                wWindow:document.documentElement.scrollWidth, 
                                hWindow:document.documentElement.scrollHeight,
                                playerPrototype: this.playerStart,
                                enemyPrototype: this.enemyPrototype,
                                attackPrototype: this.attackPrototype
                                });
  },
  beforeDestroy(){
    window.removeEventListener('keydown', this.keyDownHandler);
    window.removeEventListener('keyup', this.keyUpHandler);
  },
  methods: {
    moveCursor(e) {
      this.xUserCursor = e.clientX;
      this.yUserCursor = e.clientY;
    },
    Pause(){
      this.$store.commit('PAUSE');
    },
    Start(){
      this.$store.commit('RESET');
      this.$store.commit('START');
    },
    keyDownHandler(event) {
      this.keys[event.code] = true;
    },
    keyUpHandler(event) {
      this.keys[event.code] = false;
    },
  }
}
</script>


<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap');

* {
	padding: 0px;
	margin: 0px;
	border: none;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* cursor: none; */
  background-color: rgba(167, 167, 164, 0.356);
}
button {
  background: #3498db;
  width: 180px;
  padding: 4px 0;
  font-family: 'Roboto'; 
  text-align: center;
  text-transform: uppercase;
  color: #FFFFFF;
  user-select: none;
  transform: translateX(0%) translateY(0%);
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }
  
}
.TopUI{
  position: fixed;
  top: 1vh;
  left: 45vw;
  display:flex;

  align-content:center;
  z-index: 5555;
}
.pause{
  width: 5vw;
  height: 5vh;
  z-index: 5555;
  padding: auto;
}
.play{
  top: 60vh;
  left: 45vw;
  position: fixed;
  width: 10vw;
  height: 5vh;
  z-index: 5555;
}
.circle{
  pointer-events: none;
  user-select: none;
  border-radius: 50%;
  will-change: transform;
}
</style>
