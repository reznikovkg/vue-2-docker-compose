<template>
    <div class="Timer" :class="Center">
      {{counter}}
    </div>
    
</template>
  
  
  
<script>

export default{
  name: 'GameTimer',
  props:{
      time: Number,
      health: Number,
      coins:Number,
      gameStatus: Number
  },
  data(){
    return{
      timerID:0,
      counter:0
    }
  },
  watch:{
    gameStatus:function(value){
      if(value == 2){
        this.counter = 0;
      }
    }
  },

  mounted(){
    this.counter = 0;
    this.timerID = setInterval(()=>{
      if(this.gameStatus == 0){
        this.counter++;
      }
    }, 1000);
  },
  beforeDestroy(){
    clearInterval(this.timerID);
  },
  computed:{

    Center(){
      return {
        'top': (0)+'px',
        'left': (document.documentElement.scrollWidth)+ 'px'
      }
    }
  }

}


</script>

<style scoped>
  .Timer{
    width: 5vw;
    height: 5vh;
    text-align: center;
    font-size: 4vh;
    background: #cfcfcf;
    z-index: 555;
    opacity: 50%;
  }

</style>