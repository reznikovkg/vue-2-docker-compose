<template>
  <div class="puzzle">
    <!-- Сообщение о победе -->
    <div v-if="isWinner" class="puzzle__win-message">
      Поздравляем! Вы победили!
    </div>

    <!-- Игровое поле -->
    <div class="puzzle__grid">
      <div
        v-for="(tile, index) in tiles"
        :key="index"
        :class="['puzzle__tile', { 'puzzle__tile--empty': tile === 0 }]"
        @click="moveTile(index)"
      >
        {{ tile !== 0 ? tile : "" }}
      </div>
    </div>

    <!-- Кнопка перемешивания -->
    <button class="puzzle__button" @click="shuffleTiles">Перемешать</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tiles: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        0, // 0 пустая ячейка
      ],
      emptyIndex: 15, // Индекс пустой ячейки при старте приложения
      isWinner: false, // Флаг для отслеживания победы
    };
  },
  methods: {
    moveTile(index) {
      const emptyRow = Math.floor(this.emptyIndex / 4);
      const emptyCol = this.emptyIndex % 4;
      const tileRow = Math.floor(index / 4);
      const tileCol = index % 4;

      if (
        (Math.abs(emptyRow - tileRow) === 1 && emptyCol === tileCol) ||
        (Math.abs(emptyCol - tileCol) === 1 && emptyRow === tileRow)
      ) {
        this.tiles[this.emptyIndex] = this.tiles[index];
        this.tiles[index] = 0;
        this.emptyIndex = index;
        this.$set(this, "tiles", [...this.tiles]);
        this.checkVictory();
      }
    },

    shuffleTiles() {
      let shuffled = [...this.tiles];
      shuffled = this.shuffleArray(shuffled);
      this.tiles = shuffled;
      this.emptyIndex = shuffled.indexOf(0);
      this.checkVictory();
    },

    checkVictory() {
      const winningConfiguration = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0,
      ];
      if (
        this.tiles.every((tile, index) => tile === winningConfiguration[index])
      ) {
        this.isWinner = true;
      } else {
        this.isWinner = false;
      }
    },

    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/assets/styles/main.less";
</style>
