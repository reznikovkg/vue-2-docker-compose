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

<style scoped lang="less">
@import '@/less/const.less';
.flex-center-column() {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.circle(@size, @color) {
  width: @size;
  height: @size;
  background-color: @color;
  border-radius: 50%;
}
.box-style(@bg-color, @text-color, @font-size: 10px) {
  background-color: @bg-color;
  color: @text-color;
  font-size: @font-size;
  padding: 2px 2px;
  border-radius: 5px;
}
.enemy {
  .flex-center-column();
  width: 100%;
  height: 100%;

  &__dot {
    .circle(20px, red);
  }
  &__health {
    .box-style(rgba(0, 0, 0, 0.7), white, 10px);
  }
}
</style>