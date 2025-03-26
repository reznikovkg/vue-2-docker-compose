<template>
  <div 
    :style="EnemyStyle"
    class="circle Enemy"
  >
  </div>
</template>


  
<script>

export default{
  name: 'EnemySprite',
  props:{
    x: Number,
    y: Number,
    enemyRadius: Number 
  },
  computed:{
    EnemyStyle(){
      return {
        'width': (this.enemyRadius*2) + 'px',
        'height': (this.enemyRadius*2) + 'px',
        'top': (this.y-this.enemyRadius)+'px',
        'left': (this.x-this.enemyRadius)+ 'px'
      }
    }
  }

}


</script>
  
<style scoped>
  .Enemy{
    position: absolute;
    background: #fd0000;
    border: 2px solid #490505;
    opacity: 50%;
    z-index: 555;
  }
</style>