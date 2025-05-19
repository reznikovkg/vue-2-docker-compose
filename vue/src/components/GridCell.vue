<template>
  <div
      class="cell"
      :class="{ 'has-mole': hasMole, 'pressed': isPressed }"
      @click="handleClick"
  >
    <span v-if="hasMole">🐹</span>
  </div>
</template>

<script>
export default {
  name: 'GridCell',
  props: {
    hasMole: Boolean,
  },
  data() {
    return {
      isPressed: false,
    };
  },
  methods: {
    handleClick() {
      this.isPressed = true;
      setTimeout(() => {
        this.isPressed = false;
      }, 100);

      this.$emit('cell-click');
    },
  },
};
</script>

<style scoped>
.cell {
  width: 100px;
  height: 100px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  font-size: 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.cell.has-mole {
  background-color: #ffe0e0;
  box-shadow: 0 0 10px red;
}

.cell.pressed {
  transform: scale(0.95);
  background-color: #ddd;
}
</style>