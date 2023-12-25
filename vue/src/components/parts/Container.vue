<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContentContainer",
};
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;
  }
</style>
