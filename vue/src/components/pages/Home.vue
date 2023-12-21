<template>
  <PageLayout>
    <MainSlider />
    <ProductTypes />
    <Products :title='"Top rated"' :items="items" />
    <Products :title='"Special products"' :items="items" />
    <SpecialCards />
    <Contacts />
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import MainSlider from '../parts/MainSlider.vue'
import ProductTypes from '../parts/ProductTypes.vue'
import ProductCard from '../parts/ProductCard.vue'
import Products from '../parts/Products.vue'
import SpecialCards from '../parts/SpecialCards.vue'
import Contacts from '../parts/Contacts.vue'
import { helpModal } from "@/mixins/modals";

export default {
  name: 'HomePage',
  mixins: [helpModal],
  components: {
    PageLayout,
    MainSlider,
    ProductTypes,
    Contacts,
    ProductCard,
    Products,
    SpecialCards
  },
  data() {
    return {
      title: 'Top rated',
      items: [
        {
          id: '1',
          badge: 'top',
          rating: 4.6,
          reviews: 4,
          caption: 'the quality is beyound excellence',
          img: '/engine.png',
          price: '650$'
        },
        {
          id: '2',
          badge: 'top',
          rating: 2.6,
          reviews: 4,
          caption: 'the quality is beyound excellence',
          img: '/engine.png',
          price: '650$'
        },
        {
          id: '3',
          badge: 'top',
          rating: 3.6,
          reviews: 4,
          caption: 'the quality is beyound excellence',
          img: '/engine.png',
          price: '650$'
        },
        {
          id: '4',
          badge: 'top',
          rating: 0.6,
          reviews: 4,
          caption: 'the quality is beyound excellence',
          img: '/engine.png',
          price: '650$'
        }
      ]
    }
  }
}
</script>

<style>
</style>
