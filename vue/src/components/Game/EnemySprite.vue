<template>
  <div 
    :style="enemyStyle"
    class="enemy"
  >
    <div class="enemy__health">
      {{ health }}
    </div>
  </div>
</template>
 
<script>
import {mapGetters} from 'vuex';
import slimeSprite1 from '@/assets/slime.gif';
import slimeSprite2 from '@/assets/slime2.gif';

export default{
  name: 'EnemySprite',
  props:{
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    health: {
      type: Number,
      required: true
    },
    enemyRadius: {
      type: Number,
      default: 15
    }
  },
  computed:{
    ...mapGetters([
      'playersPos'
    ]),
    enemyStyle () {
      let sprite = slimeSprite1;
      if (this.playersPos[0] < this.x)
        sprite = slimeSprite2;
      return {
        'background-image': `url(${sprite})`,
        width: (this.enemyRadius*2) + 'px',
        height: (this.enemyRadius*2) + 'px',
        top: (this.y-this.enemyRadius)+'px',
        left: (this.x-this.enemyRadius)+ 'px'
      }
    }
  }
}
</script>
  
<style lang="less" scoped>
.enemy{
  position: absolute;
  background-size: cover;
  background-position: center;
  &__health{
    position: absolute;
    top:100%;
    width: 100%;
    height: 2.5vh;
    background: @cBaseUi;
    text-align: center;
    font-size: auto;
  }
}
</style>