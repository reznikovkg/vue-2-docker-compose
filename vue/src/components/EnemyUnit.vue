<template>
  <div class="enemy">
    <div class="enemy__health">
      {{ enemyHealth }} HP
    </div>
    <div class="enemy__dot"></div>
  </div>
</template>

<script>
export default {
  name: 'EnemyUnit',
  props: {
    enemyHealth: {
      type: Number,
      required: true
    },
  },
}
</script>

<style scoped>
.enemy {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.enemy__dot {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
}
.enemy__health {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 10px;
  padding: 2px 2px;
  border-radius: 5px;
}
</style>