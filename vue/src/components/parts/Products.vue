<template>
  <CustomSlider :title="title" :items="items" :component="ProductCard" :items-in-row="4" />
</template>

<script>
  import ProductCard from "@/components/parts/ProductCard.vue";
  import CustomSlider from "@/components/parts/CustomSlider.vue";

  export default {
    name: 'ProductsList',
    computed: {
      ProductCard() {
        return ProductCard
      }
    },
    components: {
      CustomSlider
    },
    props: ['items', 'title'],
  }
</script>

<style scoped lang="scss">
  .head {
    margin-top: 40px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .controls {
    position: absolute;
    right: calc((100vw - 1200px) / 2);
    top:50%;
    transform: translateY(-50%);
    display: flex;
    width: fit-content;

    .arrow {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      cursor: pointer;

      &:disabled {
        cursor: auto;
      }
    }
  }
  .title {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
  }
  .grid {
    display: flex;
    column-gap: 20px;
    margin-top: 40px;
    margin-inline: auto;
    width: fit-content;
  }
</style>
