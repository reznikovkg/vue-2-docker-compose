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
import playerGifW from '@/assets/player/w.gif';
import playerGifWD from '@/assets/player/wd.gif';
import playerGifWA from '@/assets/player/wa.gif';
import playerGifA from '@/assets/player/a.gif';
import playerGifD from '@/assets/player/d.gif';
import playerGifS from '@/assets/player/s.gif';
import playerGifSA from '@/assets/player/sa.gif';
import playerGifSD from '@/assets/player/sd.gif';

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
      'yCursor',
      'playerDirection'
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
      let sprite;
      switch (this.playerDirection) {
        case 'w':
          sprite = playerGifW;
          break;
        case 's':
          sprite = playerGifS;
          break;
        case 'a':
          sprite = playerGifA;
          break;
        case 'd':
          sprite = playerGifD;
          break;
        case 'wd':
          sprite = playerGifWD;
          break;
        case 'wa':
          sprite = playerGifWA;
          break;
        case 'sd':
          sprite = playerGifSD;
          break;
        case 'sa':
          sprite = playerGifSA;
          break;
        default:
          sprite = playerGifS;
      }
      return {
        'background-image': `url(${sprite})`,
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
  background-size: cover;
  background-position: center;
  position: fixed;
  width: 40px;
  height: 40px;
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