<template>
  <div class="bottom">
    <img src="../../assets/big-house.png" class="big-house" alt="" />
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
  width: 80px;
  height: 80px;
  transform: translate(-40px, -40px);
  z-index: 5;
}

.big-house {
  position: absolute;
  width: 150px;
  transform: rotateZ(-45deg) rotateX(-45deg) scaleY(2) translateY(-27px) translateX(-12px);
}

.counter {
  position: absolute;
  top: 30px;
  left: 20px;
  right: 20px;
}
</style>
