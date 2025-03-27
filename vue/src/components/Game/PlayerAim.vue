<template>
  <div>
    <div
      :style="cursor"
      class="circle Aim"
    >
    </div>
    <div
      :style="playerStyle"
      class="circle Player"
    >
    </div>
  </div>
</template>

<script>
export default{
  name: 'GameAim',
  props:{
    xCursor: Number,
    yCursor: Number,
    playerRadius: Number
  },
  computed:{
    cursor(){
      let R = 100;
      let xAim = -window.innerWidth/2+this.xCursor;
      let yAim = -window.innerHeight/2+this.yCursor;
      let tan = yAim/xAim;
      let sign = xAim/Math.abs(xAim);
      let x = R/Math.sqrt((1+tan*tan));
      let y = tan*x;
      return {
        'width': (this.playerRadius) + 'px',
        'height': (this.playerRadius) + 'px',
        'top': (window.innerHeight/2+sign*y - this.playerRadius/2)+'px',
        'left': (window.innerWidth/2+sign*x - this.playerRadius/2)+ 'px'
      }
    },
    playerStyle(){
      return {
        'width': (this.playerRadius*2) + 'px',
        'height': (this.playerRadius*2) + 'px',
        'top': (window.innerHeight/2-this.playerRadius)+'px',
        'left': (window.innerWidth/2-this.playerRadius)+ 'px'
      }
    }
  }
}
</script>

<style scoped>
  .Player{
    position: fixed;
    width: 30px;
    height: 30px;
    background: #16a91f;
    border: 2px solid #089a5b;
    z-index: 555;
  }
  .Aim{
    position: fixed;
    width: 14px;
    height: 14px;
    background: #cfcfcf;
    border: 2px solid #646464;
    opacity: 50%;
  }
</style>