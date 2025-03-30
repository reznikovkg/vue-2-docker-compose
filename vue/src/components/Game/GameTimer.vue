<template>
  <div>
    {{ counter }}
  </div>
</template>
  
<script>

export default{
  name: 'GameTimer',
  props:{
    time: Number,
    health: Number,
    coins:Number,
    gameStatus: String
  },
  data(){
    return{
      timerID:0,
      counter:0
    }
  },
  watch:{
    gameStatus:function(value){
      if(value == 'end'){
        this.counter = 0;
      }
    }
  },
  mounted(){
    this.counter = 0;
    this.timerID = setInterval(()=>{
      if(this.gameStatus == 'play'){
        this.counter++;
      }
    }, 1000);
  },
  beforeDestroy(){
    clearInterval(this.timerID);
  }
}
</script>