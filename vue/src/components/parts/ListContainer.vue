<template>
  <div class="list">
    <ProductCard v-for="(card, index) in cards" :key="index" :card="card"/>
  </div>
</template>

<script>
import ProductCard from '@/components/cards/ProductCard.vue'

export default {
  name: 'ListContainer',
  components: {
    ProductCard
  },
  props: {
    cards: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 80px;
  padding: 50x;
}
</style>