<template>
  <div class="catch-progress">
    <div class="catch-progress__bar">
      <div class="catch-progress__fill" :style="`height: ${percent}%`"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatchProgress",
  props: {
    percent: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.catch-progress {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  background-color: @cBackground;
  padding: 1em;
  z-index: 10;

  &__bar {
    width: 1em;
    min-height: 5em;
    height: 10em;
    position: relative;
    background-color: @cBackground2;
    transform: rotate(180deg);
  }

  &__fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: @cAccent;
    transition: height 300ms;
  }
}
</style>
