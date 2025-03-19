<template>
  <div class="levels-container">
    <button v-for="level in levels.length"
            :key="level"
            @click="$emit('level-selected', level - 1)" class="level-buttons">
      Уровень {{ level }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levels: [
        {
          path: [0, 10, 20, 30, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49], // Дорога
          buildableCells: [1, 31, 35, 53, 57], // Разрешенные клетки для строительства
          towers: []
        },
        {
          path: [10, 11, 12, 13, 14, 15, 16, 17, 18, 28, 38, 48, 58, 68, 78, 88, 87, 86, 85, 84, 83, 82, 81, 80],
          buildableCells: [2, 24, 26, 57, 64,94,96,99],
          towers: []
        },
        {
          path: [0, 10, 11, 12, 13, 14, 24, 34, 33, 32, 31, 41, 51, 61, 71, 72, 73, 74, 75, 76, 66, 56, 46, 47, 48, 58, 68, 78, 88, 98],
          buildableCells: [2, 42, 57, 82],
          towers: []
        },
        {
          path: [10, 11, 12, 13, 14, 15, 16, 17, 18, 28, 38, 48, 58, 68, 78, 88, 87, 86, 85, 84, 83, 82, 81, 71, 61, 51, 52, 53, 63, 64, 65, 66, 56, 46, 36, 35, 34, 33, 32, 31, 30],
          buildableCells: [2,24,54,55,62,94,96,99],
          towers: []
        },
        {
          path: [10,11,12,13,14,15,16,17,18,28,38,48,47,46,45,44,43,42,41,51,61,71,81,82,83,84,85,86,87,88,89],
          buildableCells: [3,19,30,37,52,72,76,90],
          towers: []
        },
        {
          path: [93,83,73,63,62,61,51,41,31,21,11,12,13,14,15,16,17,18,28,38,48,58,68,67,66,65,75,85,86,87,88,89],
          buildableCells: [22,27,52,55,76,78],
          towers: []
        },
      ]
    };
  },
  mounted() {
    this.$emit("levels-loaded", this.levels);
  }
};
</script>

<style>
button {
  margin: 5px;
  padding: 10px;
  background-color: #555;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #777;
}
.levels-container {
  margin: 10px;
}
</style>