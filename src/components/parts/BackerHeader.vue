<template>
  <div class="backer">
    <button v-if="canBack" class="backer__button" @click="() => this.$router.back()">←</button>
    <div v-else class="backer__icon backer__icon_placeholder"></div>
    <h1 class="backer__title">{{ text }}</h1>
  </div>
</template>

<script>
export default {
  name: "BackerHeader",
  props: {
    text: String,
    canBack: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="less">
.backer {
  display: flex;
  gap: 1em;
  flex-wrap: nowrap;
  place-items: center;
  align-items: center;
  position: sticky;
  top: 0;
  padding-top: 1em;
  padding-bottom: 1em;
  background-color: @cBackground;
  z-index: 2;

  &__button {
    width: 32px;
    height: 32px;
    font-size: 32px;
    padding: 0;
  }

  &__icon {
    width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    background-color: transparent;

    &.backer__icon__placeholder {
      background-image: url("../../assets/fish_01e.png");
      background-size: contain;
      background-position: center;
    }
  }

  &__title {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }
}
</style>