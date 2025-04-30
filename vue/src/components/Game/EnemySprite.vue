<template>
  <div 
    :style="enemyStyle"
    class="enemy"
  >
    {{ health }}
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
  border-radius: 50%;
  position: absolute;
  background: @cBaseEnemy;
  border: 2px solid @cBorderEnemy;
  opacity: 50%;
  z-index: 555;
  text-align: center;
  font-size: 4vh;
}
</style>