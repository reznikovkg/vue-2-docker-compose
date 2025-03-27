<template>
  <div 
    :style="WORLDSTYLE" 
    class="World"
  >
    <EnemySprite 
      v-for="enemy in ENEMIES"
      :key="enemy.id"
      :x="enemy.x"
      :y="enemy.y"
      :enemy-radius="enemyPrototype.enemyRadius"
    />
    <SimpleAttack
      v-for="attack in ATTACKS"
      :key="'attak' + attack.id"
      :x="attack.x"
      :y="attack.y"
      :attack-radius="attackPrototype.attackRadius"
    />
    <CoinSprite
      v-for="coin in COINS"
      :key="'coin' + coin.id"
      :x="coin.x" 
      :y="coin.y" 
    />
  </div>
</template>



<script>
import {mapGetters, mapActions} from 'vuex';
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
    ...mapGetters([
      'ENEMIES',
      'ATTACKS',
      'COINS',
      'X_WORLD',
      'Y_WORLD',
      'WORLDSTYLE'
    ])
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
      this.addAttack();
    } ,this.attackPrototype.spawnSpan);

    this.enemyTimerId =  setInterval(()=>
    {
      if(this.enemyCounter < this.maxEnemy ){
        this.addEnemy();
        this.enemyCounter++;
      }
    } ,this.enemyPrototype.spawnSpan);
  },
  beforeDestroy() {
    clearInterval(this.attackTimerId);
    clearInterval(this.enemyTimerId);
  },
  methods:{
    ...mapActions([
      'updateInput',
      'updateState',
      'addEnemy',
      'addAttack'
    ]), 
    gameLoop() {
      const loop = (currentTime) => {
        this.deltaTime = (currentTime - this.lastTime) / 1000; 
        this.lastTime = currentTime;
        this.updateInput({
          keys:this.keys, 
          xCursor:this.xCursor, 
          yCursor:this.yCursor
        });
        this.update(this.deltaTime);

        setTimeout(() => requestAnimationFrame(loop));
      };
      requestAnimationFrame(loop);
    },
    update(deltaTime) {
      this.updateState(deltaTime);
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