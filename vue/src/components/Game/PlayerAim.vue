<template>
  <div>
    <div
      :style="cursor"
      class="aim"
    >
    </div>
    <div
      :style="playerStyle"
      class="player"
    >
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default{
  name: 'GameAim',
  props:{
    playerRadius: {
      type: Number,
      default: 15
    }
  },
  computed:{
    ...mapGetters([
      'xCursor',
      'yCursor'
    ]),
    cursor(){
      let R = 100;
      let xAim = -window.innerWidth/2+this.xCursor;
      let yAim = -window.innerHeight/2+this.yCursor;
      let tan = yAim/xAim;
      let sign = xAim/Math.abs(xAim);
      let x = R/Math.sqrt((1+tan*tan));
      let y = tan*x;
      return {
        width: (this.playerRadius) + 'px',
        height: (this.playerRadius) + 'px',
        top: (window.innerHeight/2+sign*y - this.playerRadius/2)+'px',
        left: (window.innerWidth/2+sign*x - this.playerRadius/2)+ 'px'
      }
    },
    playerStyle(){
      return {
        width: (this.playerRadius*2) + 'px',
        height: (this.playerRadius*2) + 'px',
        top: (window.innerHeight/2-this.playerRadius)+'px',
        left: (window.innerWidth/2-this.playerRadius)+ 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.player{
  border-radius: 50%;
  position: fixed;
  width: 30px;
  height: 30px;
  background-color: @cBasePlayer;
  border: 2px solid @cBorderPlayer;
  z-index: 555;
}
.aim{
  border-radius: 50%;
  position: fixed;
  width: 14px;
  height: 14px;
  background: @cBaseUi;
  border: 2px solid @cBorderUi;
  opacity: 50%;
}
</style>