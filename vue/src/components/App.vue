<template>
  <div id="app">
    <GridField :width="500" :height="500" :points="points" :radius="5" :gridSize="50" />
  </div>
</template>

<script>
import GridField from './components/GridField.vue';

export default {
  components: {
    GridField,
  },
  data() {
    return {
      points: [
        { x: 50, y: 50, color: '#ff0000' },
        { x: 100, y: 100, color: '#00ff00' },
        { x: 150, y: 150, color: '#0000ff' },
      ],
    };
  },
};
</script>

<style>
/*стили */
</style>
