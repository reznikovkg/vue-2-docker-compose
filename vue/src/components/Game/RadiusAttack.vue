<template>
  <div
    :style="bullPosition"
    class="bull"
  >
  </div>
</template>

<script>

export default{
  name: 'RadiusAttack',
  props:{
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    attackRadius: {
      type: Number,
      default: 10
    }
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

<style lang="less" scoped>
.bull{
  top: 0;
  left: 0;
  position: absolute;
  background: @cBaseBull;
  border-radius: 50%;
  border: 2px solid @cBorderColor;
  opacity: 20%;
  z-index: 55555555;
  //animation: expand 1s 1;
}
@keyframes expand {
            0% {
                transform: scale(2);
                opacity: 1;
            }
            100% {
                transform: scale(6);
                opacity: 0;
            }
        }
</style>