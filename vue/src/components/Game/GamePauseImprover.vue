<template>
  <div
    class="improve-panel"
    :class="statsPanelPosition"
  >
    <div
      v-for="(item, key) in prices"
      :key="key"
      class="improve-panel__item"
    >
    <button 
      v-if="score>=item.amount"
      class="improve-panel__item-enabled"
      @click="()=>bayClick(key, item)"
    >
      {{ key }}: {{ item.value }} за {{ item.amount }} монет
    </button>
    <button 
      v-else
      class="improve-panel__item-disabled"
      @click="()=>bayClick(key, item)"
    >
      {{ key }}: {{ item.value }} за {{ item.amount }} монет
    </button>
      
  </div>
  </div>
</template>
  
<script>
import {mapGetters, mapActions} from 'vuex';

export default{
  name: 'GamePauseImprover',
  props:{

  },
  computed:{
    ...mapGetters([
      'prices',
      'playerStats',
      'score'
    ]),
    statsPanelPosition(){
      return {
        top: (0) + 'px',
        left: (document.documentElement.scrollWidth)+ 'px'
      }
    }
  },
  methods: {
    ...mapActions([
      'bayImprove'
    ]), 
    bayClick(key, item){
      console.log(key);
      console.log(item);
      this.bayImprove({
        key:key,
        item:item
      });
    }
  }
}
</script>

<style lang="less" scoped>
.improve-panel{
  display: flex;
  flex-direction: column;
  top: 0vh;
  left: 0vw;
  position: fixed;
  width: 30vw;
  text-align: center;
  font-size: 4vh;
  padding: 0.1vw;
  background: @cBaseUi;
  z-index: 555;
  opacity: 50%;

  &__item{
    height: 5vh;
    width: 100%;
    padding: 0.1vw;
    &-enabled{
      height: 5vh;
      width: 100%;
      color: white;
      background-color: @buttonColor;
      &:hover {
        cursor: pointer;
        background-color: @cBaseManna;
      }
    }
    &-disabled{
      height: 5vh;
      width: 100%;
      color: white;
      background-color: @cBorderUi;
      &:hover {
        cursor: pointer;
        background-color: @background;
      }
    }
  }
}
</style>