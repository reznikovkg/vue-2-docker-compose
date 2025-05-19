<template>
  <div class="app">
    <FishShip></FishShip>
    <WaterWindow></WaterWindow>
    <TopPanel></TopPanel>
    <FishingGame></FishingGame>
    <InvenoryWindow></InvenoryWindow>
  </div>
</template>

<script>
import WaterWindow from './WaterWindow.vue'
import FishShip from './FishShip.vue'
import TopPanel from './TopPanel.vue'
import FishingGame from './FishingGame.vue'
import InvenoryWindow from './InventoryWindow.vue'
export default {
  name: 'App',
  components: {
    WaterWindow,
    FishShip,
    TopPanel,
    FishingGame,
    InvenoryWindow
  }
}
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
  user-select: none;
  cursor: none;
}
</style>
