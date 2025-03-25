<template>
  <div :style="Cursor" class="circle Bull"></div>
</template>

<script>

export default{
  name: 'SimpleAttack',
  props:{
    x: Number,
    y: Number,
    attackRadius: Number
  },
  computed:{
    Cursor(){
      return {
        'width': (this.attackRadius*2)+ 'px',
        'height': (this.attackRadius*2) + 'px',
        'top': (this.y-this.attackRadius)+'px',
        'left': (this.x-this.attackRadius)+ 'px'
      }
    }
  }

}


</script>

<style scoped>
  .Bull{
    top: 0;
    left: 0;
    position: absolute;
    background: #8997c7;
    border: 2px solid #232a94;
    opacity: 50%;
    z-index: 55555555;
  }
</style>