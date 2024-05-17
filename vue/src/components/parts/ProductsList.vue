<template>
  <div class="products">
    <ProductCard v-for="(product, index) in products" :key="index" :product="product"/>
    <h1 v-if="products.length == 0">Нет товаров</h1>
  </div>
</template>

<script>
import ProductCard from '@/components/cards/ProductCard.vue'

export default {
  name: 'ProductsList',
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.products {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
}
</style>
