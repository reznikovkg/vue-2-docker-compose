<template>
  <div class="level-background">
    <div class="level-background__image--plant-left"></div>
    <div class="level-background__image--plant-right"></div>
    <div class="level-background__image--draw-plant-right-bot"></div>
    <div class="level-background__image--draw-plant-right-top"></div>
    <div class="level-background__image--draw-plant-left"></div>
    <header class="level-background__header">
      <h1 class="level-background__title">GROW UP</h1>
    </header>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LevelBackground",
};
</script>

<style scoped lang="less">
@import "../../assets/styles/variables.less";

.level-background {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--main-background-color);

  &__header {
    padding: 30px 0 0 0;
    top: 0;
    text-align: center;
    z-index: 1;
  }

  &__title {
    color: var(--title-color);
    font-size: 80px;
    font-family: "Adigiana Ultra", sans-serif;
    margin: 0;
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
  .level-background {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    --bg-size: 60%;

    &__header {
      padding: 18px 0 0 0;
      top: 0;
      text-align: center;
      z-index: 1;
    }

    &__title {
      color: var(--title-color);
      font-size: 48px;
      font-family: "Adigiana Ultra", sans-serif;
      margin: 0;
    }

    &__image {
      position: relative;

      &--plant-left {
        position: absolute;
        background-image: url(../../assets/images/plant-left.png);
        background-size: var(--bg-size);
        background-repeat: no-repeat;
        width: 188px;
        height: 252px;
        top: 0px;
        left: 0px;
        z-index: 0;
      }

      &--plant-right {
        position: absolute;
        background-image: url(../../assets/images/plant-right.png);
        background-size: var(--bg-size);
        background-repeat: no-repeat;
        width: 170px;
        height: 340px;
        top: 0px;
        right: -70px;
        z-index: 0;
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
        z-index: 0;
      }

      &--draw-plant-right-top {
        position: absolute;
        background-image: url(../../assets/images/draw-plant-right-top.png);
        background-size: var(--bg-size);
        background-repeat: no-repeat;
        transform: rotate(-180deg);
        width: 200px;
        height: 300px;
        bottom: 100px;
        left: -100px;
        z-index: 0;
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
        z-index: 0;
      }
    }
  }
}
</style>
