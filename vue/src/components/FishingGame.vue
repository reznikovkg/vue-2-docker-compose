<template>
  <div class="fishing-minigame">
    <div class="fishing-minigame__progress-bar"
      v-show="!visible"
    >
      <div class="fishing-minigame__slider"
        id="slider" 
      ></div>
      <div class="fishing-minigame__zone"
        id="zone" 
      ></div>
    </div>
    <InventoryWindow 
      ref="inventory"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import lockControl from '@/mixins/lockControl';
import InventoryWindow from "@/components/InventoryWindow.vue";

export default{
  name: 'FishingGame',
  mixins: [lockControl],
  components: {
    InventoryWindow
  },
  data() {
    return{
      visible:true,
      gameInterval:null,
      animationId: null,
      catchTimer: 5000,
      spaceKeyPressed: false
    }
  },
  computed:{
    ...mapGetters('areas',[
      'getArea'
    ])
  },

  mounted() {
    window.addEventListener('keydown', this.startFishing);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.startFishing);
    clearTimeout(this.gameInterval);
  },
  
  methods: {
    startFishing(event){
      if (event.key === 'f'){
        this.visible = false;
        this.lockKeys(['KeyW','KeyA','KeyS','KeyD','KeyR','KeyF','Space']);
        if (this.getArea == "Средний"){
          this.tryBait(this.catchTimer *3)
        }
        if(this.getArea == "Высокий"){
          this.tryBait(this.catchTimer)
        }
        if(this.getArea == "Низкий"){
          this.tryBait(this.catchTimer * 6)
        }
      }
    },

    tryBait(catchTimer){
      if (this.gameInterval) clearTimeout(this.gameInterval); 
      this.gameInterval = setTimeout(() => this.gameStart(), catchTimer);
    },

    gameStart(){ 
      const slider = document.getElementById('slider');
      this.unlockKeys(['Space']);
      this.animate({
        duration: 2000,
        timing(timeFraction) {return timeFraction;},
        draw: (progress) => {
          const sliderWidth = 10;
          const maxPosition = 380 - sliderWidth;
          this.sliderPosition = progress * maxPosition;
          slider.style.transform = `translateX(${this.sliderPosition}px)`;
        }
      });
      window.addEventListener('keydown', (e) => {
        if(e.code === 'Space' && !this.spaceKeyPressed) {
          this.spaceKeyPressed = true;
          this.gameStop();
        }
      });
      window.addEventListener('keyup', (e) => {
         if(e.code === 'Space') {
         this.spaceKeyPressed = false;
        }
      });
    },

    gameStop(){
      const slider = document.getElementById('slider');
      const zone = document.getElementById('zone');
      const zoneRect = zone.getBoundingClientRect();
      const zoneStart = zoneRect.left;
      const zoneEnd = zoneRect.right;
      if(slider.getBoundingClientRect().right >= zoneStart && slider.getBoundingClientRect().left <= zoneEnd){
        this.$refs.inventory.addRandomFish();
      }
      cancelAnimationFrame(this.animationId);
      slider.style.transform = 'translateX(0)';
      this.animationId = null;
      this.unlockKeys()
      this.visible = true;
    },

    animate({timing, draw, duration}) {
      const vm = this;
      let start = performance.now();
      vm.animationId = requestAnimationFrame(function animate(time) {
       let timeFraction = (time - start) / duration;
       if (timeFraction > 1) {
         timeFraction = 0;
         start = performance.now();
        }
       let progress;
       if (timeFraction < 0.5) {progress = timing(timeFraction * 2);} 
       else { progress = timing(1 - (timeFraction - 0.5) * 2);}
       draw(progress);
       vm.animationId = requestAnimationFrame(animate);
      });
    }
  },
}
</script>

<style lang="scss">
.fishing-minigame{
  &__progress-bar
  {
    margin-left: 580px;
    height: 50px;
    display: flex;
    bottom:0;
    margin-bottom: 30px;
    width: 400px;
    position:fixed;
    z-index:3;
    background-color: rgb(200, 146, 10);
    border-radius: 1em;
  }
  &__slider{
    left: 600px;
    height:50px;
    width:10px;
    position:fixed;
    background-color: red;
  }

  &__zone{
    height: 50px;
    width: 60px;
    margin-left: 150px;
    background-color: rgb(7, 218, 7);
  }
}
</style>