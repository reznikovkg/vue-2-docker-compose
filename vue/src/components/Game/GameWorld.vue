<template>
  <div 
    :style="worldStyle" 
    class="world"
  >
    <EnemySprite 
      v-for="enemy in enemies"
      :key="enemy.id"
      :x="enemy.x"
      :y="enemy.y"
      :enemy-radius="enemyPrototype.radius"
    />
    <SimpleAttack
      v-for="attack in attacks"
      :key="'attak' + attack.id"
      :x="attack.x"
      :y="attack.y"
      :attack-radius="attackPrototype.radius"
    />
    <CoinSprite
      v-for="coin in coins"
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
    }
  },
  props:{
    w:Number,
    h:Number,
    enemyPrototype: Object,
    attackPrototype: Object,
  },
  computed : {
    ...mapGetters([
      'enemies',
      'attacks',
      'coins',
      'xWorld',
      'yWorld',
      'worldStyle',
      'enemiesCounter'
    ])
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
      if(this.enemiesCounter < this.enemyPrototype.maxEnemies ){
        this.addEnemy();
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

<style lang="less">
.world{
  position: relative;
  background-color: @cBaseWorld;
}
</style>