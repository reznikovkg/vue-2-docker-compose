<template>
  <div :style="{
          'width': w + 'px',
          'height': h + 'px',
          'left': X_WORLD + 'px',
          'top': Y_WORLD + 'px'}"  class="World">
    <EnemySprite v-for="enemy in ENEMYS" :key="enemy.id"  :x="enemy.x" :y="enemy.y" :enemy-radius="enemyPrototype.enemyRadius"/>
    <SimpleAttack v-for="attack in ATTACKS" :key="'attak' + attack.id" :x="attack.x" :y="attack.y" :attack-radius="attackPrototype.attackRadius"/>
    <CoinSprite v-for="coin in COINS" :key="'coin' + coin.id" :x="coin.x" :y="coin.y" />

  </div>
</template>



<script>
import {mapGetters} from 'vuex';
import CoinSprite from './CoinSprite.vue';
import EnemySprite from './EnemySprite.vue';
import SimpleAttack from './SimpleAttack.vue';

  export default{
    name: 'GameWorld',
    components:{
      EnemySprite,
      SimpleAttack,
      CoinSprite
    },

    props:{
      w:Number,
      h:Number,
      xCursor: Number,
      yCursor: Number,
      enemyPrototype: Object,
      attackPrototype: Object,
      keys: Object
    },
    computed : {
      ...mapGetters(['ENEMYS',
                     'ATTACKS',
                     'COINS',
                     'X_WORLD',
                     'Y_WORLD'])
    },

    data(){
      return{
        deltaTime:0,
        lastTime:0,

        enemyTimerId: 0,
        attackTimerId: 0,

        enemyCounter: 0,
        maxEnemy:50,
      }
    },
    
    watch:{
      gameStatus:function(value){
        if(value == 2){
          this.enemyCounter = 0;
          this.enemyIDCounter=0;
          this.coinsCounter = 0;
        }
      }
    },

    mounted() {
    
      this.lastTime = 0;
      this.gameLoop();

      this.attackTimerId =  setInterval(()=>
      {
        this.$store.commit('ADD_ATTACK');
      } ,this.attackPrototype.spawnSpan);

      this.enemyTimerId =  setInterval(()=>
      {
        if(this.enemyCounter < this.maxEnemy ){
          this.$store.commit('ADD_ENEMY');
          this.enemyCounter++;
        }
      } ,this.enemyPrototype.spawnSpan);
    },

    beforeDestroy() {
      clearInterval(this.attackTimerId);
      clearInterval(this.enemyTimerId);
    },

    methods:{
      gameLoop() {
        const loop = (currentTime) => {
          this.deltaTime = (currentTime - this.lastTime) / 1000; 
          this.lastTime = currentTime;
          this.$store.commit('UPDATE_INPUT', {keys:this.keys, 
                                              xCursor:this.xCursor, 
                                              yCursor:this.yCursor});
          this.update(this.deltaTime);

          setTimeout(() => requestAnimationFrame(loop));
        };
        requestAnimationFrame(loop);
      },

      update(deltaTime) {
          this.$store.commit('UPDATE', deltaTime);
      },
    }
  }


</script>

<style scoped>
.World{
  position: relative;
  background-color: antiquewhite;
}

</style>