<template>
  <span class="cell" :style="{ backgroundColor: getTileColor }">
    {{ tile > 0 ? tile : '' }}
  </span>
</template>

<script>
export default {
  props: {
    tile: {
      type: Number,
      required: true,
    },
  },
  computed: {
    getTileColor() {
      const colors = {
        0: '#cec0b3',
        2: '#eee4da',
        4: '#ece0ca',
        8: '#f3b07a',
        16: '#f59462',
        32: '#f57b5f',
        64: '#f55d3b',
        128: '#eccd71',
        256: '#eccb61',
        512: '#edc53f',
        1024: '#edc52f',
        2048: '#edc12e',
      };
      return colors[this.tile] || '#3c3a32';
    },
  },
};
</script>

<style>
.cell {
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  margin: 5px;
  border-radius: 5px;
  color: #3f3b3b;
  font-weight: bold;
}
</style>