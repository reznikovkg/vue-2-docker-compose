<template>
  <div class="asteroid-object" :style="objectStyle"></div>
</template>

<script>
import GameObject from '../core/GameObject'

export default {
  name: 'AsteroidObject',
  mixins: [GameObject],
  props: {
    health: {
      type: Number,
      default: 3
    }
  },
  watch: {
    health(newVal) {
      if (newVal === 2) this.color = '#f36812'
      if (newVal === 1) this.color = '#f1880f'
    }
  },
  created() {
    this.color = '#e74c3c'
  }
}
</script>

<style scoped lang="less">
.asteroid-object {
  border-radius: 50%;
  transition: background-color 0.3s ease;
}
</style>