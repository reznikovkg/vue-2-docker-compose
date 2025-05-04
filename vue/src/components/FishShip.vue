<template>
  <div class="ship">
    <img 
    src = "@/assets/Ship.png"
    class="ship" :style="{
        left: getPos.x +'px',
        top: getPos.y +'px'
        }"
    ref="shipElement">
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import {mapActions} from 'vuex'
 export default {
    name: 'FishShip',
    computed:{
    ...mapGetters('movement',['getPos']),
  },
    mounted() {
      this.shipCoordinates(); 
      this.init();
    },
    
    methods:
    {
      ...mapActions('movement',['init']),
      shipCoordinates(){
        const ship = this.$refs.shipElement;
        const rect = ship.getBoundingClientRect();
        const coords = { x: rect.x, y: rect.y };
        return coords;
      },
    }
  }
</script>

<style scoped>
.ship{
  position: absolute;
  display: grid;
  place-items: center;
  z-index:2;
  width: 200px;
  height: auto; 
  top: 150px;
  left: 320px;
}
</style>