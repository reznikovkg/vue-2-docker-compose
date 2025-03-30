<template>
  <div
    :style="bullPosition"
    class="bull"
  >
  </div>
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
    bullPosition(){
      return {
        width: (this.attackRadius*2)+ 'px',
        height: (this.attackRadius*2) + 'px',
        top: (this.y-this.attackRadius) + 'px',
        left: (this.x-this.attackRadius) + 'px'
      }
    }
  }
}
</script>

<style lang="less">
.bull{
  top: 0;
  left: 0;
  position: absolute;
  background: @cBaseBull;
  border-radius: 50%;
  border: 2px solid @cBorderColor;
  opacity: 50%;
  z-index: 55555555;
}
</style>