<template>
  <button class="custom-button" :class="'custom-button--' + type">
    <slot>Кнопка</slot>
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    type: {
      type: String,
      default: "default",
    },
  },
};
</script>

<style scoped lang="less">
@import "../../assets/styles/variables.less";

.custom-button {
  font-family: "Adigiana Ultra", sans-serif;
  background-color: var(--button-background-color);
  color: var(--button-text-color);
  border: none;
  border-radius: 30px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 1;
  &:hover {
    opacity: 0.8;
  }
  &--menu {
    padding: 15px 25px;
    font-size: 42px;
    letter-spacing: 5px;
    width: 524px;
    height: 119px;
    margin: 15px 0;
  }
  &--level {
    font-size: 70px;
    width: 130px;
    height: 130px;
    margin: 50px 0;
  }
}
</style>
