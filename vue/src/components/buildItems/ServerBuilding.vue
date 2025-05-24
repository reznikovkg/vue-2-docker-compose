<template>
  <div class="bottom">
    <img src="../../assets/server.png" class="server" alt="" />
    <div class="counter">{{ counter }}</div>
  </div>
</template>

<script>
export default {
  props: {
    counter: Number,
  },
};
</script>

<style scoped lang="less">
.bottom {
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: inherit;
  z-index: 5;
}
.server {
  position: absolute;
  width: 66px;
  transform: rotateZ(-45deg) rotateX(-45deg) scaleY(2) translateY(-32px);
}
.counter {
  position: absolute;
  top: -28px;
  left: -23px;
}
</style>
