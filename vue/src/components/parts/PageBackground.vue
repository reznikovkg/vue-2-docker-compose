<template>
  <div class="start-screen">
    <div class="start-screen__image--plant-left"></div>
    <div class="start-screen__image--plant-right"></div>
    <div class="start-screen__image--draw-plant-right-bot"></div>
    <div class="start-screen__image--draw-plant-right-top"></div>
    <div class="start-screen__image--draw-plant-left"></div>
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
  background-color: var(--main-background-color);

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

  &__image {
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;

    &--plant-left {
      position: absolute;
      background-image: url(../../assets/images/plant-left.png);
      width: 393px;
      height: 525px;
      top: 0px;
      left: 0px;
      z-index: 1;
    }

    &--plant-right {
      position: absolute;
      background-image: url(../../assets/images/plant-right.png);
      width: 460px;
      height: 709px;
      top: 150px;
      right: 0px;
      z-index: 1;
    }

    &--draw-plant-right-bot {
      position: absolute;
      background-image: url(../../assets/images/draw-plant-right-bot.png);
      width: 326px;
      height: 399px;
      bottom: 0px;
      right: 40px;
      z-index: 1;
    }

    &--draw-plant-right-top {
      position: absolute;
      background-image: url(../../assets/images/draw-plant-right-top.png);
      width: 227px;
      height: 539px;
      bottom: 450px;
      right: 0px;
      z-index: 0;
    }

    &--draw-plant-left {
      position: absolute;
      background-image: url(../../assets/images/draw-plant-left.png);
      width: 322px;
      height: 400px;
      bottom: 0px;
      left: 0px;
      z-index: 1;
    }
  }
}

@media (max-width: 480px) {
  .start-screen {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  --bg-size: 60%;

    &__header {
      padding: 250px 0 18px 0;
      top: 0;
      text-align: center;
      z-index: 1;
    }

    &__title {
      color: var(--title-color);
      font-size: clamp(40px, 80vw, 100px);
      font-family: "Adigiana Ultra", sans-serif;
      margin: 0;
      white-space: nowrap;
    }

    .circle {
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 900px;
      height: 900px;
      background-color: var(--cicle-color);
      border-radius: 50%;
      z-index: 0;
      pointer-events: none;
    }

    &__image {
      position: relative;

      &--plant-left {
        position: absolute;
        background-image: url(../../assets/images/plant-left.png);
        background-size: var(--bg-size);
        background-repeat: no-repeat;
        width: 235px;
        height: 315px;
        top: 0px;
        left: 0px;
        z-index: 1;
      }

      &--plant-right {
        position: absolute;
        background-image: url(../../assets/images/plant-right.png);
        background-size: var(--bg-size);
        background-repeat: no-repeat;
        width: 270px;
        height: 425px;
        top: 450px;
        right: -175px;
        z-index: 1;
      }

      &--draw-plant-right-bot {
        position: absolute;
        background-image: url(../../assets/images/draw-plant-right-bot.png);
        background-size: var(--bg-size);
        background-repeat: no-repeat;
        width: 195px;
        height: 239px;
        bottom: -100px;
        right: -30px;
        z-index: 1;
      }

      &--draw-plant-right-top {
        position: absolute;
        background-image: url(../../assets/images/draw-plant-right-top.png);
        background-size: var(--bg-size);
        background-repeat: no-repeat;
        width: 136px;
        height: 323px;
        bottom: 490px;
        right: -60px;
        z-index: 1;
      }

      &--draw-plant-left {
        position: absolute;
        background-image: url(../../assets/images/draw-plant-left.png);
        background-size: var(--bg-size);
        background-repeat: no-repeat;
        width: 193px;
        height: 240px;
        bottom: -100px;
        left: 50px;
        z-index: 1;
      }
    }
  }
}
</style>
