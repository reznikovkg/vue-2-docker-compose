<template>
  <div class="grid">
    <ProductTypeCard
        v-for="item in items"
        v-bind:key="item.id"
        :id="item.id"
        :title="item.title"
        :img="item.img"
    />
  </div>
</template>

<script>
  import ProductTypeCard from '../parts/ProductTypeCard.vue'
  export default {
    name: 'ProductTypes',
    components: {
      ProductTypeCard
    },
    data() {
      return {
        items: [
          {
            id: '1',
            title: 'suspension parts',
            caption: 'the quality is beyound excellence',
            img: '/engine.png'
          },
          {
            id: '2',
            title: 'suspension parts',
            caption: 'the quality is beyound excellence',
            img: '/engine.png'
          },
          {
            id: '3',
            title: 'brake parts',
            caption: 'the quality is beyound excellence',
            img: '/engine.png'
          },
          {
            id: '4',
            title: 'exhaust parts',
            caption: 'the quality is beyound excellence',
            img: '/engine.png'
          },
          {
            id: '5',
            title: 'steering parts',
            caption: 'the quality is beyound excellence',
            img: '/engine.png'
          },
          {
            id: '6',
            title: 'transmission parts',
            caption: 'the quality is beyound excellence',
            img: '/engine.png'
          },
          {
            id: '7',
            title: 'body kits',
            caption: 'the quality is beyound excellence',
            img: '/engine.png'
          },
          {
            id: '8',
            title: 'motor oil',
            caption: 'the quality is beyound excellence',
            img: '/engine.png'
          },
        ]
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
