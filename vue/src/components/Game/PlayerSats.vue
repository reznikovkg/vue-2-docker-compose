<template>
  <div
    class="stats-panel"
    :class="statsPanelPosition"
  >
    <div
      class="stats-panel__health"
    >
      {{health}}
    </div>
      |
    <div
      class="stats-panel__coins"
    >
      {{coins}}
    </div>
      |
    <div
      class="stats-panel__manna"
    >
      {{manna}}
    </div>
  </div>
</template>
  
<script>

export default{
  name: 'PlayerStats',
  props:{
    health: {
      type: Number,
      required: true
    },
    manna: {
      type: Number,
      required: true
    },
    coins: {
      type: Number,
      required: true
    }
  },
  computed:{
    statsPanelPosition(){
      return {
        top: (0) + 'px',
        left: (document.documentElement.scrollWidth)+ 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.stats-panel{
  display: flex;
  top: 60vh;
  left: 42.5vw;
  position: fixed;
  width: 15vw;
  height: 5vh;
  text-align: center;
  font-size: 4vh;
  
  background: @cBaseUi;
  z-index: 555;
  opacity: 50%;

  &__health{
    color: @cBasePlayer;
  }
  
  &__coins{
    color: @cBaseCoin;  
  }

  &__manna{
    color: @cBaseManna;  
  }

  &__health,&__coins,&__manna{
    width: 5vw;
  }
}
</style>