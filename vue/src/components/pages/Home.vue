<template>
  <PageLayout>
    <MainSlider />
    <ProductTypes />
    <Products title="Top Rated" :items="top" />
    <SplitterComponent />
    <Products title="Special products" :items="special" />
    <SpecialCards />
    <News title="From the Blog" :items="news" />
    <Contacts />
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import MainSlider from '../parts/MainSlider.vue'
import ProductTypes from '../parts/ProductTypes.vue'
import Products from '../parts/Products.vue'
import SpecialCards from '../parts/SpecialCards.vue'
import Contacts from '../parts/Contacts.vue'
import {newsModel, productsModel} from "@/components/mock";
import News from "@/components/parts/News.vue";
import SplitterComponent from "@/components/parts/Splitter.vue";
import ProductCard from "@/components/parts/ProductCard.vue";

export default {
  name: 'HomePage',
  computed: {
    ProductCard() {
      return ProductCard
    }
  },
  components: {
    SplitterComponent,
    News,
    PageLayout,
    MainSlider,
    ProductTypes,
    Contacts,
    Products,
    SpecialCards
  },
  data() {
    return {
      top: productsModel.getTop(),
      special: productsModel.getSales(),
      news: newsModel.getList()
    }
  }
}
</script>

<style>
</style>
