<template>
  <div 
    :style="center"
    class="coin"
  >
  </div>
</template>

<script>

export default{
  name: 'CoinSprite',
  props:{
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  computed:{
    center () {
      return {
        top: (this.y-7)+ 'px',
        left: (this.x-7)+ 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.coin{
  border-radius: 50%;
  top: 0;
  left: 0;
  position: absolute;
  width: 14px;
  height: 14px;
  background: @cBaseCoin;
  border: 4px solid #400aa3;
  opacity: 50%;
  z-index: 555;
}
</style>