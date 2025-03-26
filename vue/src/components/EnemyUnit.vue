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

<style lang="less" scoped>
  @import '@/less/enemy.less';
</style>