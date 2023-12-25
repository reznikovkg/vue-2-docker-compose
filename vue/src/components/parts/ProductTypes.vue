<template>
  <div class="grid">
    <ProductTypeCard
        v-for="item in items"
        v-bind:key="item.id"
        :id="item.id"
        :title="item.title"
        :caption="item.caption"
        :img="item.img"
    />
  </div>
</template>

<script>
  import ProductTypeCard from '../parts/ProductTypeCard.vue'
  import {productTypesModel} from "@/components/mock";
  export default {
    name: 'ProductTypes',
    components: {
      ProductTypeCard
    },
    data() {
      return {
        items: productTypesModel.getList()
      }
    }
  }
</script>

<style scoped lang="scss">
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
</style>
