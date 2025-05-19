<template>
  <div class="ship"
    :style="{
      left: getPos.x +'px',
      top: getPos.y +'px',
    }"
  >
    <img class="ship__image" 
    src = "@/assets/Ship.png"
    ref="shipElement">
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'FishShip',
  computed:{
    ...mapGetters('movement',[
      'getPos'
    ]),
  },
  
    mounted() {
      this.shipCoordinates(); 
      this.init();
    },
    
    methods: {
      ...mapActions('movement',[
        'init'
      ]),
      shipCoordinates() {
        const ship = this.$refs.shipElement;
        const rect = ship.getBoundingClientRect();
        const coords = { x: rect.x, y: rect.y };
        return coords;
      },
    }
  }
</script>

<style scoped>
.ship,  
.ship__image{
  position: absolute;
  z-index:2;
  display: grid;
  place-items: center;
  width: 200px; 
  height: auto; 
  top:150px;
  left:320px
}
</style>