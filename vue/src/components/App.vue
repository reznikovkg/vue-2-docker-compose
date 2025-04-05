<template>
  <div>
      <RouterView />
  </div>
</template>

<script>
import { catChar } from '@/char.js';

export default {
  created () {
    localStorage.character = JSON.stringify(catChar);
  }
}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Tektur:wght@400..900&display=swap');

body {
  background-color: @cPrimary;
}

.primary-text {
  font-family: @ffPrimary;
  color: @cSecondary;
}

.detail-text {
  font-family: @ffSecondary;
  color: @cSecondary;
}
</style>