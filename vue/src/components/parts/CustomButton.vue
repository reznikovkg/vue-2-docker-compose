<template>
  <button 
    class="custom-button" 
    :class="'custom-button--' + type" 
    :disabled="disabled" 
    :aria-disabled="disabled.toString()"
    @click="() => onClick()"
  >
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: var(--button-disabled-background-color, #dcdcdc);
    color: var(--button-disabled-text-color, #aaa);
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

@media (max-width: 480px) {
  .custom-button {
  border-radius: 18px;

    &--menu {
      padding: 9px 15px;
      font-size: 25px;
      letter-spacing: 5px;
      width: 314px;
      height: 71px;
      margin: 9px 0;
    }

    &--level {
      font-size: 42px;
      width: 78px;
      height: 78px;
      margin: 30px 0;
    }
  }
}
</style>
