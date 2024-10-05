<template>
  <div class="start-screen">
    <div class="circle"></div>
    <header class="start-screen__header">
      <h1 class="start-screen__title">GROW UP</h1>
    </header>
    <div class="start-screen__buttons">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartScreen",
};
</script>

<style scoped lang="less">
@import "../../assets/styles/variables.less";

.start-screen {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__header {
    padding: 80px 0 30px 0;
    top: 0;
    text-align: center;
    z-index: 1;
  }

  &__title {
    color: var(--title-color);
    font-size: 198px;
    font-family: "Adigiana Ultra", sans-serif;
    margin: 0;
  }

  .circle {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1500px;
    height: 1500px;
    background-color: var(--cicle-color);
    border-radius: 50%;
    z-index: 0;
    pointer-events: none;
  }
}
</style>
