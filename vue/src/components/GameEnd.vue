<template>
  <div>
    <!-- Сообщение об окончании игры -->
    <div v-if="gameOver" class="game-over">Игра окончена!</div>

    <!-- Сообщение о победе над врагом -->
    <div v-if="enemyDefeated" class="enemy-defeated">Враг повержен!</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      gameOver: state => state.gameOver,
      enemyDefeated: state => state.enemyDefeated
    })
  }
};
</script>

<style>
.game-over, .enemy-defeated {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  border-radius: 8px;
  font-weight: bold;
  font-size: 45px;
  color: red;
  -webkit-text-stroke: 1px white;
}
.enemy-defeated {
  color: green;
}
</style>
