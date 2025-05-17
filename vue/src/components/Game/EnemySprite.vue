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
    enemyStyle () {
      return {
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
  background-image: url("@/assets/slime.gif");
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