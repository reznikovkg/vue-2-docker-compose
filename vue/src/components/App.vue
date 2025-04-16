<template>
  <div>
    <RouterView />
  </div>
</template>

<script>
import { initialCatChar } from '@/char.js';

export default {
  created () {
    console.log('created app')
    console.log(!localStorage.charStats || !localStorage.charMultipliers || !localStorage.charActions || !localStorage.charItems)
    if (!localStorage.charStats || !localStorage.charMultipliers || !localStorage.charActions || !localStorage.charItems) {
      console.log('restoring data')
      this.saveCharData(initialCatChar);
    }
  },
  
  methods: {
    saveCharData (char) {
      localStorage.charStats = JSON.stringify(char.stats);
      localStorage.charMultipliers = JSON.stringify(char.multipliers);
      localStorage.charActions = JSON.stringify(char.actions);
      localStorage.charItems = JSON.stringify(char.items);
    }
  }
}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Tektur:wght@400..900&display=swap');

body {
  background-color: @cPrimary;
}

.text {
  &__primary {
    font-family: @ffPrimary;
    color: @cSecondary;
  }
  
  &__secondary {
    font-family: @ffSecondary;
    color: @cSecondary;
  }
  
  &__highlight {
    font-weight: 300;
    color: aqua;
  }
}
</style>