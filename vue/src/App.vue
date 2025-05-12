<template>
  <div class="App">
    <ScoreDisplay />
    <GameBoard />
  </div>
</template>
<script>
import GameBoard from './components/GameBoard.vue';
import ScoreDisplay from "./components/ScoreDisplay.vue"

export default {
  name: 'App',
  components: {
    GameBoard,
    ScoreDisplay,
  }
};
</script>