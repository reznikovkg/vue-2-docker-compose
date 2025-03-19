<template>
  <div class="status-bar">
    <h3 class="current-level">
      Уровень: {{ currentLevel + 1 }} / {{ totalLevels }}
    </h3>
    <h3 class="coins">
      Монеты: {{ coins }}
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    currentLevel: {
      type: Number,
      required: true
    },
    totalLevels: {
      type: Number,
      required: true
    },
    coins: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
.current-level {
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-top: 0;
  margin-bottom: 10px;
  background-color: #151515;
  padding: 10px;
  border-radius: 5px;
}

.coins {
  font-size: 18px;
  font-weight: bold;
  color: gold;
  margin-bottom: 10px;
  background-color: #151515;
  padding: 10px;
  border-radius: 5px;
}

.status-bar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #222;
  padding: 10px;
  border-radius: 5px;
  width: 400px;
}
</style>
