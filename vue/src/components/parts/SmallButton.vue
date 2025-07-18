<template>
  <button 
  class="button__small" 
  :class="buttonStatusClass" 
  @click="() => clickCallback()" 
  :disabled="isDisabled">
    <img class="button__small__icon" :src="iconSrc">
  </button>
</template>

<script>
export default {
  name: 'SmallButton',
  props: {
    iconSrc: String,
    isDisabled: {
      type: Boolean,
      default: false
    },
    clickCallback: Function
  },
  computed: {
    buttonStatusClass () {
      if (this.isDisabled) {
        return 'button__small__disabled';
      }
      else {
        return '';
      }
    }
  }
}
</script>

<style scoped lang="less">
.button {
  &__small {
    min-width: 80px;
    min-height: 80px;
    height: 70%;
    background-color: @cPrimary;
    border-color: @cAccent;
    margin: 10px;
    cursor: pointer;

    &__disabled {
      color: @cBad;
      cursor: auto;
    }

    &__icon {
      height: 60%;
    }
  }
}
</style>