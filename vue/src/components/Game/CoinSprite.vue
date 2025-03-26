<template>
  <div 
    :style="Center"
    class="Coin"
  >
  </div>
</template>

<script>

export default{
  name: 'CoinSprite',
  props:{
    x: Number,
    y: Number
  },
  computed:{
    Center () {
      return {
        'top': (this.y-7)+ 'px',
        'left': (this.x-7)+ 'px'
      }
    }
  }
}


</script>

<style scoped>
.Coin{
  top: 0;
  left: 0;
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 100%;
  background: #1a94db;
  border: 4px solid #400aa3;
  opacity: 50%;
  z-index: 555;
}

</style>