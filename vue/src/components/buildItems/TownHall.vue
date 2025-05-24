<template>
  <div class="bottom">
    <img src="../../assets/town-hall.png" class="town-hall" alt="" />
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
  background-color: inherit;
  transform: translate(-40px, -40px);
  z-index: 5;
}

.town-hall {
  position: absolute;
  width: 90px;
  transform: rotateZ(-45deg) rotateX(-45deg) scaleY(2) translateY(-7px);
}

.counter {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
}
</style>
