<template>
  <div
    class="Stats"
    :class="center"
  >
    <div
      class="health"
    >
      {{health}}
    </div>
      |
    <div
      class="coins"
    >
      {{coins}}
    </div>
  </div>
</template>
  
<script>

export default{
  name: 'PlayerStats',
  props:{
    time: Number,
    health: Number,
    coins:Number
  },
  computed:{
    center(){
      return {
        'top': (0) + 'px',
        'left': (document.documentElement.scrollWidth)+ 'px'
      }
    }
  }
}
</script>

<style scoped>
  .Stats{
    display: flex;
    top: 60vh;
    left: 45vw;
    position: fixed;
    width: 10vw;
    height: 5vh;
    text-align: center;
    font-size: 4vh;
    
    background: #cfcfcf;
    z-index: 555;
    opacity: 50%;

  }
  .health{
    color: #16a91f;
    text-align: center; 
    width: 5vw;
  }
  .coins{
    color: #1573c0;
    text-align: center;
    width: 5vw;
  }
</style>