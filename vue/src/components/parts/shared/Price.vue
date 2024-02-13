<template>
  <div class="priceWrapper">
    <div v-if="discountPrice" class="price price_new">{{discountPrice}}</div>
    <div class="price" :class="{ 'price_old': discountPrice }">{{price}}</div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PriceComponent',
    props: ['price', 'discountPrice']
  }
</script>

<style scoped lang="scss">
  .priceWrapper {
    display: flex;
    align-items: flex-end;
    column-gap: 12px;
    margin-top: 28px;
    margin-bottom: 8px;
  }
  .price {
    color: gray;
    font-size: 26px;

    &_new {
      color: #8C2B3D;
    }

    &_old {
      position: relative;
      font-size: 16px;
      color: gray;
      padding-bottom: 2px;

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background: currentColor;
        top: calc(50% - 2px);
      }
    }
  }
</style>
