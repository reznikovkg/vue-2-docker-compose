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
      :health="enemy.health"
      :enemy-radius="enemy.radius"
    />
    <SimpleAttack
      v-for="attack in attacks"
      :key="'attack' + attack.id"
      :x="attack.x"
      :y="attack.y"
      :attack-radius="attack.radius"
    />
    <RadiusAttack
      v-for="attack in radiusAttacks"
      :key="'radiusAttack' + attack.id"
      :x="attack.x"
      :y="attack.y"
      :attack-radius="attack.radius"
    />
    <DeadAttack
      v-for="attack in deadAttacks"
      :key="'deadAttack' + attack.id"
      :x="attack.x"
      :y="attack.y"
      :attack-radius="attack.radius"
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
import RadiusAttack from './RadiusAttack.vue';
import DeadAttack from './DeadAttack.vue';

export default{
  name: 'GameWorld',
  components:{
    EnemySprite,
    SimpleAttack,
    CoinSprite,
    RadiusAttack,
    DeadAttack
  },
  data(){
    return{
      deltaTime:0,
      lastTime:0,
      enemyTimerGoonId: 0,
      enemyTimerArcherId: 0,
      attackTimerId: 0,
      attackTimerArcherId: 0,
      mannaIncreasTimerId: 0,
      enemyCounter: 0,
    }
  },
  props:{
    enemyPrototypes: {
      type: Object,
      required: true
    },
    attackPrototypes: {
      type: Object,
      required: true
    }
  },
  computed : {
    ...mapGetters([
      'enemies',
      'attacks',
      'coins',
      'xWorld',
      'yWorld',
      'worldStyle',
      'enemiesCounter',
      'radiusAttacks',
      'deadAttacks'
    ])
  },
  mounted() {
    this.lastTime = 0;
    this.gameLoop();
    this.enemyTimerArcherId =  setInterval(()=>
    {
      this.addArchersAttack();
    } ,this.attackPrototypes['archers'].spawnSpan);

    this.attackTimerId =  setInterval(()=>
    {
      this.addAttack();
    } ,this.attackPrototypes['simple'].spawnSpan);

    this.enemyTimerGoonId =  setInterval(()=>
    {
        this.addEnemy({protoName: "goon"});
    } ,this.enemyPrototypes["goon"].spawnSpan);

    this.enemyTimerArcherId =  setInterval(()=>
    {
        this.addEnemy({protoName: "archer"});
    } ,this.enemyPrototypes["archer"].spawnSpan);
    this.mannaIncreasTimerId = setInterval(()=>
    {
        this.mannaIncrease();
    } ,1000);
  },
  beforeDestroy() {
    clearInterval(this.enemyTimerGoonId);
    clearInterval(this.attackTimerId);
    clearInterval(this.enemyTimerArcherId);
    clearInterval(this.enemyTimerId);
  },
  methods:{
    ...mapActions([
      'updateInput',
      'updateState',
      'addEnemy',
      'addAttack',
      'addArchersAttack',
      'mannaIncrease'
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

<style lang="less" scoped>
.world{
  position: relative;
  // background-color: @cBaseWorld;
}
</style>