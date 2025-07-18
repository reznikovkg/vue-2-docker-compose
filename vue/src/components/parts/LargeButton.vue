<template>
  <button 
  class="button__large"
  :class="buttonStatusClass" 
  @click="() => clickCallback()" 
  :disabled="isDisabled">
  {{ displayText }}
  </button>
</template>

<script>
export default {
  name: 'SmallButton',
  props: {
    displayText: String,
    isDisabled: {
      type: Boolean,
      default: false
    },
    clickCallback: Function
  },
  computed: {
    buttonStatusClass () {
      if (this.isDisabled) {
        return 'button__large__disabled';
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
  &__large {
    min-width: 180px;
    min-height: 60px;
    background-color: @cPrimary;
    border-color: @cAccent;
    margin: 10px;
    font-family: @ffSecondary;
    font-size: @sFontBigger;
    color: @cSecondary;
    cursor: pointer;

    &__disabled {
      color: @cBad;
      cursor: auto;
    }
  }
}
</style>