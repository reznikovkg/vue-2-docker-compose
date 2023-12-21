<template>
  <main>
    <div class="container">
      <app-topbanner class="element element_first"></app-topbanner>
      <app-assortement class="element"></app-assortement>
      <app-cake-of-the-day class="element"></app-cake-of-the-day>
      <app-need-help class="element element_last"></app-need-help>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'HomePage'
  }
</script>

<style scoped lang="less">
@import "styles/home.less";
</style>