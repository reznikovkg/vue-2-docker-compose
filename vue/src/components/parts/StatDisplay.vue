<template>
  <div class="display__stat">
    <img class="display__stat__icon" :src="iconSrc">
    <h2 class="display__stat__value">
      {{ statValue }}{{ displayedMaxValue }}
      <span :class="changeTypeClass">{{ changeSymbol }}{{ displayedChangeValue }}</span>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'StatDisplay',
  props: {
    iconSrc: String,
    statValue: Number,
    maxStatValue: Number,
  },
  data () {
    return {
      currentChangeValue: 0,
      changeDisplayTimeout: null
    }
  },
  computed: {
    changeSymbol () {
      if (this.currentChangeValue > 0) {
        return '+';
      }
      else {
        return '';
      }
    },
    displayedChangeValue () {
      if (this.currentChangeValue != 0) {
        return String(Math.round(this.currentChangeValue))
      }
      else {
        return ''
      }
    },
    displayedMaxValue () {
      if (this.maxStatValue) {
        return `/${this.maxStatValue}`;
      }
      else {
        return '';
      }
    },
    changeTypeClass () {
      if (this.currentChangeValue < 0) {
        return 'display__stat__value__change__negative';
      }
      else {
        return 'display__stat__value__change__positive';
      }
    }
  },
  watch: {
    statValue(newValue, oldValue) {
      this.currentChangeValue = newValue - oldValue;
      clearTimeout(this.changeDisplayTimeout);
      this.changeDisplayTimeout = setTimeout(() => {
        this.currentChangeValue = 0;
      }, 2000)
    }
  }
}
</script>

<style scoped lang="less">
.display__stat {
  display: flex;

  &__icon {
    scale: 2;
    margin: 0px 30px;
  }
  
  &__value {
    font-size: @sFontLargest;
    
    &__change {
      &__negative {
        color: red;
      }
      
      &__positive {
        color: green;
      }
    }
  }
}
</style>